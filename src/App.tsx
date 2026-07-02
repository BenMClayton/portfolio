import { useEffect, useMemo, useRef, useState } from 'react';
import { portfolio } from './portfolio';
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Close,
  Code,
  Device,
  Github,
  Graduation,
  MapPin,
  Menu,
  Moon,
  Mountain,
  Network,
  Server,
  Sun,
} from './icons';

type Theme = 'dark' | 'light';

const skills = [
  ['Languages', 'JavaScript, TypeScript, PHP, Python, SQL, HTML, CSS'],
  ['Runtime & web', 'Node.js, Flask, REST APIs, server-rendered applications'],
  ['IoT', 'Zigbee, Zigbee2MQTT, MQTT, Raspberry Pi, device integrations'],
  ['Systems', 'Ubuntu Server, Linux, systemd, WireGuard, SSH, SFTP'],
  ['Data & delivery', 'MySQL, SQLite, Git, GitHub Actions, Docker, Render, Cloudflare'],
];

const principles = [
  {
    icon: Code,
    title: 'Work through the hard part',
    text: 'I tend to stay with difficult technical problems until I understand the failure properly and can build a reliable fix.',
  },
  {
    icon: Network,
    title: 'Own the whole path',
    text: 'My experience spans device data, local Linux services, networking, middleware, databases and the web interface that users actually see.',
  },
  {
    icon: Briefcase,
    title: 'Build for a real outcome',
    text: 'Technical decisions matter most when they help a product reach users, reduce friction or improve somebody’s day-to-day life.',
  },
];

function useReveal() {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function usePointerGlow() {
  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLElement>(null);

  useReveal();
  usePointerGlow();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -60%', threshold: [0.01, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const value = Math.min(window.scrollY / 900, 1);
      heroRef.current?.style.setProperty('--hero-shift', `${value * 54}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const contactHref = portfolio.email
    ? `mailto:${portfolio.email}`
    : portfolio.linkedin || portfolio.github;

  const nav = useMemo(
    () => [
      ['home', 'Overview'],
      ['experience', 'Experience'],
      ['work', 'Selected work'],
      ['skills', 'Skills'],
      ['about', 'About'],
    ],
    [],
  );

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="pointer-glow" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')} aria-label="Go to top">
          <span className="brand-mark">BC</span>
          <span className="brand-text">Ben Clayton</span>
        </button>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {nav.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? 'active' : ''}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
          <a className="nav-contact" href={contactHref} target="_blank" rel="noreferrer">
            Contact <ArrowUpRight />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero" ref={heroRef}>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />

          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {portfolio.availability}
            </div>
            <h1>
              Full-stack software.
              <span>Connected systems.</span>
              Real-world ownership.
            </h1>
            <p className="hero-summary">{portfolio.summary}</p>
            <div className="hero-actions">
              <button className="button primary magnetic" onClick={() => navigate('work')}>
                View selected work <ArrowUpRight />
              </button>
              <a className="button secondary magnetic" href={contactHref} target="_blank" rel="noreferrer">
                Contact
              </a>
            </div>
            <div className="hero-meta">
              <span><MapPin /> {portfolio.location}</span>
              <span><Activity /> Mid-level</span>
              <span><Github /> BenMClayton</span>
            </div>
          </div>

          <div className="hero-console" aria-label="Professional overview">
            <div className="console-topline">
              <div className="console-dots"><i /><i /><i /></div>
              <span>profile.system</span>
              <span>online</span>
            </div>
            <div className="console-body">
              <div className="console-heading">
                <div className="monogram">BC</div>
                <div>
                  <strong>{portfolio.name}</strong>
                  <span>{portfolio.title}</span>
                </div>
              </div>
              <div className="console-rule" />
              <div className="console-row"><span>primary_focus</span><b>software + IoT</b></div>
              <div className="console-row"><span>system_scope</span><b>device → dashboard</b></div>
              <div className="console-row"><span>operating_mode</span><b>independent ownership</b></div>
              <div className="console-row"><span>current_location</span><b>Hampshire, UK</b></div>
              <div className="console-signal">
                {[72, 42, 88, 56, 92, 64, 78, 48, 82, 59, 90, 68].map((height, index) => (
                  <i key={index} style={{ height: `${height}%`, animationDelay: `${index * -0.09}s` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true"><span /> Scroll to inspect</div>
        </section>

        <section className="metrics-band" aria-label="Experience highlights">
          <div data-reveal><strong>3–4 years</strong><span>building Edensmart from an initial idea</span></div>
          <div data-reveal><strong>36 devices</strong><span>in the current live care-home deployment</span></div>
          <div data-reveal><strong>~1,700</strong><span>device messages processed per day at its current scale</span></div>
          <div data-reveal><strong>End to end</strong><span>frontend, backend, networking, hubs and deployment</span></div>
        </section>

        <section id="experience" className="section section-split">
          <div className="section-heading" data-reveal>
            <span className="section-index">01</span>
            <div>
              <p className="kicker">Experience</p>
              <h2>A broad role inside a small technical team.</h2>
            </div>
          </div>

          <div className="experience-layout">
            <aside className="experience-summary" data-reveal>
              <div className="sticky-card">
                <span className="date">Mid 2022 — present</span>
                <h3>IT Engineer</h3>
                <p>Yandiya Technologies / Edensprite</p>
                <div className="role-mix">
                  <div><span style={{ width: '60%' }} /><b>60%</b><small>Software development</small></div>
                  <div><span style={{ width: '30%' }} /><b>30%</b><small>Linux, networking & deployment</small></div>
                  <div><span style={{ width: '10%' }} /><b>10%</b><small>Hardware & device configuration</small></div>
                </div>
              </div>
            </aside>

            <div className="experience-content">
              <article className="narrative-card" data-reveal>
                <p className="large-copy">
                  I joined while Edensmart was still an idea. Working with one other developer and direction from the IT Director, I helped turn it into a live smart-building platform used in a care home.
                </p>
                <p>
                  My work has covered most of the frontend and backend, the Linux hub environment, WireGuard networking, device communication, update deployment, data handling and the diagnostic tools needed to operate the system remotely.
                </p>
              </article>

              <div className="responsibility-grid">
                {[
                  [Server, 'Infrastructure', 'Designed the Ubuntu-based hub environment, systemd services, secure remote connectivity and update process.'],
                  [Network, 'Data path', 'Moved MQTT device data from customer buildings through encrypted tunnels into middleware and the web platform.'],
                  [Code, 'Product software', 'Built dashboard, API, automation, analytics and administrative features across Node.js, PHP and JavaScript.'],
                  [Device, 'Device integration', 'Integrated Zigbee devices and handled inconsistent manufacturer attributes through a normalisation layer.'],
                ].map(([Icon, title, text]) => {
                  const Component = Icon as typeof Server;
                  return (
                    <article className="responsibility" data-reveal key={title as string}>
                      <Component />
                      <h3>{title as string}</h3>
                      <p>{text as string}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-heading" data-reveal>
            <span className="section-index">02</span>
            <div>
              <p className="kicker">Selected work</p>
              <h2>Projects that show technical range and ownership.</h2>
            </div>
          </div>

          <article className="featured-project" data-reveal>
            <div className="featured-copy">
              <div className="project-label"><span>Primary case study</span><b>Edensmart</b></div>
              <h3>Smart-building control and energy management, built from the ground up.</h3>
              <p>
                Edensmart connects heating, thermostats, environmental sensors and other building devices to a central web platform. It supports remote control, automation, energy analytics and fine-grained permissions across buildings of very different sizes.
              </p>
              <ul className="project-points">
                <li>Secure device data transport over WireGuard and MQTT</li>
                <li>Offline buffering when a building temporarily loses connectivity</li>
                <li>Fine-grained access from individual rooms to multi-site ownership</li>
                <li>Heating automation, tariff-aware analytics and downloadable reporting</li>
                <li>Remote hub diagnostics and service monitoring</li>
              </ul>
              <div className="tag-list">
                {['Node.js', 'PHP', 'MySQL', 'Ubuntu', 'MQTT', 'Zigbee', 'WireGuard'].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="architecture-card" aria-label="Simplified Edensmart architecture">
              <div className="architecture-title"><span>Simplified system path</span><b>Production architecture</b></div>
              <div className="architecture-diagram">
                <div className="arch-column">
                  <div className="arch-node"><Device /><span>Building devices</span><small>Zigbee sensors & controls</small></div>
                  <div className="arch-node"><Server /><span>Local Linux hub</span><small>Services, buffering, diagnostics</small></div>
                </div>
                <div className="arch-flow"><span>MQTT</span><i /><span>WireGuard</span></div>
                <div className="arch-column">
                  <div className="arch-node"><Network /><span>Middleware</span><small>Normalisation & routing</small></div>
                  <div className="arch-node"><Code /><span>Web platform</span><small>Control, analytics, permissions</small></div>
                </div>
              </div>
              <div className="architecture-stats">
                <div><span>36</span><small>devices live</small></div>
                <div><span>3</span><small>rooms live</small></div>
                <div><span>100s</span><small>planned devices</small></div>
              </div>
            </div>
          </article>

          <div className="project-grid">
            <article className="project-card project-card-blue" data-reveal>
              <div className="project-number">02</div>
              <div>
                <p className="kicker">Secure web application</p>
                <h3>Edensmart Tile Editor</h3>
                <p>
                  A Flask application for designing reusable device-dashboard tiles without editing source code. It includes role-based access, server-side validation, standard entity mappings, audit logs and a repeatable CI/deployment path.
                </p>
                <div className="tag-list">
                  {['Python 3.13', 'Flask', 'SQLite', 'Pytest', 'Docker', 'GitHub Actions'].map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="project-links">
                <a href={portfolio.tileEditorLive} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a>
                <a href={portfolio.tileEditorRepo} target="_blank" rel="noreferrer">Source <Github /></a>
              </div>
            </article>

            <article className="project-card" data-reveal>
              <div className="project-number">03</div>
              <div>
                <p className="kicker">Mobile delivery</p>
                <h3>Edensmart Flutter App</h3>
                <p>
                  A lightweight Flutter shell that brought the existing Edensmart platform to mobile devices through an app-focused WebView experience.
                </p>
                <div className="tag-list">
                  {['Flutter', 'Dart', 'WebView', 'Mobile'].map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="project-status">Internal project</div>
            </article>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading" data-reveal>
            <span className="section-index">03</span>
            <div>
              <p className="kicker">Technical range</p>
              <h2>Comfortable below and above the application layer.</h2>
            </div>
          </div>

          <div className="skills-layout">
            <div className="skills-list">
              {skills.map(([title, list], index) => (
                <div className="skill-row" data-reveal key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{list}</p>
                </div>
              ))}
            </div>
            <div className="principles-panel" data-reveal>
              <p className="kicker">How I work</p>
              {principles.map(({ icon: Icon, title, text }) => (
                <div className="principle" key={title}>
                  <Icon />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section education-section">
          <div className="section-heading" data-reveal>
            <span className="section-index">04</span>
            <div>
              <p className="kicker">Education</p>
              <h2>Formal study applied alongside production work.</h2>
            </div>
          </div>
          <div className="timeline">
            <article data-reveal>
              <div className="timeline-icon"><Graduation /></div>
              <div><span>In progress</span><h3>BSc (Hons) Digital & Technology Solutions</h3><p>Software Engineer pathway · University of Roehampton · delivered through QA</p></div>
            </article>
            <article data-reveal>
              <div className="timeline-icon"><Code /></div>
              <div><span>Level 4</span><h3>Software Engineer Apprenticeship</h3><p>QA</p></div>
            </article>
            <article data-reveal>
              <div className="timeline-icon"><Graduation /></div>
              <div><span>2020 — 2022</span><h3>T Level Digital Development & Design — Merit</h3><p>Fareham College</p></div>
            </article>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-intro" data-reveal>
            <span className="section-index">05</span>
            <p className="kicker">Outside the codebase</p>
            <h2>I have been obsessed with computers since childhood, but I do not spend every hour behind one.</h2>
          </div>

          <div className="about-grid">
            <article className="about-story" data-reveal>
              <p>
                My first computer was a very slow hand-me-down from my grandad. I played games through ridiculous lag, watched people build things inside games, and started trying to learn programming at eleven. The early attempts went nowhere, but the interest never left.
              </p>
              <p>
                Today, I want to use technology to improve people’s quality of life—whether that comes through healthcare, accessibility, sustainability or simply software that removes unnecessary difficulty.
              </p>
            </article>

            <article className="interest-card climbing-card" data-reveal>
              <div className="interest-icon"><Mountain /></div>
              <p className="kicker">Indoor bouldering</p>
              <h3>Physical problem-solving, three or four times a week.</h3>
              <p>I was drawn to climbing because it combines movement, analysis and visible progression. I am currently working towards V5–V6.</p>
              <a href={portfolio.youtube} target="_blank" rel="noreferrer">Tom & Ben Climbing <ArrowUpRight /></a>
              <div className="climb-holds" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </article>

            <article className="interest-card travel-card" data-reveal>
              <div className="interest-icon"><MapPin /></div>
              <p className="kicker">Low-cost adventures</p>
              <h3>A Toyota Alphard, a mattress and somewhere rural.</h3>
              <p>Campervan trips usually involve mountains, long walks, climbing areas, abandoned tunnels and places away from cities.</p>
              <div className="route-line" aria-hidden="true"><i /><i /><i /><span /></div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orbit" aria-hidden="true" />
          <div className="contact-copy" data-reveal>
            <p className="kicker">Contact</p>
            <h2>Looking for difficult, useful work with a team that cares about the outcome.</h2>
            <p>
              I am interested in UK-based mid-level software engineering and IT engineering roles, particularly in smaller teams where people have ownership and the company’s mission matters.
            </p>
            <div className="contact-actions">
              <a className="button primary" href={contactHref} target="_blank" rel="noreferrer">Contact <ArrowUpRight /></a>
              <a className="button secondary" href={portfolio.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Ben Clayton</span>
        <span>Designed and built for clarity, motion and maintainability.</span>
        <button onClick={() => navigate('home')}>Back to top ↑</button>
      </footer>
    </div>
  );
}

export default App;
