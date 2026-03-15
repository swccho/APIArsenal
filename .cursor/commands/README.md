# APIArsenal Cursor Commands

Reusable workflows for developing APIArsenal. All commands assume compliance with:

- **Docs:** MODULE_CONTRACT_BLUEPRINT.md, FOLDER_STRUCTURE.md, SCHEMA_BLUEPRINT.md
- **Rules:** api-arsenal-architecture.mdc, api-arsenal-backend.mdc, api-arsenal-testing.mdc

## Command Files

| Command | File | Purpose |
|--------|------|---------|
| `/bootstrap-apiarsenal` | bootstrap-apiarsenal.md | **Bootstrap full backend skeleton** (platform, modules, tenancy, migrations, tests) |
| `/implementation-order` | implementation-order.md | **Phased build order** — follow docs/IMPLEMENTATION_ORDER.md; use after bootstrap |
| `/create-module` | create-module.md | New module in `app/Domains/Modules/{Name}` |
| `/create-platform-domain` | create-platform-domain.md | New platform domain in `app/Domains/Platform/{Name}` |
| `/create-feature-test` | create-feature-test.md | Laravel feature test in `tests/Feature/` |
| `/generate-api-endpoint` | generate-api-endpoint.md | REST endpoint (Controller, Request, Action, Resource, Test) |
| `/generate-migration` | generate-migration.md | Migration per schema docs |
| `/generate-module-docs` | generate-module-docs.md | API docs metadata in Module/Docs/ |
| `/review-code` | review-code.md | Code quality and tenant-safety review |
| `/tenant-safety-audit` | tenant-safety-audit.md | Multi-tenancy security audit |
| `/generate-demo-seeder` | generate-demo-seeder.md | Module demo seeder |
| `/generate-ui-page` | generate-ui-page.md | Delegate UI to Next.js/Tailwind/shadcn |
| `/architecture-review` | architecture-review.md | Architecture compliance review |

## Bootstrap (run first)

Use **bootstrap-apiarsenal.md** to generate the initial project skeleton in one run. After running `/bootstrap-apiarsenal`, run:

1. `/review-code`
2. `/architecture-review`
3. `/tenant-safety-audit`

Then implement domains/modules incrementally (e.g. "Implement the Projects platform domain fully", then ApiKeys, then Blog). Use **implementation-order.md** (or `docs/IMPLEMENTATION_ORDER.md`) for the exact sequence: foundation → platform control → runtime → Users → Blog → Media → Settings → docs → observability → app-user auth.

## Single-file option

Use **apiarsenal-tools.md** as one command (e.g. `/apiarsenal-tools`) to reference all of the above in a single prompt.

## Usage

In Cursor, invoke a command by name (e.g. `/create-module`) and ensure the rule files and docs are in scope so the assistant follows APIArsenal conventions.
