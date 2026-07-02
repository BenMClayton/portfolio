import { useState } from 'react';
import { portfolio } from './portfolio';
import { ArrowUpRight, Close, Github, Menu } from './icons';

const projects = [
  {
    name: 'Edensmart',
    type: 'Smart-building platform',
    summary:
      'A platform used to control heating, monitor buildings and review energy use. I worked across the web application, on-site Linux hubs, networking and Zigbee device integrations.',
    highlights: [
      'Built and maintained frontend and backend features',
      'Configured Linux hubs, services and remote support tools',
      'Moved device data securely using MQTT and WireGuard',
      'Integrated thermostats, sensors and other Zigbee devices',
    ],
    tags: ['Node.js', 'PHP', 'MySQL', 'Linux', 'MQTT', 'Zigbee', 'WireGuard'],
  },
  {
    name: 'Edensmart Tile Editor',
    type: 'Flask web application',
    summary:
      'A browser-based tool for creating reusable dashboard tiles without editing source code. It includes authentication, permissions, validation, audit logs and automated tests.',
    tags: ['Python', 'Flask', 'SQLite', 'Pytest', 'Docker', 'GitHub Actions'],
    live: portfolio.tileEditorLive,
    repo: portfolio.tileEditorRepo,
  },
  {
    name: 'Edensmart Mobile App',
    type: 'Flutter application',
    summary:
      'A mobile application that makes the existing Edensmart platform easier to use on phones without replacing the underlying web system.',
    tags: ['Flutter', 'Dart', 'WebView'],
  },
];

const responsibilities = [
  'Built and maintained web interfaces, APIs, automation tools and admin features.',
  'Set up Raspberry Pi and Linux hubs, including systemd services, updates and diagnostics.',
  'Supported secure communication between buildings and the platform using MQTT and WireGuard.',
  'Integrated Zigbee thermostats, sensors and controls, including manufacturer-specific device data.',
  'Investigated faults across software, networking and hardware rather than treating them as separate problems.',
];

const skillGroups = [
  {
    title: 'Web development',
    items: ['JavaScript', 'TypeScript', 'Node.js', 'PHP', 'Python', 'Flask', 'HTML', 'CSS'],
  },
  {
    title: 'Systems and deployment',
    items: ['Linux', 'Ubuntu', 'systemd', 'WireGuard', 'SSH', 'SFTP', 'Render', 'Cloudflare'],
  },
  {
    title: 'Connected devices',
    items: ['Zigbee', 'Zigbee2MQTT', 'MQTT', 'Raspberry Pi', 'Device integrations'],
  },
  {
    title: 'Data and tooling',
    items: ['MySQL', 'SQLite', 'Git', 'GitHub Actions', 'Docker', 'Pytest'],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const contactHref = portfolio.email
    ? `mailto:${portfolio.email}`
    : portfolio.linkedin || portfolio.github;
  const contactLabel = portfolio.email ? 'Email me' : 'View my GitHub';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="wordmark" onClick={() => scrollTo('home')}>
            Ben Clayton
          </button>

          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <button onClick={() => scrollTo('work')}>Projects</button>
            <button onClick={() => scrollTo('experience')}>Experience</button>
            <button onClick={() => scrollTo('skills')}>Skills</button>
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer</p>
            <h1>Web applications, Linux systems and connected devices.</h1>
            <p className="hero-summary">
              I&apos;m Ben Clayton, based in Portchester, Hampshire. For the past few years
              I&apos;ve helped build and support a smart-building platform, working across
              its software, on-site hubs and device integrations.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo('work')}>
                View projects
              </button>
              <a className="secondary-link" href={portfolio.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </div>
          </div>

          <aside className="hero-details" aria-label="Profile summary">
            <dl>
              <div>
                <dt>Location</dt>
                <dd>Portchester, Hampshire</dd>
              </div>
              <div>
                <dt>Current role</dt>
                <dd>IT Engineer</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>Final-year Level 6 degree apprentice</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Open to software and IT engineering roles in the UK</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section id="work" className="section-wrap content-section">
          <div className="section-heading">
            <p className="eyebrow">Selected projects</p>
            <h2>Work I&apos;ve contributed to</h2>
            <p>
              A selection of projects covering web development, infrastructure and connected devices.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.name}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-content">
                  <div className="project-header">
                    <div>
                      <p className="project-type">{project.type}</p>
                      <h3>{project.name}</h3>
                    </div>
                    {(project.live || project.repo) && (
                      <div className="project-links">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noreferrer">
                            Live site <ArrowUpRight />
                          </a>
                        )}
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noreferrer">
                            Source <Github />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="project-summary">{project.summary}</p>

                  {project.highlights && (
                    <ul className="project-highlights">
                      {project.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}

                  <div className="tag-list" aria-label={`${project.name} technologies`}>
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-band">
          <div className="section-wrap experience-layout">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Experience</p>
              <h2>Yandiya Technologies / Edensprite</h2>
              <p className="role-meta">IT Engineer · 2022 to present</p>
              <p>
                I joined a small technical team while Edensmart was still at an early stage.
                My role has covered software development, deployment, networking and device setup.
              </p>
            </div>

            <div className="responsibility-list">
              {responsibilities.map((item) => (
                <div key={item} className="responsibility-item">
                  <span aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-wrap content-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools and technologies</h2>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-band about-band">
          <div className="section-wrap about-layout">
            <div className="section-heading compact-heading">
              <p className="eyebrow">About</p>
              <h2>A little more about me</h2>
            </div>
            <div className="about-copy">
              <p>
                I started learning programming when I was eleven and have continued building
                software through personal projects, work and my degree apprenticeship.
              </p>
              <p>
                Outside work, I climb several times a week and travel around the UK in a converted
                Toyota Alphard, usually for climbing or walking trips.
              </p>
              <a href={portfolio.youtube} target="_blank" rel="noreferrer">
                Tom &amp; Ben Climbing <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Open to software and IT engineering roles in the UK.</h2>
            <p>
              You can view more of my work on GitHub or contact me through the profiles linked there.
            </p>
          </div>
          <a className="primary-button contact-button" href={contactHref} target="_blank" rel="noreferrer">
            {contactLabel} <ArrowUpRight />
          </a>
        </section>
      </main>

      <footer>
        <div className="section-wrap footer-inner">
          <span>© {new Date().getFullYear()} Ben Clayton</span>
          <button onClick={() => scrollTo('home')}>Back to top</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
