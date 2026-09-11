/* ============================================================
   Black Quack — media components
   Instagram gallery, YouTube showcase, Footer
   ============================================================ */

const IG_TILES = [
  { cap: "Brew day · Kalamunda garage · March", tag: "brewday" },
  { cap: "Six Points hazy · fresh pour", tag: "beer" },
  { cap: "Grain in · pilsner base", tag: "grain" },
  { cap: "Bassendean Oval · sun's out", tag: "hill" },
  { cap: "New tap handles arrived", tag: "handles" },
  { cap: "Whirlpool addition · Nelson Sauvin", tag: "hops" },
  { cap: "Kegged & carbed · Grass Hill Sour", tag: "keg" },
];

function Instagram() {
  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">04 · @blackquack.brewclub</div>
          <h2 className="h-2">From the shed. To the feed.</h2>
          <p className="body-lg">
            Follow the club for brew days, tasting nights, and the odd Swans post-siren victory lap.
          </p>
        </div>

        <div className="ig-grid">
          {IG_TILES.map((t, i) => (
            <a
              key={i}
              href="#"
              className={`ig-tile ${i === 0 ? "feat" : ""}`}
              aria-label={t.cap}
            >
              <div className="placeholder">
                <div className="mark">
                  <IGIcon size={10} /> &nbsp;POST_{String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="overlay">
                <div className="cap">{t.cap}</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20}}>
          <div className="mono" style={{color: 'var(--fg-muted)'}}>
            <IGIcon size={12} /> &nbsp; @blackquack.brewclub · 1.2k
          </div>
          <a href="#" className="btn">Follow on Instagram <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

const YT_VIDEOS = [
  { title: "How we brew Hill Sitter · Full recipe walkthrough", duration: "14:32", meta: "Recipe · Pilsner", featured: true },
  { title: "First pour · Grass Hill Sour tasting night", duration: "6:48", meta: "Tasting · Sour" },
  { title: "Building the club cellar · Kalamunda garage tour", duration: "9:22", meta: "Behind the scenes" },
];

function YouTube() {
  return (
    <section className="section" id="videos">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">05 · On the tube</div>
          <h2 className="h-2">Brew days, on video.</h2>
          <p className="body-lg">
            Long-form recipe breakdowns, tasting nights, and behind-the-scenes from the club cellar.
          </p>
        </div>

        <div className="yt-grid">
          {YT_VIDEOS.map((v, i) => (
            <a key={i} href="#" className="yt-card">
              <div className="yt-thumb">
                <div className="placeholder" />
                <div className="play">
                  <svg viewBox="0 0 12 12"><path d="M3 2 L 10 6 L 3 10 Z" /></svg>
                </div>
                <div className="duration">{v.duration}</div>
              </div>
              <div>
                <div className="yt-meta" style={{marginBottom: 8}}>
                  <YTIcon size={11} /> &nbsp; {v.meta}
                </div>
                <h3 className="yt-title">{v.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <SwanMark size={40} />
            <h3 className="footer-mark">Black<br/>Quack.</h3>
            <p className="body-lg" style={{maxWidth: '38ch', marginTop: 8}}>
              A homebrew club based in Kalamunda, Western Australia. From the hill. To the tap.
            </p>
          </div>

          <div className="footer-col">
            <h4>Club</h4>
            <ul>
              <li><a href="#origin">The story</a></li>
              <li><a href="#tap">On tap now</a></li>
              <li><a href="#archive">Brew archive</a></li>
              <li><a href="#">Join the club</a></li>
              <li><a href="#">Brew days</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Untappd</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Base camp</h4>
            <ul style={{color: 'var(--fg-muted)'}}>
              <li>Kalamunda</li>
              <li>Perth Hills, WA</li>
              <li>31.97° S · 116.06° E</li>
              <li style={{marginTop: 20}}><a href="mailto:hello@blackquack.club">hello@blackquack.club</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-huge" aria-hidden="true">
          BLACK · QUACK
        </div>

        <div className="footer-bottom">
          <div className="mono">© 2026 Black Quack Brewclub · Homebrewers of the hills</div>
          <div className="mono" style={{display:'flex', alignItems:'center', gap: 8}}>
            <span style={{width:6, height:6, background:'#58c26b', borderRadius:'50%', display:'inline-block'}}></span>
            All systems pouring
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Instagram, YouTube, Footer });
