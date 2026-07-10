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
  'src/routes/__root.tsx',
  'src/styles.css',
  'src/app-meta.json',
  'public/assets/hero-croissant.png',
  'public/assets/pastry-collection.png',
  'public/assets/pastry-croissant.png',
  'public/assets/pastry-chocolat.png',
  'public/assets/pastry-chausson.png',
  'public/assets/pastry-brioche.png',
  'public/assets/pastry-tarte.png',
  'public/assets/atelier-fold.png',
  'public/assets/storefront.png',
  'public/assets/les-moines-monogram.png',
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
  /lorem ipsum/i,
  /todo/i,
  /scaffold marker/i,
  /h-screen/,
  /opacity-0/,
  /\u2014|\u2013/,
  /#f5f1ea|#f7f5f1|#fbf8f1|#efeae0|#ece6db|#faf7f1|#e8dfcb/i,
  /#b08947|#b6553a|#9a2436|#9c6e2a|#bc7c3a|#7d5621/i,
]

for (const [file, text] of visibleSource) {
  for (const pattern of bannedTerms) {
    if (pattern.test(text)) fail(`Banned token ${pattern} found in ${file}`)
  }
}

const index = read('src/routes/index.tsx')
const styles = read('src/styles.css')
const brief = read('design-brief.md')

const checks = [
  ['hero pointer response', 'onPointerMove={handlePointerMove}'],
  ['pastry arrow-key navigation', "event.key !== 'ArrowRight'"],
  ['pastry accessible state', 'aria-pressed={isActive}'],
  ['craft range', 'id="craft-stage"'],
  ['quantity limit', 'Math.min(6'],
  ['local confirmation', 'Aucun ordre ni paiement'],
  ['FAQ disclosure state', 'aria-expanded={isOpen}'],
  ['reduced-motion CSS', 'prefers-reduced-motion'],
  ['dynamic viewport hero', 'min-height: 100dvh'],
  ['horizontal overflow guard', 'overflow-x: hidden'],
  ['hero asset usage', '/assets/hero-croissant.png'],
  ['pastry asset usage', '/assets/pastry-collection.png'],
  ['croissant crop usage', '/assets/pastry-croissant.png'],
  ['chocolat crop usage', '/assets/pastry-chocolat.png'],
  ['chausson crop usage', '/assets/pastry-chausson.png'],
  ['brioche crop usage', '/assets/pastry-brioche.png'],
  ['tarte crop usage', '/assets/pastry-tarte.png'],
  ['atelier asset usage', '/assets/atelier-fold.png'],
  ['storefront asset usage', '/assets/storefront.png'],
  ['monogram asset usage', '/assets/les-moines-monogram.png'],
  ['distinct hero CTA', 'className="hero-cta"'],
  ['distinct box CTA', 'className="box-submit"'],
  ['distinct visit CTA', 'className="visit-link"'],
]

for (const [label, token] of checks) {
  if (!index.includes(token) && !styles.includes(token)) fail(`Missing check: ${label}`)
}

if (index.includes('localStorage') || index.includes('sessionStorage')) {
  fail('Local browser storage is not permitted for the demo order state')
}

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

console.log('QA passed')
console.log(`Checked ${required.length} required files and ${visibleSource.length} source files`)
