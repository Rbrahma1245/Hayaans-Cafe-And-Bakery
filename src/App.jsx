import { useState } from "react";
import { sweets, categories } from "./data/sweets.js";

const ADDRESS = "Victorian Comfort, 18/1, Victoria Rd, Victoria Layout, Bengaluru, Karnataka 560047";
const PHONE_DISPLAY = "083102 21057";
const PHONE_LINK = "tel:+918310221057";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("HaYaan's Cafe And Bakery, " + ADDRESS);

const ribbon = ["Fresh baked daily", "🥐", "Cakes", "🍰", "Pastries", "🧁", "Cookies", "🍪", "Gift boxes", "🍫"];

function SweetCard({ sweet, index = 0 }) {
  return (
    <article className="card" style={{ "--i": index }}>
      <div className="card-art" style={{ background: sweet.tint }}>
        {sweet.image ? (
          <img src={sweet.image} alt={sweet.name} loading="lazy" />
        ) : (
          <span role="img" aria-label={sweet.name}>{sweet.emoji}</span>
        )}
      </div>
      <div className="card-body">
        <div className="card-head">
          <h3>{sweet.name}</h3>
          {sweet.price != null && <span className="price">₹{sweet.price}</span>}
        </div>
        <p>{sweet.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? sweets : sweets.filter((s) => s.category === active);

  return (
    <>
      <header className="hero">
        <span className="float f1" aria-hidden="true">🥐</span>
        <span className="float f2" aria-hidden="true">🍩</span>
        <span className="float f3" aria-hidden="true">🍪</span>
        <span className="float f4" aria-hidden="true">🧁</span>

        <p className="hero-name">HaYaan's Cafe And Bakery</p>
        <h1>
          <span>Fresh sweets,</span>
          <span>baked every morning.</span>
        </h1>
        <p className="hero-sub">Have a look at what's on the counter today.</p>
        <a className="cta" href="#menu">See our sweets</a>
      </header>

      {/* <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div> */}

      <main id="menu">
        <h2 className="section-title">Today's sweets</h2>

        <nav className="tabs" aria-label="Sweet categories">
          {categories.map((c) => (
            <button key={c} className={c === active ? "tab on" : "tab"} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </nav>

        {visible.length === 0 ? (
          <p className="empty">Nothing here yet. Add sweets in src/data/sweets.js.</p>
        ) : (
          <section className="grid" key={active}>
            {visible.map((s, i) => <SweetCard key={s.id} sweet={s} index={i} />)}
          </section>
        )}
      </main>

      <section className="visit" id="contact">
        <h2 className="section-title">Come and visit us</h2>
        <div className="visit-grid">
          <div className="visit-card">
            <h3>Address</h3>
            <p>{ADDRESS}</p>
            <a className="visit-btn" href={MAPS_LINK} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
          <div className="visit-card">
            <h3>Phone</h3>
            <p>{PHONE_DISPLAY}</p>
            <a className="visit-btn" href={PHONE_LINK}>Call us</a>
          </div>
        </div>
      </section>

      <footer>
        <p>HaYaan's Cafe And Bakery, Victoria Road, Bengaluru</p>
      </footer>

      {/* Styles for the visit section, so this one file is all you need to replace */}
      <style>{`
        .visit { max-width: 1060px; margin: 0 auto; padding: 1rem 1.5rem 3.5rem; scroll-margin-top: 1rem; }
        .visit-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .visit-card {
          background: var(--blush); border: 2px solid var(--cocoa); border-radius: 1.25rem;
          padding: 1.4rem 1.5rem; box-shadow: 6px 6px 0 var(--cocoa);
          display: flex; flex-direction: column; align-items: flex-start; gap: .5rem;
        }
        .visit-card h3 { font-size: 1.4rem; }
        .visit-card p { margin: 0 0 .6rem; font-size: 1.05rem; }
        .visit-btn {
          margin-top: auto; display: inline-block; padding: .6rem 1.3rem; border-radius: 999px;
          background: var(--cocoa); color: var(--butter); font-weight: 700; text-decoration: none;
          border: 2px solid var(--cocoa); transition: transform .15s, background .2s, color .2s;
        }
        .visit-btn:hover { transform: translateY(-2px); background: var(--butter); color: var(--cocoa); }
        .visit-btn:focus-visible { outline: 3px solid var(--berry); outline-offset: 3px; }
      `}</style>
    </>
  );
}
