// Privacy gate. Runs on Vercel before any file is served.
//
// Each audit lives under /<slug>/ and opens only with its own access token:
//   1. The client opens /<slug>/?k=<token>.
//   2. A valid token is stored in an HttpOnly cookie scoped to /<slug>,
//      and the browser is redirected to the same URL without the token.
//   3. Every later request under /<slug>/ (pages, screenshots, scripts) needs that cookie.
// Anything else gets the same 404 whether or not the audit exists.

// Self-contained on purpose: no imports, so nothing can fail to bundle on Vercel.

export interface Grant {
  /** SHA-256 (hex) of the access token. */
  hash: string
  /** Optional last day of access, YYYY-MM-DD (UTC). */
  expires?: string
}

// Who may open which audit. Managed by `npm run new-audit` and `npm run access`.
// Holds only SHA-256 hashes of the access tokens, so it is safe to commit.
// The token itself exists only in the link you send to the client.
export const ACCESS: Record<string, Grant> = /*ACCESS-BEGIN*/{
  "hrpivotworks": {
    "hash": "f72f61a50caa3d3b7974a52f2e036887b8daa8df14d00119703da63c81c6d57f"
  },
  "noelte": {
    "hash": "26fa7ba61e347b1cda2b8f9246ccc28279840dfdf34bdd95e74504213f597924"
  },
  "valueamplified": {
    "hash": "ef8c250ae03d94562eeaf60874eb657a7b442f68e04cf244bf7921322f73f0f6"
  }
}/*ACCESS-END*/

export const config = {
  // Everything except the home page, shared client-neutral assets and robots.txt.
  matcher: ['/((?!assets/|robots\\.txt$|favicon\\.ico$).+)'],
}

const COOKIE = 'audit_key'
const MAX_AGE = 60 * 60 * 24 * 90 // 90 days

const PRIVATE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'private, no-cache',
  'Referrer-Policy': 'no-referrer',
}

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function readCookie(request: Request, name: string): string | null {
  for (const part of (request.headers.get('cookie') ?? '').split(';')) {
    const eq = part.indexOf('=')
    if (eq > 0 && part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim()
  }
  return null
}

function notFound(): Response {
  return new Response('<!doctype html><meta charset="utf-8"><title>404</title><body style="font:15px system-ui;padding:40px">404 — Not found</body>', {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...PRIVATE_HEADERS },
  })
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const slug = url.pathname.split('/')[1] ?? ''
  const grant = Object.hasOwn(ACCESS, slug) ? ACCESS[slug] : undefined
  if (!grant) return notFound()
  if (grant.expires && Date.now() > Date.parse(`${grant.expires}T23:59:59Z`)) return notFound()

  // First visit: token in the link.
  const key = url.searchParams.get('k')
  if (key !== null) {
    if ((await sha256(key)) !== grant.hash) return notFound()
    url.searchParams.delete('k')
    if (url.pathname === `/${slug}`) url.pathname = `/${slug}/`
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.pathname + url.search,
        'Set-Cookie': `${COOKIE}=${key}; Path=/${slug}; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        ...PRIVATE_HEADERS,
      },
    })
  }

  // Later visits: cookie scoped to this audit only.
  const cookie = readCookie(request, COOKIE)
  if (!cookie || (await sha256(cookie)) !== grant.hash) return notFound()
  // Continue to the static file; Vercel merges these headers into its response.
  return new Response(null, { headers: { 'x-middleware-next': '1', ...PRIVATE_HEADERS } })
}
