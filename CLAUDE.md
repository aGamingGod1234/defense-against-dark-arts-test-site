# Defense Against the Dark Arts Test Site

## Purpose
Build an original ultra-premium benchmark landing page for a fictional dark-fantasy action game. This is a concept demo, not a real product or storefront.

## Stack
- TanStack Start, React 19, Tailwind 4, TypeScript
- Framer Motion is installed
- Keep SSR compatibility and existing route structure

## Commands
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run dev`

## Hard design constraints
- Original occult academy setting. Do not use Harry Potter names, characters, locations, logos, school crests, wand silhouettes, house systems, or exact franchise visual identity.
- Palette is monochrome obsidian and cold silver with one spectral chartreuse accent.
- Use Bodoni Moda only for justified high-drama display moments and Manrope for UI/body.
- No generic equal-card feature grid, no repeated split sections, no purple glow, no fake metrics, no testimonials, no purchase claims, no em dash or en dash in visible copy.
- Hero must fit the first viewport with CTA visible. Mobile must use `100dvh` and explicit single-column fallbacks.
- Use real supplied generated assets. Never synthesize fake screenshots or decorative SVG art.
- Motion must communicate hierarchy, combat response, or state change. Honor reduced motion.
- Keep public production assets below 2.5 MiB total if possible.

## Required sections
1. Full-bleed campaign hero with concise title, one primary CTA `Enter the Collegium`, and one secondary jump link.
2. Premise manifesto with a physically distinct oath/ledger composition.
3. Interactive spell discipline selector using three real states: Sever, Bind, Reveal.
4. Full-bleed Hall of Vows world section.
5. Interactive enemy dossier, preferably a desktop visual accordion with an explicit touch/mobile alternative.
6. Lantern Keeper character chapter using portrait asset and a distinct editorial composition.
7. Combat philosophy section using combat asset, followed by a compact final CTA and clear fictional concept note.

## Asset files
- `/public/assets/hero.webp`
- `/public/assets/hall.webp`
- `/public/assets/combat.webp`
- `/public/assets/keeper.webp`

## Quality gates
- Semantic landmarks and headings
- Keyboard operable tabs/accordion
- Visible focus styles
- WCAG AA contrast
- No horizontal overflow at 1440, 768, and 390 widths
- Clean console
- Typecheck, tests, build pass
- Reduced motion supported
- Responsive image dimensions or CSS aspect-ratio to prevent CLS
