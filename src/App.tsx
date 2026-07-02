import { useEffect, useState } from 'react';
import { portfolio } from './portfolio';
import {
  ArrowUpRight,
  Briefcase,
  Close,
  Code,
  Device,
  Github,
  Graduation,
  MapPin,
  Menu,
  Mountain,
  Network,
  Server,
} from './icons';

const projects = [
  {
    number: '01',
    name: 'Edensmart',
    type: 'Smart-building platform',
    summary:
      'A system for controlling heating, monitoring buildings and understanding energy use. I helped build it from an early idea into a live deployment in a care home.',
    details: [
      'Built large parts of the frontend and backend',
      'Set up Linux hubs, remote access and deployment tools',
      'Moved device data securely with MQTT and WireGuard',
      'Integrated Zigbee thermostats, sensors and controls',
    ],
    tags: ['Node.js', 'PHP', 'MySQL', 'Linux', 'MQTT', 'Zigbee', 'WireGuard'],
    featured: true,
  },
  {
    number: '02',
    name: 'Edensmart Tile Editor',
    type: 'Secure web app',
    summary:
      'A Flask app for building reusable dashboard tiles without editing source code. It includes accounts, permissions, validation, audit logs and automated tests.',
    details: [],
    tags: ['Python', 'Flask', 'SQLite', 'Pytest', 'Docker', 'GitHub Actions'],
    live: portfolio.tileEditorLive,
    repo: portfolio.tileEditorRepo,
  },
  {
    number: '03',
    name: 'Edensmart Mobile App',
    type: 'Flutter app',
    summary:
      'A lightweight mobile app that made the existing Edensmart platform easier to use on phones without rebuilding the whole product from scratch.',
    details: [],
    tags: ['Flutter', 'Dart', 'WebView'],
  },
];

const skillGroups = [
  ['Web', 'JavaScript, TypeScript, Node.js, PHP, Flask, HTML and CSS'],
  ['Connected devices', 'Zigbee, Zigbee2MQTT, MQTT, Raspberry Pi and device integrations'],
  ['Servers', 'Ubuntu, Linux, systemd, WireGuard, SSH and SFTP'],
  ['Data and delivery', 'MySQL, SQLite, Git, GitHub Actions, Docker, Render and Cloudflare'],
];

const workAreas = [
  {
    icon: Code,
    title: 'Product development',
    text: 'Interfaces, APIs, automation tools, analytics and admin features across the web platform.',
  },
  {
    icon: Server,
    title: 'Linux and deployment',
    text: 'On-site hubs, system services, updates, diagnostics and secure remote support.',
  },
  {
    icon: Network,
    title: 'Data and networking',
    text: 'Reliable device data from customer buildings into the platform over MQTT and WireGuard.',
  },
  {
    icon: Device,
    title: 'Device integration',
    text: 'Zigbee thermostats, sensors and controls, including awkward manufacturer-specific data.',
  },
];

function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
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
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  const contactHref = portfolio.email
    ? `mailto:${portfolio.email}`
    : portfolio.linkedin || portfolio.github;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollTo('home')}>
          <span>BEN</span>
          <span>CLAYTON</span>
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('experience')}>Experience</button>
          <button onClick={() => scrollTo('skills')}>Skills</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <a href={contactHref} target="_blank" rel="noreferrer">
            Get in touch <ArrowUpRight />
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-intro" data-reveal>
            <div className="availability">
              <span /> Open to software and IT engineering roles in the UK
            </div>
            <h1>
              I build software that has to work
              <em> outside a demo.</em>
            </h1>
            <p>
              I&apos;m Ben, a software engineer from Hampshire. I work across web apps,
              Linux servers and connected devices, and I&apos;ve spent the last few years
              helping build a smart-building system from the ground up.
            </p>
            <div className="hero-actions">
              <button className="solid-button" onClick={() => scrollTo('work')}>
                See my work <ArrowUpRight />
              </button>
              <a className="text-link" href={portfolio.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </div>
          </div>

          <aside className="hero-board" data-reveal aria-label="Current work overview">
            <div className="board-top">
              <span>Current focus</span>
              <b>Edensmart</b>
            </div>
            <div className="board-diagram">
              <div className="diagram-node node-devices">
                <Device />
                <span>Devices</span>
                <small>Thermostats and sensors</small>
              </div>
              <div className="diagram-path path-one"><i /><span>Zigbee</span></div>
              <div className="diagram-node node-hub">
                <Server />
                <span>Building hub</span>
                <small>Linux services and buffering</small>
              </div>
              <div className="diagram-path path-two"><i /><span>MQTT + WireGuard</span></div>
              <div className="diagram-node node-platform">
                <Code />
                <span>Web platform</span>
                <small>Control, automation and reports</small>
              </div>
            </div>
            <div className="board-footer">
              <div><strong>3–4</strong><span>years on the product</span></div>
              <div><strong>36</strong><span>devices in the live site</span></div>
            </div>
          </aside>

          <div className="hero-stamp" aria-hidden="true">BUILD / TEST / FIX / SHIP</div>
        </section>

        <section className="quick-facts" aria-label="Quick facts">
          <div><MapPin /><span>Portchester, Hampshire</span></div>
          <div><Briefcase /><span>Software, infrastructure and IoT</span></div>
          <div><Graduation /><span>Final year of a Level 6 degree apprenticeship</span></div>
        </section>

        <section id="work" className="content-section work-section">
          <div className="section-title" data-reveal>
            <span>01 / Work</span>
            <h2>A few things I&apos;ve built.</h2>
            <p>Real projects, used by real people, with the awkward parts included.</p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article
                key={project.name}
                className={project.featured ? 'project project-featured' : 'project'}
                data-reveal
              >
                <div className="project-index">{project.number}</div>
                <div className="project-main">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>

                  {project.details.length > 0 && (
                    <ul>
                      {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  )}

                  <div className="tag-row">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>

                <div className="project-side">
                  {project.featured ? (
                    <div className="project-poster" aria-hidden="true">
                      <span>DEVICE</span>
                      <span>TO</span>
                      <span>DASHBOARD</span>
                      <i>↘</i>
                    </div>
                  ) : (
                    <div className="project-links">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer">
                          Live site <ArrowUpRight />
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer">
                          Source code <Github />
                        </a>
                      )}
                      {!project.live && !project.repo && <span>Internal project</span>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section experience-section">
          <div className="experience-heading" data-reveal>
            <span>02 / Experience</span>
            <h2>I joined when it was still mostly an idea.</h2>
            <p>
              Since 2022, I&apos;ve worked at Yandiya Technologies / Edensprite as part of a
              very small technical team. That meant doing much more than one narrow job.
            </p>
          </div>

          <div className="experience-layout">
            <div className="role-card" data-reveal>
              <div className="role-card-top">
                <span>2022 — present</span>
                <span>Portchester, UK</span>
              </div>
              <h3>IT Engineer</h3>
              <p>Yandiya Technologies / Edensprite</p>
              <div className="role-breakdown">
                <div><b>60%</b><span>Software development</span></div>
                <div><b>30%</b><span>Servers, networking and deployment</span></div>
                <div><b>10%</b><span>Hardware and device setup</span></div>
              </div>
            </div>

            <div className="work-area-list">
              {workAreas.map(({ icon: Icon, title, text }, index) => (
                <article key={title} data-reveal>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="content-section skills-section">
          <div className="section-title light" data-reveal>
            <span>03 / Skills</span>
            <h2>I&apos;m comfortable working across the whole system.</h2>
          </div>

          <div className="skill-grid">
            {skillGroups.map(([title, list], index) => (
              <article key={title} data-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{list}</p>
              </article>
            ))}
          </div>

          <div className="working-style" data-reveal>
            <p>
              I&apos;m at my best when I can understand the whole problem, not just one ticket.
              I like tracing issues properly, making sensible trade-offs and leaving the
              system easier to support than I found it.
            </p>
          </div>
        </section>

        <section id="about" className="content-section about-section">
          <div className="about-copy" data-reveal>
            <span>04 / About</span>
            <h2>Computers have always been the main thing. They&apos;re not the only thing.</h2>
            <p>
              I started trying to learn programming when I was eleven, after spending far
              too much time on a slow hand-me-down computer. The early attempts were bad,
              but the interest stuck.
            </p>
            <p>
              Outside work, I climb three or four times a week and spend a lot of weekends
              travelling around the UK in a converted Toyota Alphard. I usually end up near
              mountains, climbing areas or somewhere well away from a city.
            </p>
          </div>

          <div className="about-panels">
            <article className="climbing-panel" data-reveal>
              <Mountain />
              <span>Climbing</span>
              <h3>Mostly indoor bouldering, currently around V5–V6.</h3>
              <a href={portfolio.youtube} target="_blank" rel="noreferrer">
                Tom &amp; Ben Climbing <ArrowUpRight />
              </a>
              <div className="hold hold-a" /><div className="hold hold-b" /><div className="hold hold-c" />
            </article>
            <article className="travel-panel" data-reveal>
              <MapPin />
              <span>Weekends</span>
              <h3>A van, a mattress and somewhere worth walking around.</h3>
              <div className="map-line"><i /><i /><i /></div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div data-reveal>
            <span>Let&apos;s talk</span>
            <h2>Need someone who can take ownership of a messy technical problem?</h2>
            <p>
              I&apos;m looking for software or IT engineering work in the UK, ideally with a
              small team building something useful.
            </p>
            <div>
              <a className="solid-button light-button" href={contactHref} target="_blank" rel="noreferrer">
                Get in touch <ArrowUpRight />
              </a>
              <a className="text-link light-link" href={portfolio.github} target="_blank" rel="noreferrer">
                <Github /> GitHub profile
              </a>
            </div>
          </div>
          <div className="contact-mark" aria-hidden="true">BC</div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Ben Clayton</span>
        <button onClick={() => scrollTo('home')}>Back to top ↑</button>
      </footer>
    </div>
  );
}

export default App;
