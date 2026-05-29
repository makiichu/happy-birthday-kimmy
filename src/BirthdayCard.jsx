import { useState, useEffect, useRef } from "react";

const palette = {
  cream: "#FAF6EF",
  parchment: "#F0E8D8",
  dustyRose: "#D4919A",
  blush: "#E8B4BB",
  sage: "#8FAF8A",
  deepSage: "#5A7A55",
  mauve: "#9B6E7A",
  deepMauve: "#6B3D4A",
  gold: "#C9A84C",
  deepGold: "#8B6914",
  inkDark: "#2C1F2E",
  inkMid: "#4A3550",
  inkLight: "#7A6080",
};

const flowers = [
  { name: "Tulip", emoji: "🌷", color: "#E87EA1" },
  { name: "Rose", emoji: "🌹", color: "#C0394B" },
  { name: "Lily", emoji: "💐", color: "#F4A460" },
  { name: "Orchid", emoji: "🌸", color: "#DA70D6" },
  { name: "Peony", emoji: "🌸", color: "#FFB7C5" },
  { name: "Hydrangea", emoji: "💜", color: "#9B7DC8" },
  { name: "Carnation", emoji: "🌺", color: "#FF6B8A" },
  { name: "Azalea", emoji: "🌺", color: "#FF69B4" },
  { name: "Baby's Breath", emoji: "🤍", color: "#F8F8FF" },
  { name: "Stargazer", emoji: "⭐", color: "#FF4D6D" },
];

const books = [
  { title: "Stoner", author: "John Williams", spine: "#8B5E3C", text: "#F5DEB3", tag: "Novel" },
  { title: "Heaven's Official Blessing", author: "MXTX", spine: "#6B3D8A", text: "#E8D5FF", tag: "Manwha" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", spine: "#2C5F2E", text: "#C8F0C8", tag: "Classic" },
  { title: "Jane Eyre", author: "Charlotte Brontë", spine: "#8B2252", text: "#FFD0E8", tag: "Classic" },
  { title: "Pride & Prejudice", author: "Jane Austen", spine: "#3D5A80", text: "#B8D4F0", tag: "Classic" },
  { title: "Middlemarch", author: "George Eliot", spine: "#7A5230", text: "#F0DFC0", tag: "Classic" },
  { title: "Anne of Green Gables", author: "L.M. Montgomery", spine: "#4A7A4A", text: "#D0F0D0", tag: "Classic" },
];

const tsAlbums = [
  { title: "Fearless", year: "2008", color: "#C9A84C" },
  { title: "Speak Now", color: "#8B6BA8" },
  { title: "Red", year: "2012", color: "#9B2335" },
  { title: "1989", year: "2014", color: "#87CEEB" },
  { title: "reputation", year: "2017", color: "#1C1C1C" },
  { title: "Lover", year: "2019", color: "#F4A0C8" },
  { title: "folklore", year: "2020", color: "#8A8A8A" },
  { title: "evermore", year: "2020", color: "#8B5E3C" },
  { title: "Midnights", year: "2022", color: "#191970" },
  { title: "TTPD", year: "2024", color: "#C4B49A" },
];

const movies = [
  { title: "Project Hail Mary", icon: "🚀", desc: "Andy Weir's solo mission to save Earth" },
  { title: "The Loved One", icon: "🎬", desc: "A dark comedy classic" },
];

const yuzuruMoments = [
  { label: "2014 Sochi", detail: "Olympic Gold — history made" },
  { label: "2018 PyeongChang", detail: "Back-to-back Olympic Gold" },
  { label: "Otoñal", detail: "A program that stopped the world" },
  { label: "SEIMEI", detail: "Warrior meets artist on ice" },
];

const FloatingPetal = ({ style }) => (
  <div
    style={{
      position: "absolute",
      fontSize: "1.2rem",
      opacity: 0.25,
      animation: `floatPetal ${style.duration}s ease-in-out infinite`,
      animationDelay: `${style.delay}s`,
      left: style.left,
      top: style.top,
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    {style.char}
  </div>
);

const petals = Array.from({ length: 18 }, (_, i) => ({
  char: ["🌸", "🌷", "🌹", "✿", "❀", "🌺"][i % 6],
  left: `${(i * 5.5) % 100}%`,
  top: `${(i * 7.3 + 10) % 90}%`,
  duration: 4 + (i % 4),
  delay: (i * 0.4) % 3,
}));

const SectionTitle = ({ children, sub }) => (
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
      <div style={{ height: "1px", width: "60px", background: `linear-gradient(to right, transparent, ${palette.gold})` }} />
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.6rem",
        color: palette.deepMauve,
        margin: 0,
        letterSpacing: "0.04em",
      }}>{children}</h2>
      <div style={{ height: "1px", width: "60px", background: `linear-gradient(to left, transparent, ${palette.gold})` }} />
    </div>
    {sub && <p style={{ color: palette.inkLight, fontSize: "0.85rem", marginTop: "0.4rem", fontStyle: "italic" }}>{sub}</p>}
  </div>
);

const BookSpine = ({ book, index }) => {
  const [hovered, setHovered] = useState(false);
  const heights = [160, 150, 170, 145, 165, 155, 148];
  const h = heights[index % heights.length];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "38px",
        height: `${h}px`,
        background: book.spine,
        borderRadius: "2px 3px 3px 2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-12px) rotate(-1deg)" : "translateY(0)",
        boxShadow: hovered ? "4px 8px 20px rgba(0,0,0,0.35)" : "2px 2px 6px rgba(0,0,0,0.2)",
        position: "relative",
        flexShrink: 0,
        borderLeft: `3px solid rgba(0,0,0,0.2)`,
      }}
    >
      <span style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
        color: book.text,
        fontSize: "0.6rem",
        fontFamily: "'Playfair Display', serif",
        fontWeight: "600",
        padding: "4px",
        textAlign: "center",
        lineHeight: 1.2,
        maxHeight: "90%",
        overflow: "hidden",
        letterSpacing: "0.05em",
      }}>{book.title}</span>
      {hovered && (
        <div style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          background: palette.inkDark,
          color: "#fff",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "0.72rem",
          whiteSpace: "nowrap",
          zIndex: 10,
          marginBottom: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          textAlign: "center",
          lineHeight: 1.5,
        }}>
          <div style={{ fontWeight: 600, marginBottom: "2px" }}>{book.title}</div>
          <div style={{ opacity: 0.7 }}>{book.author}</div>
          <div style={{
            display: "inline-block",
            marginTop: "4px",
            background: palette.dustyRose,
            color: "#fff",
            borderRadius: "3px",
            padding: "1px 6px",
            fontSize: "0.65rem",
          }}>{book.tag}</div>
        </div>
      )}
    </div>
  );
};

export default function BirthdayCard() {
  const [opened, setOpened] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [chichayBounce, setChichayBounce] = useState(false);
  const [petalVisible, setPetalVisible] = useState(true);
  const [tsHover, setTsHover] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setChichayBounce(v => !v);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!opened) {
    return (
      <div style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 40% 30%, #F0E8D8 0%, #E8DCC8 50%, #D8CEBC 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        position: "relative",
        overflow: "hidden",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
          @keyframes floatPetal { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(10deg)} }
          @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.04)} }
          @keyframes shimmer { 0%{opacity:0.6}50%{opacity:1}100%{opacity:0.6} }
          @keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        `}</style>
        {petals.map((p, i) => <FloatingPetal key={i} style={p} />)}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            animation: "bounce 2s ease-in-out infinite",
          }}>📖</div>
          <div style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${palette.blush}`,
            borderRadius: "16px",
            padding: "3rem 4rem",
            boxShadow: "0 8px 40px rgba(155,110,122,0.2)",
            maxWidth: "420px",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "0.9rem",
              color: palette.inkLight,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}>A letter for</p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2.8rem",
              color: palette.deepMauve,
              margin: "0 0 0.5rem",
              lineHeight: 1.1,
            }}>My Dearest<br /><em>Library Girl</em></h1>
            <div style={{
              height: "2px",
              background: `linear-gradient(to right, transparent, ${palette.dustyRose}, transparent)`,
              margin: "1.2rem 0",
            }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              color: palette.inkMid,
              lineHeight: 1.7,
              marginBottom: "2rem",
              fontStyle: "italic",
            }}>
              Between every chapter, every song,<br />every film — you make it all more beautiful.
            </p>
            <button
              onClick={() => setOpened(true)}
              style={{
                background: `linear-gradient(135deg, ${palette.dustyRose}, ${palette.mauve})`,
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                padding: "0.9rem 2.5rem",
                fontSize: "1rem",
                fontFamily: "'Playfair Display', serif",
                cursor: "pointer",
                letterSpacing: "0.08em",
                boxShadow: "0 4px 20px rgba(180,100,120,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                animation: "pulse 2.5s ease-in-out infinite",
              }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 28px rgba(180,100,120,0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(180,100,120,0.35)"; }}
            >
              Open Your Gift 🌸
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, #FAF6EF 0%, #F5EDE0 40%, #F0E4D4 100%)`,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      color: palette.inkDark,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        @keyframes floatPetal { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(10deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.06)} }
        @keyframes shimmer { 0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5} }
        @keyframes dogBounce { 0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(155,100,122,0.18) !important; }
      `}</style>

      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "5rem 2rem 4rem",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 0%, rgba(212,145,154,0.15) 0%, transparent 70%)`,
      }}>
        {petals.slice(0, 10).map((p, i) => <FloatingPetal key={i} style={p} />)}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: palette.mauve,
            marginBottom: "0.8rem",
          }}>✦ Happy Birthday ✦</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: palette.deepMauve,
            margin: "0 0 1rem",
            lineHeight: 1.05,
          }}>
            To My Favorite<br /><em style={{ color: palette.dustyRose }}>Book Lover</em>
          </h1>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "1.8rem",
            marginBottom: "2rem",
          }}>
            {["🌷","🌹","🌸","💜","🌺"].map((f, i) => (
              <span key={i} style={{ animation: `floatPetal ${3+i*0.5}s ease-in-out infinite`, animationDelay: `${i*0.3}s` }}>{f}</span>
            ))}
          </div>
          <blockquote style={{
            maxWidth: "550px",
            margin: "0 auto",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: palette.inkMid,
            lineHeight: 1.8,
            borderLeft: `3px solid ${palette.blush}`,
            paddingLeft: "1.5rem",
            textAlign: "left",
          }}>
            "You are every book I ever wanted to read — every page a discovery, every chapter a reason to stay up far too late."
          </blockquote>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* Flower Garden */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="your garden, in full bloom">The Flower Garden</SectionTitle>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "1rem",
          }}>
            {flowers.map((f, i) => (
              <div key={i} className="card-hover" style={{
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${palette.blush}`,
                borderRadius: "12px",
                padding: "1.2rem 0.8rem",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(155,100,122,0.08)",
                cursor: "default",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>{f.emoji}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  color: palette.deepMauve,
                  fontWeight: "600",
                }}>{f.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bookshelf */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="hover over a spine to peek inside">The Reading Nook</SectionTitle>
          <div style={{
            background: "rgba(255,255,255,0.5)",
            border: `1px solid ${palette.blush}`,
            borderRadius: "16px",
            padding: "2rem 2rem 0",
            overflow: "hidden",
          }}>
            {/* Shelf label */}
            <p style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: palette.inkLight,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}>Hover a book ✦ Classics & Favorites</p>
            {/* Books */}
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "4px",
              justifyContent: "center",
              paddingBottom: "0",
              position: "relative",
              minHeight: "190px",
            }}>
              {books.map((b, i) => <BookSpine key={i} book={b} index={i} />)}
            </div>
            {/* Shelf plank */}
            <div style={{
              height: "14px",
              background: `linear-gradient(180deg, #C4956A 0%, #8B5E3C 100%)`,
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 4px 12px rgba(100,60,20,0.3)",
              margin: "0 -2rem",
            }} />
            {/* Shelf base */}
            <div style={{
              background: "#7A4F2F",
              height: "8px",
              margin: "0 -2rem",
              borderRadius: "0 0 16px 16px",
            }} />
          </div>
          <p style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.85rem",
            color: palette.inkLight,
            fontStyle: "italic",
          }}>…and every book she hasn't read yet — waiting patiently on the shelf.</p>
        </section>

        {/* Taylor Swift */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="all 10 eras, all the feelings">The Eras</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.8rem" }}>
            {tsAlbums.map((a, i) => (
              <div
                key={i}
                className="card-hover"
                onMouseEnter={() => setTsHover(i)}
                onMouseLeave={() => setTsHover(null)}
                style={{
                  background: tsHover === i ? a.color : "rgba(255,255,255,0.65)",
                  border: `1.5px solid ${a.color}`,
                  borderRadius: "10px",
                  padding: "0.9rem 0.7rem",
                  textAlign: "center",
                  cursor: "default",
                  boxShadow: tsHover === i ? `0 6px 24px ${a.color}55` : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>🎵</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: tsHover === i ? (a.color === "#1C1C1C" ? "#fff" : palette.inkDark) : palette.deepMauve,
                  lineHeight: 1.3,
                }}>{a.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Yuzuru */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="grace, precision, poetry on ice">Yuzuru Hanyu</SectionTitle>
          <div style={{
            background: "rgba(255,255,255,0.6)",
            border: `1px solid ${palette.blush}`,
            borderRadius: "16px",
            padding: "2.5rem",
          }}>
            <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ fontSize: "5rem", lineHeight: 1 }}>⛸️</div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: palette.deepMauve,
                  margin: "0 0 0.5rem",
                }}>The Prince of Figure Skating</h3>
                <p style={{ color: palette.inkLight, lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                  Two Olympic golds. Performances that feel less like sport and more like poetry in motion.
                  Every routine a love letter to the ice.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  {yuzuruMoments.map((m, i) => (
                    <div key={i} style={{
                      background: "rgba(155,110,122,0.08)",
                      border: `1px solid ${palette.blush}`,
                      borderRadius: "8px",
                      padding: "0.8rem 1rem",
                    }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: "600", color: palette.mauve, fontSize: "0.85rem" }}>{m.label}</div>
                      <div style={{ fontSize: "0.75rem", color: palette.inkLight, marginTop: "0.2rem" }}>{m.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chichay */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="our little chaos agent">Chichay 🐾</SectionTitle>
          <div style={{
            background: "rgba(255,255,255,0.7)",
            border: `1px solid ${palette.blush}`,
            borderRadius: "20px",
            padding: "2.5rem",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <div style={{
              fontSize: "6rem",
              animation: chichayBounce ? "dogBounce 1s ease-in-out" : "none",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setChichayBounce(v => !v)}>
              🐶
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                color: palette.deepMauve,
                margin: "0 0 0.5rem",
              }}>Chichay</h3>
              <p style={{
                color: palette.inkMid,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.8rem",
              }}>Jack Russell × Boston Terrier</p>
              <p style={{
                color: palette.inkMid,
                lineHeight: 1.8,
                fontSize: "0.95rem",
                maxWidth: "380px",
                fontStyle: "italic",
              }}>
                Equal parts chaos, zoomies, and unconditional love. She may have claimed the bed,
                the couch, and your heart — and honestly, she earned it all.
              </p>
              <p style={{ fontSize: "0.8rem", color: palette.inkLight, marginTop: "0.5rem" }}>(click the dog 🐾)</p>
            </div>
          </div>
        </section>

        {/* Movies */}
        <section style={{ marginBottom: "5rem" }}>
          <SectionTitle sub="our cinema dates 🎬">Movie Nights</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {movies.map((m, i) => (
              <div key={i} className="card-hover" style={{
                background: "rgba(255,255,255,0.65)",
                border: `1px solid ${palette.blush}`,
                borderRadius: "14px",
                padding: "1.5rem",
                boxShadow: "0 2px 12px rgba(155,100,122,0.08)",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.6rem" }}>{m.icon}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: palette.deepMauve,
                  marginBottom: "0.3rem",
                }}>{m.title}</div>
                <div style={{ fontSize: "0.8rem", color: palette.inkLight }}>{m.desc}</div>
              </div>
            ))}
            <div className="card-hover" style={{
              background: `linear-gradient(135deg, rgba(212,145,154,0.15), rgba(155,110,122,0.1))`,
              border: `1.5px dashed ${palette.blush}`,
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gridColumn: "span 1",
            }}>
              <div>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>🎟️</div>
                <div style={{ fontSize: "0.85rem", color: palette.inkLight, fontStyle: "italic" }}>
                  More movies, more popcorn,<br />more us — coming soon
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final letter */}
        <section>
          <div style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(240,232,220,0.6) 100%)`,
            border: `1px solid ${palette.blush}`,
            borderRadius: "20px",
            padding: "3.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(212,145,154,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(155,110,122,0.08) 0%, transparent 50%)`,
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>🌸</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                color: palette.deepMauve,
                marginBottom: "1.5rem",
              }}>With All My Love</h2>
              <p style={{
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.9,
                color: palette.inkMid,
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}>
                You love books that make you think, music that makes you feel,
                ice skaters who make the world hold its breath, and a dog who makes every day
                warmer. I love every version of you — the one deep in a chapter at midnight,
                the one humming Taylor in the kitchen, the one crying at a sad manhwa panel.
                <br /><br />
                Happy Birthday, my library girl.
                All your favorite things have one thing in common —
                they all remind me of <em style={{ color: palette.dustyRose }}>you</em>.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", fontSize: "1.6rem" }}>
                {["🌷","🌹","🌸","🤍","🌺","💜","🌸","🌹","🌷"].map((f, i) => (
                  <span key={i} style={{
                    animation: `floatPetal ${3+i*0.3}s ease-in-out infinite`,
                    animationDelay: `${i*0.2}s`,
                    display: "inline-block",
                  }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
