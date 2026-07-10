import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'

type Discipline = {
  name: string
  verb: string
  thesis: string
  detail: string
  counter: string
  angle: string
}

type Enemy = {
  name: string
  kind: string
  image: string
  threat: string
  counter: string
}

const disciplines: Discipline[] = [
  {
    name: 'Sever',
    verb: 'Break the source.',
    thesis: 'Cut a curse away from the will that sustains it.',
    detail: 'A precise interruption. Sever rewards timing over force and turns an enemy channel into an opening.',
    counter: 'Best against anchored rites and shielded casters.',
    angle: '0deg',
  },
  {
    name: 'Bind',
    verb: 'Hold the impossible.',
    thesis: 'Fix hostile matter to a shape it cannot escape.',
    detail: 'Bind converts momentum into restraint. Catch a lunge, suspend debris, then redirect the pressure.',
    counter: 'Best against fast beasts and unstable constructs.',
    angle: '120deg',
  },
  {
    name: 'Reveal',
    verb: 'Name what hides.',
    thesis: 'Force concealed intent to occupy the visible world.',
    detail: 'Reveal strips false surfaces from rooms, memories, and enemies. What becomes legible can be opposed.',
    counter: 'Best against veils, mimicry, and corrupted space.',
    angle: '240deg',
  },
]

const enemies: Enemy[] = [
  {
    name: 'The Crownless',
    kind: 'Ruined oath-bearer',
    image: '/assets/enemy-crownless.webp',
    threat: 'It advances behind a broken standard and turns every sworn promise into weight.',
    counter: 'Sever the standard before the armor closes.',
  },
  {
    name: 'Gloam Hound',
    kind: 'Archive predator',
    image: '/assets/enemy-gloam-hound.webp',
    threat: 'It hunts across reflections, striking from whichever surface answers first.',
    counter: 'Bind the reflection, not the body.',
  },
  {
    name: 'The Null Choir',
    kind: 'Collective silence',
    image: '/assets/enemy-null-choir.webp',
    threat: 'Three mouths erase a different sense until the chamber can no longer be read.',
    counter: 'Reveal each voice in the order it was taken.',
  },
]

export function DarkArtsPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="dark-arts-page" id="top">
        <ReadingProgress />
        <Hero />
        <Oath />
        <Disciplines />
        <Hall />
        <Dossier />
        <Keeper />
        <Combat />
      </main>
    </MotionConfig>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.2,
  })

  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.01, 1.075])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 42])

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--hero-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--hero-y', `${event.clientY - rect.top}px`)
  }

  return (
    <section
      ref={heroRef}
      className="hero-section"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--hero-x', '72%')
        event.currentTarget.style.setProperty('--hero-y', '45%')
      }}
    >
      <a className="skip-link" href="#oath">Skip to the oath</a>
      <motion.img
        className="hero-image"
        src="/assets/hero.webp"
        alt="An arcane warden faces a towering smoke-born figure in a ruined observatory"
        width="1536"
        height="1024"
        fetchPriority="high"
        decoding="async"
        style={{ scale: imageScale, y: imageY }}
      />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />

      <nav className="floating-nav" aria-label="Primary navigation">
        <a className="nav-brand" href="#top" aria-label="Defense Against the Dark Arts home">
          <span className="nav-sigil" aria-hidden="true">D</span>
          <span>Vesper Collegium</span>
        </a>
        <div className="nav-links">
          <a href="#disciplines">Disciplines</a>
          <a href="#dossier">Dossier</a>
          <a href="#keeper">The Keeper</a>
        </div>
        <a className="nav-cta" href="#collegium">Enter</a>
      </nav>

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero-kicker">An original dark-fantasy action concept</p>
        <h1 id="hero-title" aria-label="Defense Against the Dark Arts">Defense Against<br />the Dark Arts</h1>
        <p>Read the curse. Break its shape. Guard the last light.</p>
        <div className="hero-actions">
          <a className="primary-action" href="#collegium">
            Enter the Collegium <span aria-hidden="true">↘</span>
          </a>
          <a className="text-action" href="#disciplines">Study the disciplines</a>
        </div>
      </motion.div>

      <div className="hero-aside" aria-hidden="true">
        <span>Black Archive</span>
        <span>Vesper Collegium</span>
      </div>
    </section>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Oath() {
  const [sealed, setSealed] = useState(false)

  return (
    <section className="oath-section" id="oath" aria-labelledby="oath-title">
      <div className="oath-index" aria-hidden="true">I</div>
      <Reveal className="oath-copy">
        <h2 id="oath-title">Darkness is not a weapon.<br />It is a contract.</h2>
        <p>
          Every hostile rite asks the world to agree. Your task is not to cast harder. Your task is to find the clause that can be refused.
        </p>
      </Reveal>
      <motion.button
        type="button"
        className={`oath-seal ${sealed ? 'is-sealed' : ''}`}
        aria-pressed={sealed}
        onClick={() => setSealed((value) => !value)}
        whileTap={{ scale: 0.97 }}
      >
        <span className="seal-rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{sealed ? 'Oath received' : 'Take the oath'}</strong>
        <small>{sealed ? 'The archive has marked your name.' : 'A local concept interaction. No account is created.'}</small>
      </motion.button>
    </section>
  )
}

function Disciplines() {
  const [activeIndex, setActiveIndex] = useState(0)
  const discipline = disciplines[activeIndex]
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function selectTab(index: number, moveFocus = false) {
    setActiveIndex(index)
    if (moveFocus) tabRefs.current[index]?.focus()
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? disciplines.length - 1
        : (activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + disciplines.length) % disciplines.length
    selectTab(nextIndex, true)
  }

  return (
    <section className="discipline-section" id="disciplines" aria-labelledby="discipline-title">
      <Reveal className="discipline-heading">
        <h2 id="discipline-title">Three disciplines.<br />One living defense.</h2>
        <p>Change the answer as the threat changes. Each discipline reveals a different weakness in the same encounter.</p>
      </Reveal>

      <div className="discipline-stage">
        <div
          className="discipline-tabs"
          role="tablist"
          aria-label="Defensive disciplines"
          onKeyDown={handleKeys}
        >
          {disciplines.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`discipline-tab-${index}`}
              aria-controls="discipline-panel"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              className={activeIndex === index ? 'is-active' : ''}
              ref={(node) => { tabRefs.current[index] = node }}
              onClick={() => selectTab(index)}
              key={item.name}
            >
              <span>0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className="discipline-orbit" style={{ '--orbit-turn': discipline.angle } as CSSProperties} aria-hidden="true">
          <motion.div
            className="orbit-core"
            animate={{ rotate: activeIndex * 120 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <i />
            <i />
            <i />
            <b>{discipline.name.charAt(0)}</b>
          </motion.div>
        </div>

        <div
          className="discipline-panel"
          id="discipline-panel"
          role="tabpanel"
          aria-labelledby={`discipline-tab-${activeIndex}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={discipline.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>{discipline.verb}</p>
              <h3>{discipline.thesis}</h3>
              <span>{discipline.detail}</span>
              <small>{discipline.counter}</small>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Hall() {
  const hallRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: hallRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-26, 26])

  return (
    <section ref={hallRef} className="hall-section" aria-labelledby="hall-title">
      <motion.img
        src="/assets/hall.webp"
        alt="The monumental Hall of Vows suspended above a deep black archive"
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
        style={{ y: imageY }}
      />
      <div className="hall-overlay" aria-hidden="true" />
      <Reveal className="hall-copy">
        <h2 id="hall-title">The Hall of Vows remembers every failed defense.</h2>
        <p>Walk its suspended archives. Recover abandoned methods. Decide which promises still deserve to hold.</p>
      </Reveal>
      <div className="hall-coordinate" aria-hidden="true">BLACK ARCHIVE / LOWER RING</div>
    </section>
  )
}

function Dossier() {
  const [activeIndex, setActiveIndex] = useState(0)
  const enemyRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (activeIndex + direction + enemies.length) % enemies.length
    setActiveIndex(nextIndex)
    enemyRefs.current[nextIndex]?.focus()
  }

  return (
    <section className="dossier-section" id="dossier" aria-labelledby="dossier-title">
      <Reveal className="dossier-heading">
        <h2 id="dossier-title">Nothing enters the archive without leaving a shape.</h2>
      </Reveal>

      <div className="enemy-accordion" onKeyDown={handleKeys} role="group" aria-label="Enemy dossiers">
        {enemies.map((enemy, index) => {
          const active = activeIndex === index
          return (
            <motion.button
              type="button"
              className={`enemy-slice ${active ? 'is-active' : ''}`}
              aria-pressed={active}
              aria-expanded={active}
              ref={(node) => { enemyRefs.current[index] = node }}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
              animate={{ flexGrow: active ? 3.25 : 1 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              key={enemy.name}
            >
              <img src={enemy.image} alt="" width="1024" height="1536" loading="lazy" decoding="async" />
              <span className="enemy-scrim" aria-hidden="true" />
              <span className="enemy-number">0{index + 1}</span>
              <span className="enemy-name">{enemy.name}</span>
              <span className="enemy-detail">
                <small>{enemy.kind}</small>
                <strong>{enemy.name}</strong>
                <span>{enemy.threat}</span>
                <em>{enemy.counter}</em>
              </span>
            </motion.button>
          )
        })}
      </div>
      <p className="interaction-note">Hover, focus, tap, or use left and right arrow keys.</p>
    </section>
  )
}

function Keeper() {
  return (
    <section className="keeper-section" id="keeper" aria-labelledby="keeper-title">
      <div className="keeper-portrait">
        <img
          src="/assets/keeper.webp"
          alt="The Lantern Keeper carries a fractured black-glass lantern through a storm"
          width="1024"
          height="1536"
          loading="lazy"
          decoding="async"
        />
      </div>
      <Reveal className="keeper-copy">
        <p className="keeper-role">Warden of the final threshold</p>
        <h2 id="keeper-title">Mara Vey<br />The Lantern Keeper</h2>
        <blockquote>“Light does not make us safe. It makes the cost visible.”</blockquote>
        <p>Mara enters each breach with one lantern and no doctrine she cannot question. Her task is simple: keep a path open long enough for others to return.</p>
        <dl>
          <div><dt>Instrument</dt><dd>Fractured lantern</dd></div>
          <div><dt>Discipline</dt><dd>Reveal</dd></div>
          <div><dt>Burden</dt><dd>The names inside the glass</dd></div>
        </dl>
      </Reveal>
      <div className="keeper-mark" aria-hidden="true">M</div>
    </section>
  )
}

function Combat() {
  return (
    <section className="combat-section" id="collegium" aria-labelledby="combat-title">
      <div className="combat-media">
        <motion.img
          src="/assets/combat.webp"
          alt="A warden catches a shadow creature against a translucent ward plane in heavy rain"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.035 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="combat-scrim" aria-hidden="true" />
        <Reveal className="combat-copy">
          <h2 id="combat-title">Defense is a decision made under pressure.</h2>
          <p>Read posture, material, sound, and intent. Choose the right discipline before the encounter chooses for you.</p>
        </Reveal>
      </div>

      <footer className="closing-section">
        <div>
          <h2>Enter the Collegium.</h2>
        </div>
        <a className="closing-action" href="#disciplines">
          Begin the study <span aria-hidden="true">↗</span>
        </a>
        <p className="concept-disclaimer">Original fictional concept, unaffiliated with any existing franchise. No account, purchase, or release is offered.</p>
        <a className="back-to-top" href="#top">Back to top</a>
      </footer>
    </section>
  )
}
