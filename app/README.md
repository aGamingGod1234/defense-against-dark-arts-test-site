# Les Moines App

The application lives in `src/routes/` and uses TanStack Start, React 19, Vite 7, Tailwind v4 and Framer Motion.

Run quality gates from this directory:

```bash
bun run qa:fill -- --strict
bun run typecheck
bun run build
bun run build:design
```

The experience is a fictional local demo. It creates no order, payment or stored customer record.
