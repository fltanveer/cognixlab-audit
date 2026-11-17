# cognixlab-audit

Private client audits in one Vercel project. Each audit lives at `/<slug>/` and opens only with its own link.

## Layout

```
audits/<slug>/            one audit: index.html, report/, optional proposal/ + site/
public/<slug>/            that audit's screenshots, images, brand files
src/kit/                  shared UI kit (client-neutral)
middleware.ts             privacy gate (runs on Vercel) + slug → token hash list (safe to commit)
.links.local.json         the actual links, this machine only (gitignored)
```

## Commands

```
npm run dev                                   preview at http://localhost:5173/<slug>/
npm run new-audit -- <slug> --title "Name"    scaffold + print private link
npm run access -- list                        show links
npm run access -- rotate <slug>               new link, old one stops working
npm run access -- revoke <slug>               close an audit
npm run images -- <slug>                      generate images with Gemini (audits/<slug>/images.json)
npm run test:gate                             check that one client cannot open another's audit
npm run build
```

Access changes take effect on the next deploy. Add `--expires YYYY-MM-DD` to `new-audit` or `rotate` for a time-limited link.

## How privacy works

- The client opens `/<slug>/?k=<token>`. The middleware checks the token against the hash in `middleware.ts`, stores it in an HttpOnly cookie scoped to `/<slug>`, and redirects to the clean URL.
- Every file under `/<slug>/` (pages, screenshots, scripts, styles) needs that cookie. Without it the response is the same 404 an unknown address gets.
- The build places anything containing a client's content under `/<slug>/assets/`. Only shared code is public in `/assets/`.
- Everything is `noindex`; `robots.txt` disallows all crawlers.
- Anyone who has the link can view that audit. Rotate the link if it is shared too widely.

The gate only runs on Vercel. `npm run dev` and `npm run preview` serve everything without it.

## Deploy

Import the repo in Vercel (framework: Vite, Hobby plan is enough). If the domain is not `cognixlab-audit.vercel.app`, set `AUDIT_BASE_URL` when running the access scripts so printed links use the right host.
