# GooM

Public home page for GooM, hosted on GitHub Pages at **https://goom.cz/**.

The page introduces the PZTS and CCTV editors, explains the workflow and PROJECT plans, and links to **support@goom.cz**. It supports Czech, English, German and Russian. The hero uses the editor's gray dotted background, pointer-responsive dots and whale logo. Reduced motion is respected.

Buildless static files: `index.html`, `styles.css`, `main.js`, `hero-dots.js`, `Logo.png`, `robots.txt`, `sitemap.xml`. No package installation or build step is required. `.nojekyll` disables Jekyll processing. Preserve `CNAME` with `goom.cz`. The `pzts/` and `cctv/` folders include the complete static editors and local PDF libraries.

Editor links:

- PZTS: https://goom.cz/pzts/
- CCTV: https://goom.cz/cctv/

Both editors keep the existing Firebase project and cloud data. Sign in again on the new domain. Browser-only drafts remain on the old origin: save them to the cloud or export their project files on the old site, then open them on goom.cz. The old sites stay available for this purpose. Editor databases and product-specific settings use separate namespaces on the shared domain.

Prices shown here match the editor's published PROJECT pricing. Checkout and account management remain in PZTS; no payment or account credentials are collected by this home page. The contact link opens the visitor's mail application; it does not send mail automatically.

No analytics or external fonts are loaded. Only the chosen display language is stored locally in the browser.

The navigation sits on a light bar inside the dotted hero, with a compact first screen on desktop and mobile. Public pricing uses the editor's BASIC / PROJECT / COMPANY PROJECT cards, monthly and annual EUR prices, and labeled CZK estimates using the same reference rate as the editor.

Administration is available at `/pzts/admin.html` and `/cctv/admin.html` to authorized Firebase administrator accounts. User lists use server queries and cursors capped at 25 records, with prefix searches for e-mail/name, exact UID lookup, and access/activity filters. Message actions support read/unread and confirmed single/bulk deletion. The existing sender and message content remain immutable.

`editor-usage.js` records approximate active time per signed-in account and application in `goomEditorUsage`. Hidden tabs and inactivity longer than two minutes stop accrual; the server prevents totals from increasing faster than elapsed time. This starts with the release and does not reconstruct earlier usage. Administrators can see totals; users cannot inspect another account's usage. Deploy the corresponding Firestore rules when changing these behaviors.
