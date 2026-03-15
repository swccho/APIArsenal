# APIArsenal

Multi-tenant modular API platform built with Laravel. One backend, one dashboard, project-scoped data. Each project can enable modules (Blog, Media, Orders, etc.) and consume APIs keyed by project.

## Architecture

- **Platform + modules:** Platform domains (Projects, ApiKeys, ProjectMembers, Usage, Audit) live under `app/Domains/Platform/`. Feature modules (Blog, Media, Settings, etc.) live under `app/Domains/Modules/`.
- **Project = tenant:** Isolation is by `project_id`. All project-owned tables and APIs are scoped to the current project.
- **Thin controllers, action-based logic:** Business logic lives in Actions; controllers stay thin. Responses use API Resources.
- **Module contract:** Every module is self-contained (models, actions, requests, controllers, resources, policies, docs, seeders) and follows [docs/MODULE_CONTRACT_BLUEPRINT.md](docs/MODULE_CONTRACT_BLUEPRINT.md).

## Documentation

| Doc | Purpose |
|-----|---------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Platform style, tenancy, modules, API structure |
| [MODULE_CONTRACT_BLUEPRINT.md](docs/MODULE_CONTRACT_BLUEPRINT.md) | Module design, metadata, responsibilities |
| [FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md) | Domain-first layout, Platform vs Modules |
| [SCHEMA_BLUEPRINT.md](docs/SCHEMA_BLUEPRINT.md) | Database schema and migrations |
| [IMPLEMENTATION_ORDER.md](docs/IMPLEMENTATION_ORDER.md) | Phased build order (foundation → platform → modules) |
| [dev-workflow.md](docs/dev-workflow.md) | Development workflow and conventions |
| [api-style.md](docs/api-style.md) | API design and style |

## Getting started

### Install and run

```bash
composer install
cp .env.example .env
php artisan key:generate
# Configure .env (DB, FRONTEND_URL). Default: MySQL, DB_DATABASE=api_arsenal
php artisan migrate
php artisan db:seed
npm install
# Run backend + Vite together:
composer dev
# Or separately: php artisan serve (backend) and npm run dev (frontend)
```

Open the app at `http://localhost:8000` (or the URL from `php artisan serve`). The React SPA is served for all routes; API is under `/api`.

### Laragon (https://api-arsenal.test)

1. Point the Laragon site to this project and ensure the host is `api-arsenal.test`.
2. In `.env` set:
   - `APP_URL=https://api-arsenal.test`
   - `FRONTEND_URL=https://api-arsenal.test`
   - Add `api-arsenal.test` to `SANCTUM_STATEFUL_DOMAINS` (e.g. `localhost,127.0.0.1,api-arsenal.test`).
3. Run `npm run build` so the frontend is built and served by Laravel at https://api-arsenal.test/.
4. Visit https://api-arsenal.test/ — the React SPA loads from the same origin. For live reload during frontend dev, run `npm run dev` and use `http://localhost:8000` or configure Vite for HTTPS.

### Code quality

- **Backend:** `composer format` (Laravel Pint)
- **Frontend:** `npm run lint`, `npm run format` (ESLint, Prettier)

See [docs/IMPLEMENTATION_ORDER.md](docs/IMPLEMENTATION_ORDER.md) for the recommended build sequence.

## Cursor commands

Development is guided by Cursor commands and rules. See [.cursor/commands/README.md](.cursor/commands/README.md) for:

- `/bootstrap-apiarsenal` — full backend skeleton
- `/create-module` — new module in `app/Domains/Modules/{Name}`
- `/create-platform-domain` — new platform domain in `app/Domains/Platform/{Name}`
- `/generate-api-endpoint`, `/generate-migration`, `/create-feature-test`, and more.

Commands assume compliance with the docs above and the rules in `.cursor/` (e.g. api-arsenal-architecture, api-arsenal-backend, api-arsenal-testing).

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
