// npm run access -- list
// npm run access -- rotate <slug> [--expires YYYY-MM-DD]   new link, old one dies on next deploy
// npm run access -- revoke <slug>                           nobody can open it after next deploy
import { checkSlug, flag, grant, list, revoke } from './lib-access.mjs'

const [cmd, slug] = process.argv.slice(2)
try {
  if (cmd === 'list') {
    for (const r of await list()) console.log(`${r.slug}\n  expires: ${r.expires}\n  ${r.link}\n`)
  } else if (cmd === 'rotate') {
    checkSlug(slug)
    console.log(`New private link for ${slug} (works after next deploy):\n  ${await grant(slug, flag('expires'))}`)
  } else if (cmd === 'revoke') {
    checkSlug(slug)
    console.log((await revoke(slug)) ? `Revoked ${slug}. Deploy to apply.` : `${slug} had no access entry.`)
  } else {
    console.error('Usage: npm run access -- list | rotate <slug> [--expires YYYY-MM-DD] | revoke <slug>')
    process.exit(1)
  }
} catch (e) { console.error(e.message); process.exit(1) }
