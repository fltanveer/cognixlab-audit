import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, relative, sep } from 'node:path'
import { existsSync, readdirSync } from 'node:fs'

// Every folder in audits/ is one private audit, served at /<slug>/.
// A folder may also hold proposal/index.html, served at /<slug>/proposal/.
const auditsDir = resolve(__dirname, 'audits')
const slugs = readdirSync(auditsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(resolve(auditsDir, d.name, 'index.html')))
  .map((d) => d.name)

const input: Record<string, string> = { home: resolve(auditsDir, 'index.html') }
for (const slug of slugs) {
  input[`${slug}__report`] = resolve(auditsDir, slug, 'index.html')
  const proposal = resolve(auditsDir, slug, 'proposal/index.html')
  if (existsSync(proposal)) input[`${slug}__proposal`] = proposal
}

/** The audit a module belongs to, or null for shared code (kit, node_modules). */
function ownerOf(id: string): string | null {
  const rel = relative(auditsDir, id.split('?')[0])
  if (rel.startsWith('..')) return null
  const first = rel.split(sep)[0]
  return slugs.includes(first) ? first : null
}

export default defineConfig({
  root: auditsDir,
  publicDir: resolve(__dirname, 'public'),
  plugins: [react()],
  server: { fs: { allow: [__dirname] } },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input,
      output: {
        // Anything that contains one client's content is emitted under /<slug>/assets/,
        // which the middleware gates. Only shared, client-neutral code lands in /assets/.
        entryFileNames: (chunk) => {
          const slug = chunk.name.split('__')[0]
          return slugs.includes(slug) ? `${slug}/assets/[hash].js` : 'assets/[hash].js'
        },
        chunkFileNames: (chunk) => {
          const owners = new Set(chunk.moduleIds.map(ownerOf).filter(Boolean))
          if (owners.size > 1) throw new Error(`Chunk ${chunk.name} mixes audits: ${[...owners].join(', ')}`)
          const [slug] = owners
          return slug ? `${slug}/assets/[hash].js` : 'assets/[hash].js'
        },
        assetFileNames: (asset) => {
          // Per-entry CSS is named after its entry: <slug>__report.css
          const slug = (asset.names?.[0] ?? '').split('__')[0]
          return slugs.includes(slug) ? `${slug}/assets/[hash][extname]` : 'assets/[hash][extname]'
        },
      },
    },
  },
  resolve: { dedupe: ['react', 'react-dom'] },
})
