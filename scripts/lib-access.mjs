// Shared helpers for the access scripts: read/write access.ts and the local link book.
import { readFile, writeFile } from 'node:fs/promises'
import { createHash, randomBytes } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const accessFile = join(root, 'middleware.ts')
const linksFile = join(root, '.links.local.json') // gitignored: the only place tokens are kept
const RE = /\/\*ACCESS-BEGIN\*\/([\s\S]*?)\/\*ACCESS-END\*\//

export const BASE_URL = (process.env.AUDIT_BASE_URL ?? 'https://cognixlab-audit.vercel.app').replace(/\/$/, '')
export const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,40}$/
const RESERVED = new Set(['assets', 'api', 'src', 'public', 'proposal'])

export function checkSlug(slug) {
  if (!slug || !SLUG_RE.test(slug) || RESERVED.has(slug)) {
    throw new Error(`Invalid slug "${slug ?? ''}". Use lowercase letters, digits and hyphens, e.g. acme-co.`)
  }
}

export async function readAccess() {
  const src = await readFile(accessFile, 'utf8')
  const m = src.match(RE)
  if (!m) throw new Error('middleware.ts: ACCESS markers not found')
  return JSON.parse(m[1])
}

export async function writeAccess(access) {
  const src = await readFile(accessFile, 'utf8')
  const sorted = Object.fromEntries(Object.entries(access).sort(([a], [b]) => a.localeCompare(b)))
  await writeFile(accessFile, src.replace(RE, () => `/*ACCESS-BEGIN*/${JSON.stringify(sorted, null, 2)}/*ACCESS-END*/`))
}

async function readLinks() {
  try { return JSON.parse(await readFile(linksFile, 'utf8')) } catch { return {} }
}

/** Issue a fresh token for a slug. Any earlier link for that slug stops working on next deploy. */
export async function grant(slug, expires) {
  if (expires && !/^\d{4}-\d{2}-\d{2}$/.test(expires)) throw new Error('--expires must be YYYY-MM-DD')
  const token = randomBytes(32).toString('base64url')
  const access = await readAccess()
  access[slug] = { hash: createHash('sha256').update(token).digest('hex'), ...(expires ? { expires } : {}) }
  await writeAccess(access)
  const link = `${BASE_URL}/${slug}/?k=${token}`
  const links = await readLinks()
  links[slug] = { link, ...(expires ? { expires } : {}), issued: new Date().toISOString().slice(0, 10) }
  await writeFile(linksFile, JSON.stringify(links, null, 2) + '\n')
  return link
}

export async function revoke(slug) {
  const access = await readAccess()
  if (!(slug in access)) return false
  delete access[slug]
  await writeAccess(access)
  const links = await readLinks()
  delete links[slug]
  await writeFile(linksFile, JSON.stringify(links, null, 2) + '\n')
  return true
}

export async function list() {
  const [access, links] = [await readAccess(), await readLinks()]
  return Object.keys(access).map((slug) => ({ slug, expires: access[slug].expires ?? '—', link: links[slug]?.link ?? '(token not on this machine — rotate to get a new link)' }))
}

export function flag(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : undefined
}
