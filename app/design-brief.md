# Les Moines Design Brief

## Classification

Type: `website`

Project label: `les-moines-test-site`

Scope: fictional premium French bakery test site. It is not a real client, order service or physical bakery. Do not add it to the lead sheet.

## Design read

Reading this as a premium consumer brand site for design-conscious bakery customers, with a cool French editorial language built around monastic precision, laminated pastry and the quiet ritual of the morning bake.

Design dials: variance 8, motion 6, density 3.

Delivery tier: cinema-level marketing demo without video or 3D. Photography, typography, tactile controls and restrained scroll choreography carry the experience.

## Audience and conversion goal

Audience: visitors who value craft, visual refinement and premium morning rituals.

Primary action: explore the morning bake and complete a local pastry-box demo.

Secondary action: visit the fictional bakery details.

Post-action state: inline confirmation makes it explicit that no order, payment or personal data was sent.

## Visitor question sequence

1. What is Les Moines? A fictional French bakery built around precise morning pastry.
2. Is it for me? The photography, concise menu and craft language establish the premium register.
3. Why trust the craft? The proofing dial and atelier chapter explain time, lamination and handwork.
4. What can I choose? The pastry counter reveals five products and tasting notes.
5. What should I do? Compose a local demo box or view the fictional visit details.
6. What happens next? The interface confirms the selection without creating a real order.

## Locked design system

Harmony: monochrome.

Base hue: cobalt blue.

Temperature: cool.

- Dominant cobalt: `#18306E`
- Deep cobalt: `#0D1B3F`
- Porcelain: `#F2F4F1`
- Silver surface: `#CCD2DA`
- Ink: `#101B38`
- Muted ink: `#566078`
- Focus: `#315FC4`
- Error: `#A43D4A`, used only for a real state

Contrast: dark cobalt on porcelain and porcelain on deep cobalt. Body and control text target WCAG AA. The accent is not sprayed across decorative elements.

Typography: Bodoni Moda Variable for justified French heritage display type, Manrope Variable for clean body and controls. Both are self-hosted from package assets. No Google font network dependency.

Shape system: square editorial surfaces with 2px to 6px micro-radius; controls may be circular when their physical function is clear. No page-wide pill system.

Theme: one cool light editorial system with cobalt full-bleed photography. No section-level theme inversion outside palette-consistent cobalt image fields.

## Concept spine

The site treats pastry as a calibrated morning ritual. The visual sequence moves from finished croissant, to the morning counter, to measured proofing, to the hand gesture, to the composed box, then to the place.

Second-read moment: the atelier chapter uses one narrow vertical editorial crop and a small running note. It appears once.

## References and conversion notes

- UND NY: bread as protagonist, product-led motion and unusual interaction rhythm.
- Bernice Bakery: clear play cues and personality, but this build removes playful color noise.
- Poilâne: strong craft authority, direct product naming and simple trust sequence.
- BO&MIE: visible product variety and decisive store intent.
- UI UX Pro Max research: scroll storytelling, editorial grid and image-led hierarchy.

Winner pattern: immediate product desire, product clarity, craft proof, one obvious action and practical visit information.

Loser pattern: fake heritage, generic restaurant templates, repeated cards, decorative claims, hover content with no cue and checkout UI that implies a real transaction.

## Section distinctiveness ledger

1. Hero
   - User job: understand the brand and first action.
   - Composition: full-bleed image-as-canvas with oversized wordmark and lower-left copy.
   - Asset: `hero-croissant.png`.
   - Interaction: cursor light and slow image parallax.
   - Mobile: text moves to a porcelain lower panel; image remains above with fixed crop.

2. Morning counter
   - User job: discover the five pastries.
   - Composition: full-width accordion slices, not cards.
   - Asset: `pastry-collection.png` with distinct object-position crops.
   - Interaction: hover, focus, click and arrow-key selection; active slice expands.
   - Mobile: horizontal snap list with a separate active detail panel.

3. Time and lamination
   - User job: understand why the pastry is different.
   - Composition: large circular proofing dial beside a layered pastry crop.
   - Asset: `pastry-collection.png` macro crop.
   - Interaction: three-state dial with direct buttons and range input.
   - Mobile: dial stacks above the state explanation.

4. Atelier
   - User job: see physical proof of handwork.
   - Composition: full-bleed photograph with lower-right story and one side note.
   - Asset: `atelier-fold.png`.
   - Interaction: restrained image drift and flour-point parallax.
   - Mobile: static crop and no parallax.

5. Morning box
   - User job: compose a local demo selection.
   - Composition: open-box visual left, quantity controls right.
   - Asset: `pastry-collection.png`.
   - Interaction: increment and decrement, live count, local submit and explicit confirmation.
   - Mobile: order controls before the visual summary for keyboard and touch efficiency.

6. Visit and FAQ
   - User job: resolve practical questions and find the fictional location.
   - Composition: two-thirds storefront and one-third editorial accordion plus footer.
   - Asset: `storefront.png`.
   - Interaction: accessible FAQ disclosure and a non-navigation demo address action.
   - Mobile: image, questions, hours, address and footer stack in that order.

## CTA inventory

- Hero: `Voir la fournée`, solid porcelain control on imagery.
- Counter: product name acts as the selection control, not a duplicate CTA.
- Box builder: `Préparer ma boîte`, square cobalt action with live piece count.
- Closing: `Nous trouver`, underlined text action.

Each action has a distinct interaction identity. No shared site-wide button utility class.

## Asset plan and provenance

Generated specifically for this fictional test site with the configured OpenAI image engine:

- `hero-croissant.png`: hero and OG image, 1536x1024 source, responsive cover crop.
- `pastry-collection.png`: counter and selection imagery, 1536x1024 source, reused through distinct crops with one declared purpose per crop.
- `atelier-fold.png`: craft chapter, 1536x1024 source.
- `storefront.png`: closing chapter, 1536x1024 source.
- `les-moines-monogram.png`: favicon and local identity mark, 1024 square source.

All generated assets were visually inspected for text, anatomy, subject separation and visible artifacts. Boards stay in `refs/`; production assets live in `app/public/assets/`.

## Motion spec

Purpose: hierarchy, product selection feedback, craft storytelling and state confirmation.

Personality: premium.

Intensity: 6 desktop, 3 mobile, static under reduced motion.

- Quick: 140ms for press and quantity feedback.
- Standard: 420ms for accordion and panel transitions.
- Slow: 760ms for hero and chapter reveals.
- Signature easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hero parallax: maximum 18px pointer movement and 36px scroll travel.
- Stagger: 55ms per pastry label, capped below 275ms.
- Continuous motion: none. Pointer response stops immediately when interaction stops.
- Hidden tab and reduced-motion: no parallax, image drift or spring transform.

## Self-critique before coding

- Concept specificity: strong. The sequence is inseparable from laminated pastry and morning ritual.
- Non-generic composition: strong. Accordion, dial, full-bleed atelier and box builder differ.
- Palette distinctiveness: strong. Cool cobalt and porcelain avoids the repeated beige craft default and the previous test palette.
- Typography fit: justified heritage serif paired with modern control text.
- CTA clarity: one primary selection flow and one visit action.
- Mobile risk: image crops and quantity controls require explicit order and touch testing.
- Asset risk: the pastry collection will be cropped into several products, so each crop must remain recognizable.
- Trust risk: fictional details must remain visibly labeled as a concept.

Verdict: ready to implement.

## QA plan

Run `bun run qa:fill -- --strict`, `bun run typecheck`, `bun run build`, `bun run build:design` and a static security scan. Verify local HTTP 200, desktop at 1440px, tablet at 768px and mobile at 390px. Test accordion selection, keyboard navigation, proofing controls, quantity limits, submit confirmation, FAQ, reduced motion, no horizontal overflow and a clean console. Start visual review at `NEEDS_WORK`, fix the highest-impact batch, rebuild once and only then hand off the public preview.
