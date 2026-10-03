import { useMemo, useState, useEffect } from "react";
import { PROJECTS } from "./projects.js";

const SERVICES = [
  {
    title: ["Sites internet", "& logiciels"],
    text: "Sites vitrines, boutiques en ligne et outils sur mesure, rapides et pensés pour convertir.",
  },
  {
    title: ["Design", "& Vidéos"],
    text: "Identité visuelle, visuels réseaux sociaux, montage et motion pour une image qui marque.",
  },
  {
    title: ["Produits", "digitaux"],
    text: "Ebooks, templates, formations et ressources prêtes à l'emploi pour vendre et apprendre en ligne.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si on a défilé de plus de 20 pixels, on active le fond
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="mono">Mondez Studio</a>
      <nav className="mono nav">
        <a href="#top">Accueil</a> / <a href="#services">Services</a> / <a href="#works">Portfolio</a> /{" "}
        <a href="#contact">Contact</a>
      </nav>
      <a href="#contact" className="btn mono">Contact ↗</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="section hero" id="top">
      <div>
        <h1 className="title">
          Mondez<sup>©</sup>
        </h1>
        <div className="intro">
          <span className="mono">A Propos</span>
          <p>
            Ingénieur & Designer,
            je crée des produits digitaux, des visuels, des vidéos, des sites internet et des logiciels
            qui donnent vie à votre marque et à vos idées.
          </p>
        </div>
      </div>
      <div className="portrait">
        <div className="portrait-year">/26</div>
        <div className="frame mono">Eudes Mondez</div>
      </div>
      <a href="#services" className="scroll">Glissez vers le bas</a>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="sec-h mono"><span>[Services]</span><span>({pad(SERVICES.length)})</span></div>
      {SERVICES.map((s, i) => (
        <a className="row" href="#contact" key={s.title.join("")}>
          <span className="mono">{pad(i + 1)}</span>
          <h2>{s.title[0]}<br />{s.title[1]}</h2>
          <div><p>{s.text}</p></div>
        </a>
      ))}
    </section>
  );
}

function Card({ project, index }) {
  const bg = project.img ? `url(${project.img})` : `linear-gradient(135deg, ${project.c})`;
  const content = (
    <>
      <div className="cover">
        <div className="cover-img mono" style={{ backgroundImage: bg }}>
          {project.img ? "" : "Image du projet"}
        </div>
      </div>
      <div className="meta">
        <h3>{project.title}</h3>
        <span className="mono">{pad(index + 1)} / {project.cat} / {project.year}</span>
      </div>
    </>
  );
  return project.link ? (
    <a className="card" href={project.link} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="card">{content}</div>
  );
}

function Works() {
  const cats = useMemo(() => ["Tous", ...new Set(PROJECTS.map((p) => p.cat))], []);
  const [current, setCurrent] = useState("Tous");
  const list = PROJECTS.filter((p) => current === "Tous" || p.cat === current);

  return (
    <section className="section works" id="works">
      <div className="sec-h mono"><span>[Portfolio]</span><span>({pad(list.length)})</span></div>
      <div className="filters mono">
        {cats.map((c) => (
          <button key={c} className={c === current ? "on" : ""} onClick={() => setCurrent(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {list.map((p, i) => <Card key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="mono">[Contact]</div>
      <a className="big" href="mailto:eudesmondez@gmail.com">Parlons de<br />ton projet ↗</a>
      <footer className="footer mono">
        <span>© 2026 Mondez Studio</span>
        <span>WhatsApp · Instagram · TikTok</span>
      </footer>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Works />
        <Contact />
      </main>
    </>
  );
}