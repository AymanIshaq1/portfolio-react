import { useEffect, useMemo, useState } from 'react'
import heroImage from './assets/Hero.jpeg'
import churchImage from './assets/Gemini_Generated_Image_f79n80f79n80f79n.png'
import burgerImage from './assets/Gemini_Generated_Image_ro7nrxro7nrxro7n.png'

const THEME_KEY = 'portfolio-theme'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const highlights = [
  'Frontend and backend development',
  'Clean UI with attention to user experience',
  'Focused on scalable and maintainable solutions',
]

const skillGroups = [
  {
    title: 'Frontend',
    delayClass: '',
    items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React'],
  },
  {
    title: 'Backend',
    delayClass: 'reveal-delay',
    items: ['.NET', 'C#'],
  },
  {
    title: 'Tools',
    delayClass: 'reveal-delay-2',
    items: ['Git', 'GitHub'],
  },
]

const projects = [
  {
    title: 'Church History Website',
    stack: 'React',
    image: churchImage,
    alt: 'Preview of Church History Website project',
    description:
      'A content-focused website built with React to present historical information in a structured, engaging, and accessible way.',
    liveUrl: 'https://churchhistory.netlify.app/',
    repoUrl: 'https://github.com/AymanIshaq1/Church-History',
    delayClass: '',
  },
  {
    title: 'Burger Restaurant Website',
    stack: 'HTML, CSS, JS',
    image: burgerImage,
    alt: 'Preview of Burger Restaurant Website project',
    description:
      'A modern restaurant landing page with clear calls to action, polished layout, and interactive sections built using core web technologies.',
    liveUrl: 'https://s2zv2j.csb.app/',
    repoUrl: 'https://github.com/AymanIshaq1',
    delayClass: 'reveal-delay',
  },
]

function useTheme() {
  const getInitialTheme = () => {
    const savedTheme = window.localStorage.getItem(THEME_KEY)
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const isLight = theme === 'light'
    document.body.classList.toggle('light-theme', isLight)
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light')),
  }
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

function Header({ isMenuOpen, onToggleMenu, onCloseMenu, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container nav-wrapper">
        <a className="brand" href="#home">
          Ayman Ishak
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          aria-label="Toggle navigation"
          onClick={onToggleMenu}
        >
          <span />
          <span />
        </button>

        <nav
          className={`site-nav ${isMenuOpen ? 'is-open' : ''}`.trim()}
          id="site-nav"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={onCloseMenu}>
              {item.label}
            </a>
          ))}
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle dark and light theme"
            onClick={onToggleTheme}
          >
            <span className="theme-toggle__icon">{theme === 'light' ? '☀' : '🌙'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <img
            className="hero-avatar"
            src={heroImage}
            alt="Portrait photo"
            loading="eager"
            decoding="async"
          />
          <p className="eyebrow">Full Stack Developer</p>
          <h1>Ayman Ishak</h1>
          <p className="hero-text">
            I build polished, responsive web experiences with modern frontend interfaces and
            reliable backend solutions.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact Me
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Quick highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-card reveal reveal-delay">
          <div className="profile-card">
            <div className="profile-card__glow" />
            <p className="profile-card__label">Current Focus</p>
            <h2>Modern Web Applications</h2>
            <p>
              Computer Science student at Ain Shams University with a passion for crafting efficient
              digital products.
            </p>
            <div className="profile-stats">
              <div>
                <strong>Frontend</strong>
                <span>React, JavaScript, Bootstrap</span>
              </div>
              <div>
                <strong>Backend</strong>
                <span>.NET, C#, APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">About Me</p>
          <h2>Designing and developing complete digital experiences</h2>
        </div>
        <div className="about-grid">
          <article className="about-card reveal">
            <p>
              I am Ayman Ishak , a Computer Science student and an aspiring Full Stack Developer. I
              enjoy turning ideas into practical web products through thoughtful interfaces, clean
              code, and solid backend architecture.
            </p>
          </article>
          <article className="about-card reveal reveal-delay">
            <h3>Skills Summary</h3>
            <p>
              I work across both frontend and backend development, creating responsive user
              interfaces, interactive experiences, and dependable server-side solutions.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Skills</p>
          <h2>Technologies I use to build modern products</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className={`skill-card reveal ${group.delayClass}`.trim()}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Projects</p>
          <h2>Selected work that reflects my development approach</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`project-card reveal ${project.delayClass}`.trim()}
            >
              <img src={project.image} alt={project.alt} />
              <div className="project-card__content">
                <div className="project-card__header">
                  <h3>{project.title}</h3>
                  <span>{project.stack}</span>
                </div>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <div className="section-heading section-heading--left">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something meaningful together</h2>
          </div>

          <div className="contact-links">
            <a href="mailto:aymaneshaaq@example.com">aymaneshaaq.dev@example.com</a>
            <a href="https://github.com/AymanIshaq1" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/example" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <form className="contact-form reveal reveal-delay" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="Your email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="Tell me about your project" />
          </label>
          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>&copy; {year} Ayman Ishak. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/AymanIshaq1" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/example" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:aymaneshaaq.dev@example.com">Email</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useReveal()

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenuOnResize)
    return () => window.removeEventListener('resize', closeMenuOnResize)
  }, [])

  return (
    <div className="page-shell">
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onCloseMenu={() => setIsMenuOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
