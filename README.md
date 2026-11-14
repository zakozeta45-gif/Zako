# ZAKO PS4 HOST V3.0

Bilingual, responsive PS4 firmware information portal covering firmware entries from 9.00 through 14.02, with future additions possible.

## Files
- `index.html` — page structure and sections
- `style.css` — responsive neon theme
- `app.js` — language switch and firmware status lookup

## Firmware status policy
- **Official**: listed on the GoldHEN project's official v2.4b18 release page (9.00, 9.60, 10.00, 10.01, 11.00).
- **Community report**: independent Afterglow host repository reports 13.52, 14.00 and 14.02 and references GoldHEN v2.4b18.14. This is not an official GoldHEN release or endorsement.
- **Unverified**: versions with no exact verified entry in this portal. Do not infer compatibility from adjacent versions.

These are research labels, not a guarantee that a customer's console will work. Recheck source commits and releases before updating claims.

## Update later firmware versions
Edit `versions` and `fwData` in `app.js`, then add a source URL and a clear status classification. Never mark a version official unless it appears in official GoldHEN documentation.

## Deploy to existing GitHub Pages repository
1. Extract this ZIP.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md` to the root of your existing `Zako` repository.
3. Replace the old files with the same names.
4. Commit the changes to the `main` branch.
5. Wait for GitHub Pages to redeploy. Your existing Pages URL remains unchanged.

## Safety and scope
Informational website only. It contains no exploit implementation, jailbreak binaries, payload files, or console modification functions. It does not activate GoldHEN. Independent community research project, not affiliated with Sony or the GoldHEN team.
