/* ============================================================
   Black Quack — components
   Shared marks + top-level sections (Nav, Origin, OnTap, Archive)
   ============================================================ */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- SVG marks ---------- */

const SwanMark = ({ size = 28, stroke = false }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
    {stroke ? (
      <path
        d="M12 48 C 14 40, 22 36, 32 36 C 42 36, 48 32, 50 22 C 50 18, 47 16, 44 17 C 42 18, 41 20, 41 22 L 41 26 L 45 24 L 48 22 M 12 48 L 52 48"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    ) : (
      <>
        {/* Body */}
        <path d="M8 46 C 12 38, 22 34, 32 34 C 44 34, 50 28, 51 20 C 51 16, 48 14, 45 15 C 42 16, 41 19, 42 22 L 46 20 L 49 18 L 52 20 L 49 22 L 46 23 L 44 24 C 43 26, 42 28, 40 30 C 36 34, 28 36, 20 40 C 14 42, 10 44, 8 46 Z" fill="currentColor" />
        <circle cx="47" cy="18" r="0.8" fill="var(--bg)" />
        {/* Water line */}
        <path d="M4 50 L 60 50" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      </>
    )}
  </svg>
);

const SwanLine = ({ size = 32 }) => (
  <svg viewBox="0 0 80 40" width={size * 2} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
    <path d="M6 30 C 14 22, 26 20, 36 22 C 44 24, 50 22, 54 16 C 55 12, 53 10, 51 11 C 49 12, 48 14, 49 16 L 53 14 L 56 12 L 58 14" />
    <path d="M2 34 L 74 34" opacity="0.5" />
  </svg>
);

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7 L 12 7 M 8 3 L 12 7 L 8 11" />
  </svg>
);

const TapHandleSVG = () => (
  <svg viewBox="0 0 22 60" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <rect x="6" y="2" width="10" height="14" rx="1" />
    <rect x="8" y="16" width="6" height="30" />
    <circle cx="11" cy="52" r="4" />
    <path d="M11 46 L 11 56" />
  </svg>
);

const PintSilhouette = ({ size = 200 }) => (
  <svg viewBox="0 0 100 160" width={size} height={size * 1.6} fill="currentColor" aria-hidden="true">
    <path d="M20 20 L 80 20 L 74 148 C 74 152, 70 156, 66 156 L 34 156 C 30 156, 26 152, 26 148 Z" opacity="0.9" />
    <path d="M22 22 L 78 22 L 76 34 L 24 34 Z" fill="var(--bg)" opacity="0.15" />
  </svg>
);

const OvalSVG = ({ w = 240 }) => (
  <svg viewBox="0 0 240 140" width={w} height={w * 140 / 240} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <ellipse cx="120" cy="70" rx="110" ry="55" opacity="0.4" />
    <ellipse cx="120" cy="70" rx="80" ry="38" opacity="0.25" />
    <line x1="10" y1="70" x2="230" y2="70" opacity="0.15" strokeDasharray="4 4" />
    <line x1="120" y1="15" x2="120" y2="125" opacity="0.15" strokeDasharray="4 4" />
  </svg>
);

const IGIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.8" fill="currentColor" />
  </svg>
);

const YTIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <path d="M10 9 L 15 12 L 10 15 Z" fill="currentColor" stroke="none" />
  </svg>
);

/* ---------- Nav ---------- */

function Nav({ onJoinClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="nav" data-scrolled={scrolled}>
      <a href="#top" className="nav-brand">
        <SwanMark size={28} />
        <span>Black Quack<br/><span style={{opacity:0.5, fontSize: 10, letterSpacing: '0.12em'}}>Brewclub · EST. 2023</span></span>
      </a>
      <div className="nav-links">
        <a href="#origin">Story</a>
        <a href="#tap">On Tap</a>
        <a href="#archive">Archive</a>
        <a href="#gallery">Gallery</a>
        <a href="#videos">Videos</a>
      </div>
      <button className="btn btn-primary" onClick={onJoinClick}>
        Join the club <ArrowRight />
      </button>
    </nav>
  );
}

/* ---------- Origin ---------- */

function Origin() {
  return (
    <section className="section" id="origin">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">01 · The story</div>
          <h2 className="h-2">A club born on the hill.</h2>
          <p className="body-lg">
            No boardroom. No business plan. Just a handful of mates, a can bar, and the sound of a Saturday footy siren carrying across the oval.
          </p>
        </div>

        <div className="origin-grid">
          <div className="origin-body">
            <p>
              It started at Bassendean Oval. Saturday arvo, Swan Districts at home, sun on the back of your neck, cold one in hand. A few of us on the grass hill overlooking the ground, working through a can bar order and arguing about which local brewery had gotten the pilsner right that summer.
            </p>
            <blockquote className="origin-quote">
              "Reckon we could do better."
            </blockquote>
            <p className="dim">
              That was the whole thing. One line, said as a joke, taken seriously. Six months later we had a garage full of fermenters in Kalamunda, a shared spreadsheet of grain bills, and a rotating tap list that gave us something proper to bring back to the hill.
            </p>
            <p className="dim">
              Black Quack Brewclub is what came out of it — a community of homebrewers up in the hills, chasing better beer, sharper recipes, and the excuse to keep sitting on that grass.
            </p>
          </div>

          <div className="origin-visual">
            <span className="caption">FIG. 01 — BASSENDEAN OVAL</span>
            <span className="caption-r">31.9° S · 116.0° E</span>
            <div className="hill" />
            <OvalSVG w={340} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- On Tap ---------- */

const TAPS = [
  { n: "01", name: "Hill Sitter", style: "West Coast Pilsner", abv: "4.8", ibu: "34", vol: "18 L", brewer: "Curated by Marto", status: "on" },
  { n: "02", name: "Six Points", style: "Hazy IPA", abv: "6.4", ibu: "48", vol: "16 L", brewer: "Curated by Kez", status: "on" },
  { n: "03", name: "Bassy Bitter", style: "English Best Bitter", abv: "4.1", ibu: "38", vol: "14 L", brewer: "Curated by Woody", status: "low" },
  { n: "04", name: "The Black Duck", style: "Schwarzbier", abv: "5.2", ibu: "28", vol: "19 L", brewer: "Curated by Jules", status: "on" },
  { n: "05", name: "Grass Hill Sour", style: "Kettle Sour · Peach", abv: "4.6", ibu: "12", vol: "10 L", brewer: "Curated by Sam", status: "on" },
  { n: "06", name: "Grand Final", style: "Imperial Stout · Barrel", abv: "10.8", ibu: "58", vol: "8 L", brewer: "Curated by Marto", status: "low" },
];

function OnTap() {
  return (
    <section className="section" id="tap">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">02 · On tap now</div>
          <h2 className="h-2">Six lines. Fresh <span style={{fontStyle:'italic', fontFamily:'var(--font-body)', fontWeight: 300, textTransform:'none', letterSpacing:'-0.01em'}}>this weekend</span>.</h2>
          <p className="body-lg">
            Rotating tap list from the club's home cellar. Updated most Fridays. Come pour a taster on brew days.
          </p>
        </div>

        <div className="tap-grid">
          {TAPS.map((t) => (
            <div className="tap-card" key={t.n}>
              <div className="tap-handle"><TapHandleSVG /></div>
              <div className="tap-num">
                <span className={`status ${t.status === "low" ? "low" : ""}`}></span>
                Tap {t.n} · {t.status === "low" ? "Running low" : "Pouring"}
              </div>
              <div>
                <h3 className="tap-name">{t.name}</h3>
                <p className="tap-style">{t.style}</p>
              </div>
              <div className="tap-brewer">{t.brewer}</div>
              <div className="tap-specs">
                <div className="tap-spec">
                  <span className="lbl">ABV</span>
                  <span className="val">{t.abv}<span style={{fontSize:12, opacity:0.5}}>%</span></span>
                </div>
                <div className="tap-spec">
                  <span className="lbl">IBU</span>
                  <span className="val">{t.ibu}</span>
                </div>
                <div className="tap-spec">
                  <span className="lbl">Left</span>
                  <span className="val">{t.vol}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Archive ---------- */

const ARCHIVE = [
  { n: "23", name: "Kalamunda Fog", style: "NEIPA · Citra / Nelson", year: "2026 · Q1" },
  { n: "22", name: "Hill Sitter", style: "West Coast Pilsner", year: "2026 · Q1" },
  { n: "21", name: "Six Points", style: "Hazy IPA · Galaxy", year: "2025 · Q4" },
  { n: "20", name: "The Black Duck", style: "Schwarzbier · Munich malt", year: "2025 · Q4" },
  { n: "19", name: "Grass Hill Sour", style: "Kettle Sour · Peach", year: "2025 · Q3" },
  { n: "18", name: "Bassy Bitter", style: "English Best Bitter", year: "2025 · Q3" },
  { n: "17", name: "Grand Final", style: "Imperial Stout · Bourbon barrel", year: "2025 · Q2" },
  { n: "16", name: "Sunshine Saison", style: "Farmhouse Saison", year: "2025 · Q2" },
  { n: "15", name: "Hills Helles", style: "Munich Helles", year: "2025 · Q1" },
  { n: "14", name: "Dark Mode", style: "American Porter · Cacao", year: "2024 · Q4" },
];

function Archive() {
  return (
    <section className="section" id="archive">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">03 · Brew archive</div>
          <h2 className="h-2">Every batch, every note.</h2>
          <p className="body-lg">
            The club records every recipe — grain bill, hop schedule, tasting notes, what we'd change next time. Members get the full sheet.
          </p>
        </div>

        <div className="archive-list">
          {ARCHIVE.map((b, i) => (
            <div className="archive-row" key={b.n}>
              <span className="idx">№ {b.n}</span>
              <span className="name">{b.name}</span>
              <span className="style-note">{b.style}</span>
              <span className="year">{b.year}</span>
              <span className="go"><ArrowRight size={16}/></span>
            </div>
          ))}
        </div>

        <div style={{marginTop: 40, display: 'flex', justifyContent: 'center'}}>
          <button className="btn">View full recipe book <ArrowRight /></button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  SwanMark, SwanLine, ArrowRight, TapHandleSVG, PintSilhouette, OvalSVG, IGIcon, YTIcon,
  Nav, Origin, OnTap, Archive,
});
