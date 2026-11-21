# GooM

Public home page for GooM, hosted on GitHub Pages at **https://goom.cz/**.

The page introduces the PZTS and CCTV editors, explains the workflow and PROJECT plans, and links to **support@goom.cz**. It supports Czech, English, German and Russian. The full-width hero uses the supplied `introsite.mp4`, muted at 0.55× speed with soft fades and a three-second pause between plays, and drafting trails that follow the pointer or a tablet touch. The encoded letterboxing in the opening footage is cropped only in the presentation layer. Background animation can be paused; reduced motion and data-saving preferences skip video playback.

Buildless static files include `index.html`, `styles.css`, `launch.css`, `main.js`, `hero-trails.js`, `introsite.mp4`, `Logo.png`, `404.html`, `utility.css`, `utility-pages.js`, `intellectual-property/index.html`, `robots.txt` and `sitemap.xml`. No package installation or build step is required. `.nojekyll` disables Jekyll processing. Preserve `CNAME` with `goom.cz`. The `pzts/` and `cctv/` folders include the complete static editors and local PDF libraries.

Editor links:

- PZTS: https://goom.cz/pzts/
- CCTV: https://goom.cz/cctv/

Both editors keep the existing Firebase project and cloud data. Sign in again on the new domain. Browser-only drafts remain on the old origin: save them to the cloud or export their project files on the old site, then open them on goom.cz. The canonical editor URLs are the goom.cz paths above; source repositories can be maintained separately. Editor databases and product-specific settings use separate namespaces on the shared domain.

Prices shown here match the editor's published PROJECT pricing. Checkout and account management remain in PZTS; no payment or account credentials are collected by this home page. The contact link opens the visitor's mail application; it does not send mail automatically.

No analytics or external fonts are loaded. Only the chosen display language is stored locally in the browser.

Public pricing uses the editor's BASIC / PROJECT / COMPANY PROJECT cards, monthly and annual EUR prices, and labeled CZK estimates using the same reference rate as the editor.

The navigation uses a borderless translucent dark bar with light links. Pricing has a compact title, borderless cards and a starred best-choice marker. A program switch routes BASIC, PROJECT and COMPANY PROJECT buttons to PZTS or CCTV; EPS and SK are visibly reserved as coming soon. CCTV public-checkout availability is disclosed when selected. Large code-native SVG file and account marks explain DXF, SVG, SSO, Google and e-mail sign-in. The custom 404 uses absolute asset paths so it also works at missing nested URLs. Intellectual-property information is available in all four languages at `/intellectual-property/`; this notice preserves user-project ownership and third-party licences.

Both editors export editable CAD geometry to AutoCAD 2007-compatible DXF in millimetres at the selected sheet size, alongside SVG. Geometry and text stay editable; curves may be approximated as polylines and raster backgrounds are excluded from DXF. BASIC retains a textual watermark. Use `.TECH` / `.cctv` for the native project data. The site explains SSO as the existing shared GooM account and persisted session for both paths on the same browser and origin, using Google or e-mail/password; application entitlements remain separate.

Administration is available at `/pzts/admin.html` and `/cctv/admin.html` to authorized Firebase administrator accounts. User lists use server queries and cursors capped at 25 records, with prefix searches for e-mail/name, exact UID lookup, and access/activity filters. Message actions support read/unread and confirmed single/bulk deletion. The existing sender and message content remain immutable.

`editor-usage.js` records approximate active time per signed-in account and application in `goomEditorUsage`. Hidden tabs and inactivity longer than two minutes stop accrual; the server prevents totals from increasing faster than elapsed time. This starts with the release and does not reconstruct earlier usage. Administrators can see totals; users cannot inspect another account's usage. Deploy the corresponding Firestore rules when changing these behaviors.


## GooM toolbar guide and community totals

The ? panel keeps its keyboard shortcuts and has one Play row above them. The guide covers 16 steps: each upper control, search, building section, import and saving. No placement/rotation/device-menu lessons are included. Spotlight geometry uses the actual target in SVG screen coordinates; hidden search is exposed only during its blocked tutorial step and restored afterwards. The tour restores project data and previously open dialogs.

Save / Export shows format buttons and a compact, seven-part readiness line with small dots. Completed dots are lime; details are available as accessible labels/tooltips. The score indicates documentation completeness.

The homepage shows a short six-part feature timeline instead of a manual. The former /guide/ URL redirects to /#workflow. Public counters come from goomPublicStats: the sum of existing activeSeconds across all users and the sum of new-project events since 20 November 2026. Old local project creation history was never collected and is not invented.

Only the two actual new-project confirmation handlers enqueue goomProjectCreated. Import, reopening, reloading and the guide never do. Pending IDs are isolated by user and product and retried with the same operation ID. A verified, profiled account is required; the backend deduplicates IDs in a transaction. Counter documents remain private under the existing deny-by-default rules. Public statistics return only aggregate totals, cache for one minute and show a dash when unavailable.

Backend deployment: firebase deploy --only functions:project-cloud:goomProjectCreated,functions:project-cloud:goomPublicStats --project pztsepscctv --non-interactive


## Maps and community gauges — 21 November 2026

The welcome screen uses the same lime as the PZTS launch button and no longer offers the guide. The ? menu still launches the toolbar guide. The site timeline has a dark background with contrasting text.

The map picker has one overhead imagery view, a wider viewport, right-side geolocation and a bottom-right add button. Its A4 frame matches the imported 1684×1191 working image and 3508×2480 detailed source. Czech tiles use ČÚZK orthophotos with World Imagery fallback; other locations use World Imagery. Zoom is bounded to avoid extreme enlargement of coarse parent tiles. Existing projects and their stored backgrounds remain supported.

Building polygons come from the building layer of public OpenFreeMap / OpenMapTiles vector tiles. A bounded, local MVT decoder reads only polygons; there are at most four parallel requests and sixteen tiles per import. Geometry is clipped to the capture, sanitized, stored with the project, and drawn as closed straight anthracite paths in light mode and vector export. If geometry is unavailable, photographic edge processing remains available. Source credits are plain links and metadata, with no information badge.

Community totals remain real server aggregates. Hours are on the left with a lime arc; projects on the right with a pale-blue arc. Both fill from bottom to top toward round milestones shown in their accessible values and tooltips. Visible readiness captions and heading are removed; each dot keeps its tooltip and accessible label. Dialog close buttons use no outline frame.
