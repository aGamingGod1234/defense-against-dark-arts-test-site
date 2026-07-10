import { createFileRoute } from '@tanstack/react-router'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'

export const Route = createFileRoute('/')({ component: LesMoinesPage })

type Pastry = {
  name: string
  french: string
  note: string
  image: string
}

type CraftStage = {
  name: string
  duration: string
  title: string
  copy: string
  turn: string
}

const pastries: Pastry[] = [
  {
    name: 'Croissant',
    french: 'Pur beurre',
    note: 'Crackling shell, open honeycomb, quiet cultured-butter finish.',
    image: '/assets/pastry-croissant.png',
  },
  {
    name: 'Pain au chocolat',
    french: 'Deux bâtons',
    note: 'Dark chocolate tucked into a crisp, deeply laminated fold.',
    image: '/assets/pastry-chocolat.png',
  },
  {
    name: 'Chausson aux pommes',
    french: 'Pomme rôtie',
    note: 'Caramelized apple, fine pastry and a clean line of spice.',
    image: '/assets/pastry-chausson.png',
  },
  {
    name: 'Brioche',
    french: 'Tête légère',
    note: 'Feather-soft crumb with a glazed crown and restrained sweetness.',
    image: '/assets/pastry-brioche.png',
  },
  {
    name: 'Tarte citron',
    french: 'Citron vif',
    note: 'Bright citrus cream in a crisp shell with a porcelain finish.',
    image: '/assets/pastry-tarte.png',
  },
]

const craftStages: CraftStage[] = [
  {
    name: 'Repos',
    duration: '12 hours',
    title: 'The dough learns patience.',
    copy: 'Cold rest builds structure before butter enters the fold.',
    turn: '0deg',
  },
  {
    name: 'Tourage',
    duration: '3 folds',
    title: 'Layers become architecture.',
    copy: 'Measured turns create the fine sheets that lift in the oven.',
    turn: '118deg',
  },
  {
    name: 'Cuisson',
    duration: '19 minutes',
    title: 'Heat releases the morning.',
    copy: 'Steam opens every layer while the surface turns crisp and glossy.',
    turn: '236deg',
  },
]

const faqItems = [
  {
    question: 'Is Les Moines a real bakery?',
    answer: 'No. Les Moines is a fictional test brand built to demonstrate premium interaction, art direction and responsive frontend craft.',
  },
  {
    question: 'Can I place a real order?',
    answer: 'No payment or order is created. The morning box is a local interface demo and sends no personal data.',
  },
  {
    question: 'Are the address and hours real?',
    answer: 'No. The Paris address and opening hours are part of the fictional concept and are clearly presented as demo details.',
  },
]

function LesMoinesPage() {
  return (
    <main className="les-moines-page" id="top">
      <ReadingProgress />
      <HeroSection />
      <MorningCounter />
      <CraftChapter />
      <AtelierChapter />
      <MorningBox />
      <VisitSection />
    </main>
  )
}

function ReadingProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.18,
  })

  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: reduce ? 1 : progress }}
      aria-hidden="true"
    />
  )
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 36])

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = event.clientX - rect.left
    const py = event.clientY - rect.top
    const nx = (px / rect.width - 0.5) * 2
    const ny = (py / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--hero-x', `${px}px`)
    event.currentTarget.style.setProperty('--hero-y', `${py}px`)
    event.currentTarget.style.setProperty('--image-x', `${(nx * 18).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--image-y', `${(ny * 12).toFixed(2)}px`)
  }

  function resetPointer(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--hero-x', '68%')
    event.currentTarget.style.setProperty('--hero-y', '42%')
    event.currentTarget.style.setProperty('--image-x', '0px')
    event.currentTarget.style.setProperty('--image-y', '0px')
  }

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="hero-title"
    >
      <a className="skip-link" href="#counter">Skip to the morning bake</a>
      <motion.img
        className="hero-image"
        src="/assets/hero-croissant.png"
        alt="Laminated croissant on a cobalt stone counter"
        style={{ scale: reduce ? 1.02 : imageScale, y: reduce ? 0 : imageY }}
      />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-cursor-light" aria-hidden="true" />

      <nav className="floating-nav" aria-label="Primary navigation">
        <a className="nav-monogram" href="#top" aria-label="Les Moines home">
          <img src="/assets/les-moines-monogram.png" alt="" />
          <span>Les Moines</span>
        </a>
        <div className="nav-links">
          <a href="#counter">La fournée</a>
          <a href="#craft">Le geste</a>
          <a href="#box">La boîte</a>
        </div>
        <a className="nav-visit" href="#visit">Visiter</a>
      </nav>

      <div className="hero-wordmark" aria-hidden="true">Les Moines</div>
      <motion.div
        className="hero-copy"
        initial={reduce ? false : { y: 28, scale: 0.99 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 id="hero-title">Le matin, parfaitement feuilleté.</h1>
        <p>Viennoiserie of measured folds, cultured butter and patient hands.</p>
        <div className="hero-actions">
          <a className="hero-cta" href="#counter">
            Voir la fournée <span aria-hidden="true">↘</span>
          </a>
          <a className="hero-text-link" href="#craft">Découvrir le geste</a>
        </div>
      </motion.div>
      <p className="concept-note">Fictional bakery concept</p>
    </section>
  )
}

function MorningCounter() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion()

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    setActiveIndex((current) => (current + direction + pastries.length) % pastries.length)
  }

  return (
    <section className="counter-section" id="counter" aria-labelledby="counter-title">
      <header className="counter-heading">
        <p>La fournée du matin</p>
        <h2 id="counter-title">Five forms.<br />One precise ritual.</h2>
        <span>Hover, focus or use arrow keys to open each pastry.</span>
      </header>

      <div
        className="pastry-accordion"
        role="group"
        aria-label="Morning pastry selection"
        onKeyDown={handleKeys}
      >
        {pastries.map((pastry, index) => {
          const isActive = index === activeIndex
          return (
            <motion.button
              type="button"
              className={`pastry-slice ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              animate={{ flexGrow: isActive ? 3.5 : 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              key={pastry.name}
            >
              <span
                className="pastry-slice-image"
                style={{ backgroundImage: `url(${pastry.image})` }}
                aria-hidden="true"
              />
              <span className="slice-index">0{index + 1}</span>
              <span className="slice-label">{pastry.name}</span>
              <span className="slice-open-cue" aria-hidden="true">{isActive ? 'Close' : 'Open'}</span>
              <span className="slice-details">
                <em>{pastry.french}</em>
                <strong>{pastry.name}</strong>
                <span>{pastry.note}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}

function CraftChapter() {
  const [stageIndex, setStageIndex] = useState(0)
  const stage = craftStages[stageIndex]
  const reduce = useReducedMotion()

  return (
    <section
      className="craft-section"
      id="craft"
      aria-labelledby="craft-title"
      style={{ '--dial-turn': stage.turn } as CSSProperties}
    >
      <div className="craft-copy">
        <h2 id="craft-title">Le temps fait le goût.</h2>
        <p>Three measured passages turn flour and butter into a precise morning texture.</p>
        <div className="craft-tabs" role="group" aria-label="Craft stages">
          {craftStages.map((item, index) => (
            <button
              type="button"
              className={index === stageIndex ? 'is-active' : ''}
              aria-pressed={index === stageIndex}
              onClick={() => setStageIndex(index)}
              key={item.name}
            >
              <span>{item.name}</span>
              <small>{item.duration}</small>
            </button>
          ))}
        </div>
        <label className="craft-range-label" htmlFor="craft-stage">Move through the process</label>
        <input
          id="craft-stage"
          className="craft-range"
          type="range"
          min="0"
          max="2"
          step="1"
          value={stageIndex}
          aria-valuetext={stage.name}
          onChange={(event) => setStageIndex(Number(event.currentTarget.value))}
        />
      </div>

      <div className="craft-dial-panel">
        <motion.div
          className="craft-dial"
          animate={{ rotate: reduce ? 0 : Number.parseInt(stage.turn, 10) }}
          transition={reduce ? { duration: 0 } : { duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <span className="dial-marker" />
          <span className="dial-ring dial-ring-one" />
          <span className="dial-ring dial-ring-two" />
          <span className="dial-center">LM</span>
        </motion.div>
        <div className="craft-result" aria-live="polite">
          <span>{stage.name}</span>
          <strong>{stage.title}</strong>
          <p>{stage.copy}</p>
        </div>
        <div className="lamination-window" aria-hidden="true">
          <img src="/assets/pastry-collection.png" alt="" />
          <span className="layer-line layer-one" />
          <span className="layer-line layer-two" />
          <span className="layer-line layer-three" />
        </div>
      </div>
    </section>
  )
}

function AtelierChapter() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [-18, 22])
  const noteY = useTransform(scrollYProgress, [0, 1], [22, -16])

  return (
    <section ref={sectionRef} className="atelier-section" aria-labelledby="atelier-title">
      <motion.img
        className="atelier-image"
        src="/assets/atelier-fold.png"
        alt="Baker folding laminated dough on a cobalt workbench"
        style={{ y: reduce ? 0 : imageY }}
      />
      <div className="atelier-overlay" aria-hidden="true" />
      <motion.aside className="atelier-side-note" style={{ y: reduce ? 0 : noteY }}>
        <span>Flour</span>
        <span>Butter</span>
        <span>Patience</span>
      </motion.aside>
      <div className="atelier-copy">
        <p>Dans l'atelier</p>
        <h2 id="atelier-title">Le geste,<br />chaque matin.</h2>
        <span>Cold dough, steady hands and the same fold repeated until the layers are exact.</span>
      </div>
      <div className="flour-points" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>
    </section>
  )
}

function MorningBox() {
  const [quantities, setQuantities] = useState([1, 1, 0, 0, 0])
  const [submitted, setSubmitted] = useState(false)
  const total = useMemo(() => quantities.reduce((sum, value) => sum + value, 0), [quantities])

  function changeQuantity(index: number, delta: number) {
    setSubmitted(false)
    setQuantities((current) => current.map((value, itemIndex) => {
      if (itemIndex !== index) return value
      return Math.max(0, Math.min(6, value + delta))
    }))
  }

  function submitBox(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="box-section" id="box" aria-labelledby="box-title">
      <div className="box-visual" aria-hidden="true">
        <div className="box-lid">
          <span>Les Moines</span>
          <small>Boulangerie conceptuelle</small>
        </div>
        <div className="box-base">
          <img src="/assets/pastry-collection.png" alt="" />
          <span className="box-count">{total} pièces</span>
        </div>
      </div>

      <form className="box-builder" onSubmit={submitBox}>
        <header>
          <h2 id="box-title">Boîte du matin</h2>
          <span>Choose up to six pieces. This demo does not create an order.</span>
        </header>
        <div className="quantity-list">
          {pastries.map((pastry, index) => (
            <div className="quantity-row" key={pastry.name}>
              <span>{pastry.name}</span>
              <div className="quantity-controls" aria-label={`${pastry.name} quantity`}>
                <button
                  type="button"
                  onClick={() => changeQuantity(index, -1)}
                  disabled={quantities[index] === 0}
                  aria-label={`Remove one ${pastry.name}`}
                >
                  −
                </button>
                <output aria-live="polite">{quantities[index]}</output>
                <button
                  type="button"
                  onClick={() => changeQuantity(index, 1)}
                  disabled={total >= 6}
                  aria-label={`Add one ${pastry.name}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="box-builder-footer">
          <span>{total} {total === 1 ? 'pièce sélectionnée' : 'pièces sélectionnées'}</span>
          <button className="box-submit" type="submit" disabled={total === 0}>
            Préparer ma boîte
          </button>
        </div>
        {submitted && (
          <motion.p
            className="box-success"
            role="status"
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          >
            Votre boîte conceptuelle est prête. Aucun ordre ni paiement n'a été envoyé.
          </motion.p>
        )}
      </form>
    </section>
  )
}

function VisitSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="visit-section" id="visit" aria-labelledby="visit-title">
      <div className="storefront-panel">
        <img src="/assets/storefront.png" alt="Fictional Les Moines bakery storefront in Paris at blue hour" />
        <div className="storefront-caption">
          <span>Concept location</span>
          <strong id="visit-title">18 rue du Bac, Paris</strong>
        </div>
      </div>

      <div className="visit-information">
        <h2 className="visit-title">Visite et questions</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = index === openIndex
            return (
              <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(index)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} className="faq-answer" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="visit-practical">
          <div>
            <span>Horaires fictifs</span>
            <strong>Tuesday to Sunday<br />7:00 to 19:30</strong>
          </div>
          <div>
            <span>Adresse fictive</span>
            <strong>18 rue du Bac<br />75007 Paris</strong>
          </div>
        </div>
        <button
          className="visit-link"
          type="button"
          onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Nous trouver <span aria-hidden="true">↗</span>
        </button>
      </div>

      <footer className="site-footer">
        <a href="#top" className="footer-lockup" aria-label="Back to Les Moines home">
          <img src="/assets/les-moines-monogram.png" alt="" />
          <span>Les Moines</span>
        </a>
        <p>Fictional premium bakery test site. No real store, order or payment.</p>
        <a href="#counter">Revoir la fournée</a>
      </footer>
    </section>
  )
}
