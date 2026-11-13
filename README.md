# Mellofi Website

A responsive, static website for Mellofi, using your own previously generated artwork.

## Open it

Double-click `index.html` to open it in Safari or Chrome. No build tools required.

## Add your real social links

Open `script.js`, find `MELLOFI_LINKS` at the very top, and replace the empty quotes with the actual full URLs for YouTube, SoundCloud, Spotify and Instagram. Links left empty show a polite notice instead of opening an incorrect page.

## Add the music

The built-in player supports selecting a local audio file from your computer. For a public hosted music player, you need to supply an audio file that you own or have permission to host, then update the source in `index.html`/`script.js`. The current player does **not** falsely claim that the song is already hosted.

## GitHub Pages

1. Create a new public GitHub repository, for example `mellofi`.
2. Upload `index.html`, `styles.css`, `script.js`, and the entire `assets/` directory to the repository root.
3. In the repository's Settings → Pages, choose **Deploy from a branch** → `main` → `/ (root)` → Save.
4. Visit the published address GitHub shows after deployment.

All assets are local, so the page works on GitHub Pages. Google Fonts are optional; fallback fonts are included.

## Customize

- Change track title, descriptions, featured artwork, and headings in `index.html`.
- Change colors in `styles.css` under `:root`.
- Swap images in `assets/` as desired.
- The site contains no analytics, third-party embeds, account system, or backend signup form.
