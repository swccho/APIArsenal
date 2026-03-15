# APIArsenal Command Pack (Single File)

Use this file as **one command** (e.g. `/apiarsenal-tools`) if you prefer all commands in a single reference.

---

**All commands must follow:**
- docs/MODULE_CONTRACT_BLUEPRINT.md (or module-contract.md)
- docs/FOLDER_STRUCTURE.md
- docs/SCHEMA_BLUEPRINT.md (or database-schema.md)
- api-arsenal-architecture.mdc
- api-arsenal-backend.mdc
- api-arsenal-testing.mdc

**Cursor must always respect:**
- Modular monolith architecture
- Project-based multi-tenancy
- Thin controllers
- Action-based business logic
- RESTful API design
- Consistent response structures
- Secure API key handling
- Tenant-safe queries

---

## /create-module

Create a new APIArsenal module in `app/Domains/Modules/{ModuleName}`. Include: Module Definition, Models, Actions, Requests, Controllers, Resources, Routes, Docs, Seeders (if demo), Feature tests. Structure: {ModuleName}Module.php, Models/, Actions/, Http/{Controllers, Requests, Resources}/, Docs/, Seeders/, Routes/, Policies/, Queries/, Support/. Rules: project_id on project-owned tables; thin controllers; business logic in Actions; API Resources; isolated routes; module docs defined.

---

## /create-platform-domain

Create a new platform domain in `app/Domains/Platform/{DomainName}`. Include: Model, Actions, Requests, Controller, Resource, Policy if required, Tests. Structure: Models/, Actions/, Http/{Controllers, Requests, Resources}/, Policies/, Queries/, Support/. Rules: platform domains manage infrastructure only; no module logic; thin controllers; business logic in actions. Examples: Projects, ApiKeys, ProjectMembers, ProjectModules, Usage, Audit, Documentation.

---

## /create-feature-test

Generate a Laravel feature test in `tests/Feature/`. Follow api-arsenal-testing.mdc. Cover: success, validation failure, unauthorized, forbidden, tenant isolation, response structure, DB state. Use factories. Names like: it_creates_a_post_for_the_authenticated_project, it_does_not_return_posts_from_other_projects, it_rejects_requests_with_invalid_api_key.

---

## /generate-api-endpoint

Generate a REST endpoint: Controller, Request, Action, Resource, Test. Controllers: receive request, authorize, call action, return resource. Actions: business logic, tenant-safe models. Responses: Success `{"data":{}}`, List `{"data":[],"meta":{}}`, Error `{"error":{"code":"","message":""}}`.

---

## /generate-migration

Generate a Laravel migration per docs/SCHEMA_BLUEPRINT.md. Project-owned tables: project_id; proper FKs; indexes (project_id, created_at, slug, email, status). JSON only for flexible metadata; no relational data in JSON.

---

## /generate-module-docs

Generate API docs in Module/Docs/ (e.g. BlogDocs.php). Include: path, method, summary, description, auth, request/response schema, example. Document GET/POST/GET/PUT/DELETE for resource. Match controller behavior.

---

## /review-code

Review for: architecture issues, tenant safety, fat controllers, missing validation, improper responses, security, naming, missing tests. Verify project_id, API key safety, module boundaries, platform vs module separation.

---

## /tenant-safety-audit

Audit multi-tenancy: all project-owned queries scoped by project_id; no cross-project access; project from API key not request; ProjectOwnedModel where required. Report unsafe patterns.

---

## /generate-demo-seeder

Generate module seeder in Module/Seeders/. Accept project context; create only for that project; realistic demo data (e.g. Blog: categories, posts, comments, tags). No cross-project pollution.

---

## /generate-ui-page

Delegate to UI architect: Next.js, Tailwind, shadcn, SaaS dashboard. Pages: loading, error, empty states; responsive. Focus: UI, layout, components, UX. No backend logic.

---

## /architecture-review

Review for: modular monolith, domain-first structure, platform vs module boundaries, module contract, DB schema. Flag violations; suggest improvements.

---

## Definition of Done

Task complete when: architecture rules respected; controllers thin; actions have business logic; validation exists; responses consistent; tenant safety enforced; tests exist; docs updated.
