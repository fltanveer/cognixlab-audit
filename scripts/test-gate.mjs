// Exercises middleware.ts the way Vercel calls it. Run: npm run test:gate
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import middleware, { ACCESS } from '../middleware.ts'

const hash = (t) => createHash('sha256').update(t).digest('hex')
const A = 'token-for-alpha', B = 'token-for-beta'
for (const k of Object.keys(ACCESS)) delete ACCESS[k]
ACCESS.alpha = { hash: hash(A) }
ACCESS.beta = { hash: hash(B) }
ACCESS.old = { hash: hash(A), expires: '2020-01-01' }

const get = (path, cookie) => middleware(new Request(`https://x.test${path}`, { headers: cookie ? { cookie } : {} }))
const passes = (r) => r.headers.get('x-middleware-next') === '1'
let n = 0
const check = async (name, fn) => { await fn(); n++; console.log(`ok  ${name}`) }

await check('no token, no cookie → 404', async () => assert.equal((await get('/alpha/')).status, 404))
await check('unknown audit → same 404 body as a locked one', async () =>
  assert.equal(await (await get('/nope/')).text(), await (await get('/alpha/')).text()))
await check('wrong token → 404, no cookie set', async () => {
  const r = await get('/alpha/?k=wrong'); assert.equal(r.status, 404); assert.equal(r.headers.get('set-cookie'), null)
})
await check('right token → redirect without token, cookie scoped to that audit', async () => {
  const r = await get(`/alpha/?k=${A}`)
  assert.equal(r.status, 302); assert.equal(r.headers.get('location'), '/alpha/')
  const c = r.headers.get('set-cookie')
  assert.match(c, /Path=\/alpha;/); assert.match(c, /HttpOnly/); assert.match(c, /Secure/)
})
await check('token on /alpha (no slash) → redirect to /alpha/', async () =>
  assert.equal((await get(`/alpha?k=${A}`)).headers.get('location'), '/alpha/'))
await check('cookie opens pages, proposal, screenshots and scripts', async () => {
  for (const p of ['/alpha/', '/alpha/proposal/', '/alpha/shots/live.webp', '/alpha/assets/abc.js'])
    assert.ok(passes(await get(p, `audit_key=${A}`)), p)
})
await check("alpha's token does not open beta (link)", async () => assert.equal((await get(`/beta/?k=${A}`)).status, 404))
await check("alpha's cookie does not open beta (pages or files)", async () => {
  for (const p of ['/beta/', '/beta/shots/live.webp', '/beta/assets/abc.js'])
    assert.equal((await get(p, `audit_key=${A}`)).status, 404, p)
})
await check('expired audit → 404 even with the right token', async () => {
  assert.equal((await get(`/old/?k=${A}`)).status, 404); assert.equal((await get('/old/', `audit_key=${A}`)).status, 404)
})
await check('prototype keys are not audits', async () => {
  for (const p of ['/__proto__/', '/constructor/', '/toString/']) assert.equal((await get(p)).status, 404, p)
})
await check('gated responses are noindex and private', async () => {
  const r = await get('/alpha/', `audit_key=${A}`)
  assert.match(r.headers.get('x-robots-tag'), /noindex/); assert.match(r.headers.get('cache-control'), /private/)
})
console.log(`\n${n} checks passed`)
