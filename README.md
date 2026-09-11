# Black Quack Brewclub

Website for **Black Quack Brewclub** — a homebrew club based in Kalamunda, Western Australia.

**From the hill. To the tap.**

A single-page site featuring an immersive Three.js hero (low-poly black swan, drifting particles, mouse parallax, scroll-driven camera), a rotating tap list, brew archive, Instagram gallery, and YouTube showcase.

---

## Live site

Deploy this repo with **GitHub Pages** and it will be live at `https://<your-username>.github.io/<repo-name>/`.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push the contents of this project to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select **`main`** branch and **`/ (root)`** folder.
5. Click **Save**. GitHub will publish the site in ~30 seconds.

Everything is static — no build step, no dependencies to install. GitHub Pages will serve `index.html` at the root.

> A `.nojekyll` file is included so GitHub Pages serves the site verbatim without running Jekyll.

## Local preview

You need a small local server so ES module imports (Three.js) and JSX/Babel work correctly. Any of these will do:

```bash
# Python 3
python3 -m http.server 8000

# Node (via npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000).

Opening `index.html` directly via `file://` will **not** work — the browser blocks module and JSX loading over the file protocol.

## Project structure

```
.
├── index.html              # Entry point — loads React, Babel, styles, and components
├── styles.css              # All styles (palette variables, layout, motion)
├── three-scene.js          # Three.js hero — swan / pint / can + particles
├── components.jsx          # Nav, Origin, On Tap, Archive + SVG marks
├── components-media.jsx    # Instagram, YouTube, Footer
├── tweaks_panel.jsx        # In-page tweak controls (palette, motion, hero object)
├── .nojekyll               # Tells GitHub Pages to skip Jekyll
├── .gitignore
├── LICENSE
└── README.md
```

## Features

- **Immersive 3D hero** built with Three.js (loaded lazily via ES module import so it doesn't block first paint)
- **Graceful degradation** — falls back to an SVG swan silhouette if WebGL is unavailable
- **Reduced-motion aware** — respects `prefers-reduced-motion: reduce`
- **Mobile responsive** — all sections reflow down to 360px viewports
- **Four palette modes** — Dark, Warm mono, Cool mono, Light (toggle in the tweaks panel)
- **Three hero variants** — Swan, Pint, or Can
- **Restrained motion** — smooth scroll reveals, no bounce, tuned for premium craft feel

## Wiring up real content

The site is scaffolded with placeholders in these arrays / spots:

| Content | File | Location |
|---|---|---|
| Tap list | `components.jsx` | `const TAPS = [...]` |
| Brew archive | `components.jsx` | `const ARCHIVE = [...]` |
| Instagram tiles | `components-media.jsx` | `const IG_TILES = [...]` |
| YouTube videos | `components-media.jsx` | `const YT_VIDEOS = [...]` |
| Footer info | `components-media.jsx` | `function Footer()` |

To plug in live data:
- **Instagram** — swap `IG_TILES` for the Instagram Basic Display API `/me/media` response (or an oEmbed proxy).
- **YouTube** — swap `YT_VIDEOS` for the YouTube Data API `search` / `videos` response. Thumbnails are at `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`.
- **On Tap** — connect a JSON file or Google Sheet via `fetch()` in the `OnTap` component.

## Credits

- Fonts: [Archivo Black](https://fonts.google.com/specimen/Archivo+Black), [Archivo](https://fonts.google.com/specimen/Archivo), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- 3D: [Three.js r160](https://threejs.org/)
- React 18 + Babel Standalone for in-page JSX

## License

MIT — see [LICENSE](./LICENSE).
