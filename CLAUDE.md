# Workflow

- New work happens on a feature branch, not directly on `main`. Create a branch (e.g. `feature/<short-name>`), make and test changes there, then merge into `main` only after the user has reviewed/tested it. `main` is what Vercel deploys from, so treat it as the "live" branch.
- Exception: the user may explicitly ask for a direct commit/push to `main` (e.g. a quick fix) — follow that instruction when given, but default to the branch workflow otherwise.
