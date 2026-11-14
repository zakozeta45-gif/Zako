# ZAKO PS4 HOST V3.1

Bilingual, responsive PS4 firmware information portal. V3.1 adds a live, read-only GoldHEN release tracker using the official GitHub Releases API.

## Files
- `index.html` — page structure and release tracker UI
- `style.css` — responsive dark neon theme
- `app.js` — bilingual interface, firmware information and live release retrieval

## V3.1 changes
- Live request to `https://api.github.com/repos/GoldHEN/GoldHEN/releases?per_page=5`.
- Shows up to five release entries with tag, publication date, notes and official source link.
- Manual refresh control and clear loading/success/error messages.
- Saves the last successful response in browser local storage and displays it if GitHub is temporarily unreachable.
- Uses DOM text nodes for remote release content rather than injecting remote HTML.
- Preserves the existing firmware status categories.

## Firmware status policy
- **Official**: listed on the official GoldHEN v2.4b18 release page (9.00, 9.60, 10.00, 10.01, 11.00).
- **Community report**: independent community host reports (13.52, 14.00, 14.02). This is not official GoldHEN support.
- **Unverified**: versions with no exact verified entry in this portal. Do not infer compatibility from adjacent versions.

Always re-check original sources before relying on compatibility claims.

## Deployment
This development version is on branch `develop/v3.1`. The published `main` branch is not changed.
After review and testing:
1. Merge or copy the reviewed files into `main`.
2. Keep the four project files in the repository root.
3. Wait for GitHub Pages to redeploy.

## Browser compatibility note
The live tracker depends on browser support for `fetch`, GitHub API availability, network access and the browser's cross-origin policy. Some console browsers may block the API request. The page therefore provides a cached-data fallback and a direct link to the official release page. Test on the target PS4 browser before relying on live updates.

## Safety and scope
Informational website only. It contains no exploit implementation, jailbreak binaries, payload files, or console modification functions. It does not activate GoldHEN. Independent community research project, not affiliated with Sony or the GoldHEN team.
