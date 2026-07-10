import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')
const failures = []

function fail(message) {
  failures.push(message)
}

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

function walk(dir, files = []) {
  for (const entry of readdirSync(join(root, dir))) {
    const full = join(root, dir, entry)
    if (entry === 'node_modules' || entry === 'dist' || entry === '.output') continue
    if (statSync(full).isDirectory()) walk(relative(root, full), files)
    else files.push(relative(root, full).replaceAll('\\', '/'))
  }
  return files
}

const required = [
  'design-brief.md',
  'src/routes/index.tsx',
  'src/pages/DarkArtsPage.tsx',
  'src/routes/__root.tsx',
  'src/styles.css',
  'src/app-meta.json',
  'public/assets/hero.webp',
  'public/assets/hall.webp',
  'public/assets/combat.webp',
  'public/assets/keeper.webp',
  'public/assets/enemy-crownless.webp',
  'public/assets/enemy-gloam-hound.webp',
  'public/assets/enemy-null-choir.webp',
  'public/assets/favicon.png',
  'public/robots.txt',
  'public/sitemap.xml',
]

for (const file of required) {
  if (!existsSync(join(root, file))) fail(`Missing required file: ${file}`)
}

const sourceFiles = walk('src').filter((file) => /\.(tsx|ts|css|json)$/.test(file))
const visibleSource = sourceFiles
  .filter((file) => !file.endsWith('routeTree.gen.ts'))
  .map((file) => [file, read(file)])

const bannedTerms = [
  /les moines/i,
  /croissant/i,
  /harry potter/i,
  /hogwarts/i,
  /lorem ipsum/i,
  /todo/i,
  /h-screen/,
  /\u2014|\u2013/,
]

for (const [file, text] of visibleSource) {
  for (const pattern of bannedTerms) {
    if (pattern.test(text)) fail(`Banned token ${pattern} found in ${file}`)
  }
}

const index = read('src/routes/index.tsx') + read('src/pages/DarkArtsPage.tsx')
const styles = read('src/styles.css')
const brief = read('design-brief.md')

const checks = [
  ['hero pointer response', 'onPointerMove={handlePointerMove}'],
  ['discipline tabs', 'role="tablist"'],
  ['discipline keyboard navigation', "event.key === 'ArrowRight'"],
  ['enemy accessible state', 'aria-pressed={active}'],
  ['oath state', 'aria-pressed={sealed}'],
  ['reduced-motion CSS', 'prefers-reduced-motion'],
  ['dynamic viewport hero', 'min-height: 100dvh'],
  ['horizontal overflow guard', 'overflow-x: hidden'],
  ['hero asset usage', '/assets/hero.webp'],
  ['hall asset usage', '/assets/hall.webp'],
  ['combat asset usage', '/assets/combat.webp'],
  ['keeper asset usage', '/assets/keeper.webp'],
  ['crownless asset usage', '/assets/enemy-crownless.webp'],
  ['gloam asset usage', '/assets/enemy-gloam-hound.webp'],
  ['choir asset usage', '/assets/enemy-null-choir.webp'],
  ['fictional disclaimer', 'Original fictional concept, unaffiliated with any existing franchise'],
]

for (const [label, token] of checks) {
  if (!index.includes(token) && !styles.includes(token)) fail(`Missing check: ${label}`)
}

const assetFiles = walk('public/assets')
const assetBytes = assetFiles.reduce((total, file) => total + statSync(join(root, file)).size, 0)
if (assetBytes > 2.5 * 1024 * 1024) fail(`Asset budget exceeded: ${assetBytes} bytes`)

if (strict) {
  for (const heading of ['## Motion spec', '## Self-critique before coding', '## Section distinctiveness ledger', '## CTA inventory']) {
    if (!brief.includes(heading)) fail(`Strict brief is missing: ${heading}`)
  }
}

if (failures.length) {
  console.error('QA failed')
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}

console.log(`QA passed: ${required.length} required files, ${assetBytes} asset bytes.`)
