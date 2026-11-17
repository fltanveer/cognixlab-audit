// npm run new-audit -- <slug> [--title "Client name"] [--expires YYYY-MM-DD]
// Creates audits/<slug>/ and public/<slug>/, issues the private link.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { checkSlug, flag, grant, root } from './lib-access.mjs'

const slug = process.argv[2]
try { checkSlug(slug) } catch (e) { console.error(e.message); process.exit(1) }
const title = flag('title') ?? slug
const dir = join(root, 'audits', slug)
if (existsSync(dir)) { console.error(`audits/${slug} already exists. Use: npm run access -- rotate ${slug}`); process.exit(1) }

await mkdir(dir, { recursive: true })
for (const d of ['shots', 'images', 'brand']) await mkdir(join(root, 'public', slug, d), { recursive: true })
// Copy the report template, filling in the slug, title and today's date.
const tpl = join(root, 'scripts/template')
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const fill = (t) => t.replaceAll('__SLUG__', slug).replaceAll('__TITLE__', title.replace(/[<&'"`\\]/g, '')).replaceAll('__DATE__', today)
await mkdir(join(dir, 'report'), { recursive: true })
for (const f of ['index.html', 'report/main.tsx', 'report/App.tsx', 'report/content.ts', 'report/theme.css']) {
  await writeFile(join(dir, f), fill(await readFile(join(tpl, f), 'utf8')))
}
const link = await grant(slug, flag('expires'))
console.log(`Created audits/${slug}/ and public/${slug}/\n\nPrivate link (works after next deploy):\n  ${link}\n\nLocal preview: npm run dev → http://localhost:5173/${slug}/`)
