# APIArsenal Cursor Commands

Reusable workflows for developing APIArsenal. All commands assume compliance with:

- **Docs:** [MODULE_CONTRACT_BLUEPRINT.md](../../docs/MODULE_CONTRACT_BLUEPRINT.md), [FOLDER_STRUCTURE.md](../../docs/FOLDER_STRUCTURE.md), [SCHEMA_BLUEPRINT.md](../../docs/SCHEMA_BLUEPRINT.md), [IMPLEMENTATION_ORDER.md](../../docs/IMPLEMENTATION_ORDER.md)
- **Rules:** api-arsenal-architecture.mdc, api-arsenal-backend.mdc, api-arsenal-testing.mdc

## Command files

### Backend & architecture

| Command | File | Purpose |
|--------|------|---------|
| `/bootstrap-apiarsenal` | bootstrap-apiarsenal.md | **Bootstrap full backend skeleton** (platform, modules, tenancy, migrations, tests) |
| `/implementation-order` | implementation-order.md | **Phased build order** — follow docs/IMPLEMENTATION_ORDER.md; use after bootstrap |
| `/create-module` | create-module.md | New module in `app/Domains/Modules/{Name}` (definition, models, actions, requests, controllers, resources, routes, docs, seeders, tests) |
| `/create-platform-domain` | create-platform-domain.md | New platform domain in `app/Domains/Platform/{Name}` (models, actions, requests, controller, resource, policy, tests) |
| `/create-projects-module` | create-projects-module.md | Projects platform domain / module setup |
| `/create-feature-test` | create-feature-test.md | Laravel feature test in `tests/Feature/` (success, validation, auth, tenancy, response structure) |
| `/generate-api-endpoint` | generate-api-endpoint.md | REST endpoint (Controller, Request, Action, Resource, Test) |
| `/generate-migration` | generate-migration.md | Migration per docs/SCHEMA_BLUEPRINT.md |
| `/generate-module-docs` | generate-module-docs.md | API docs metadata in Module/Docs/ |
| `/generate-demo-seeder` | generate-demo-seeder.md | Module demo seeder (project-scoped) |
| `/review-code` | review-code.md | Code quality and tenant-safety review |
| `/tenant-safety-audit` | tenant-safety-audit.md | Multi-tenancy security audit |
| `/architecture-review` | architecture-review.md | Architecture compliance review |

### UI & dashboard

| Command | File | Purpose |
|--------|------|---------|
| `/generate-ui-page` | generate-ui-page.md | UI page (Next.js/Tailwind/shadcn or stack in use) |
| `/create-dashboard` | create-dashboard.md | Dashboard layout / shell |
| `/create-app-shell` | create-app-shell.md | App shell / layout |
| `/create-page-ui` | create-page-ui.md | Page UI components |
| `/create-table-ui` | create-table-ui.md | Table UI |
| `/create-form-ui` | create-form-ui.md | Form UI |
| `/create-ui-components` | create-ui-components.md | Reusable UI components |
| `/create-empty-state` | create-empty-state.md | Empty state component |
| `/create-loading-skeleton` | create-loading-skeleton.md | Loading skeleton |
| `/create-resource-builder` | create-resource-builder.md | Resource builder UI |
| `/create-api-explorer` | create-api-explorer.md | API explorer UI |
| `/improve-page-polish` | improve-page-polish.md | Polish existing page |
| `/refactor-ui` | refactor-ui.md | Refactor UI code |

## Bootstrap (run first)

Use **bootstrap-apiarsenal.md** to generate the initial project skeleton in one run. After running `/bootstrap-apiarsenal`, run:

1. `/review-code`
2. `/architecture-review`
3. `/tenant-safety-audit`

Then implement domains/modules incrementally (e.g. "Implement the Projects platform domain fully", then ApiKeys, then Blog). Use **implementation-order.md** or [docs/IMPLEMENTATION_ORDER.md](../../docs/IMPLEMENTATION_ORDER.md) for the exact sequence: foundation → platform control → runtime → Users → Blog → Media → Settings → docs → observability → app-user auth.

## Single-file option

Use **apiarsenal-tools.md** as one command (e.g. `/apiarsenal-tools`) to reference all backend and workflow commands in a single prompt.

## Usage

In Cursor, invoke a command by name (e.g. `/create-module`, `/create-platform-domain`) and ensure the rule files and docs are in scope so the assistant follows APIArsenal conventions.
