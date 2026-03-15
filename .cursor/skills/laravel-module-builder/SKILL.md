---
name: laravel-module-builder
description: >-
  Creates a new APIArsenal module following the module contract, folder structure,
  and architecture rules. Use when the user asks to create a new module, add a
  feature module, or scaffold a module for APIArsenal (Blog, Media, Orders, etc.).
---

# Laravel Module Builder (APIArsenal)

Build a new module for APIArsenal. Follow **strictly** the project blueprints and rules. Do not invent structure or skip required parts.

## Mandatory References (Read First)

Before generating any module code, read and apply:

| Reference | Path | Purpose |
|-----------|------|---------|
| Module contract | `docs/MODULE_CONTRACT_BLUEPRINT.md` | What every module must define and how it behaves |
| Folder structure | `docs/FOLDER_STRUCTURE.md` | Where every file lives; domain/module layout |
| Architecture rules | `.cursor/rules/api-arsenal-architecture.mdc` | Tenancy, boundaries, module system |
| Backend rules | `.cursor/rules/api-arsenal-backend.mdc` | Thin controllers, actions, resources, security |
| Testing rules | `.cursor/rules/api-arsenal-testing.mdc` | What to test and how |

If any of these files are missing, ask the user before proceeding.

---

## Module Location and Naming

- **Base path:** `app/Domains/Modules/{ModuleName}/`
- **Module key:** lowercase, singular or plural as per existing modules (e.g. `blog`, `media`, `users`).
- **Definition class:** `{ModuleName}Module.php` at module root (e.g. `BlogModule.php`).

---

## Required Parts Checklist

Every new module must include the following. Use this as a completion checklist.

| # | Part | Location / Example | Notes |
|---|------|-------------------|-------|
| 1 | **Module definition** | `{Module}Module.php` | Implements module contract; key, name, description, category, version, dependencies, register, boot, routes, docs, supportsDemoData, seedDemoData |
| 2 | **Models** | `Models/*.php` | All extend `ProjectOwnedModel` (or shared base); include `project_id`; tenant-safe |
| 3 | **Actions** | `Actions/*.php` | One purpose per action (e.g. CreatePostAction, UpdatePostAction, ListPostsAction); business logic lives here only |
| 4 | **Requests** | `Http/Requests/*.php` | Form Request classes for validation; no large inline validation in controllers |
| 5 | **Controllers** | `Http/Controllers/*.php` | Thin: receive request → authorize → call action → return resource |
| 6 | **Resources** | `Http/Resources/*.php` | API Resources for all public output; never return raw Eloquent models |
| 7 | **Routes** | `Routes/api.php` or `Support/{Module}RouteRegistrar.php` | Module-owned route definitions; registered centrally |
| 8 | **Docs definitions** | `Docs/{Module}Docs.php` | Structured endpoint metadata (method, path, summary, auth, etc.) for docs engine |
| 9 | **Demo seeder** | `Seeders/{Module}DemoSeeder.php` | If `supportsDemoData()` is true; project-aware, idempotent where possible |
| 10 | **Policies** | `Policies/*.php` | When authorization rules are needed; keep inside module |
| 11 | **Tests** | `tests/Feature/Modules/{Module}/` (and Unit if needed) | Endpoint behavior, tenancy isolation, auth/authz, response shape |

---

## Non-Negotiable Rules

### Tenancy

- **Project tenancy is enforced.** All project-owned models must have `project_id` and be scoped to the active project.
- Resolve project from authenticated API context only; never from request input.
- Every query for project-owned data must use tenant-aware base model or explicit project scoping.
- Add tests that verify cross-project isolation (project A cannot see/change project B data).

### Controllers

- **Controllers remain thin.** Only: receive request, authorize, delegate validation to Form Requests, call actions, return resources or standardized responses.
- No business logic, no raw queries, no inline validation arrays in controllers.

### Business Logic

- **Business logic lives in actions.** Create/Update/Delete/List/Get workflows go in dedicated action classes.
- Actions receive clear inputs (validated data, injected dependencies) and return models or DTO-like results for resources to transform.

### Responses

- **Responses use API Resources.** All API output must go through Resource classes. Never return raw models or unchecked arrays.

### Security and Validation

- Use Form Request classes for validation.
- Do not trust client input for `project_id` or ownership.
- Authorize sensitive actions explicitly.

---

## Suggested Workflow

1. **Gather:** Confirm module key, name, category, and dependencies with user if unclear.
2. **Read:** Load `docs/MODULE_CONTRACT_BLUEPRINT.md`, `docs/FOLDER_STRUCTURE.md`, and the three `.mdc` rules files.
3. **Scaffold:** Create directory structure under `app/Domains/Modules/{ModuleName}/` per FOLDER_STRUCTURE (Actions, Http/Controllers, Http/Requests, Http/Resources, Models, Docs, Seeders, Policies, Routes or Support).
4. **Implement in order:** Module definition → Models (and migrations if needed) → Actions → Requests → Resources → Controllers → Routes → Docs → Seeder (if applicable) → Policies (if needed).
5. **Register:** Ensure the module is registered in the platform module registry (e.g. via ModuleServiceProvider or equivalent).
6. **Test:** Add feature tests for main endpoints and tenancy isolation; add unit tests for actions if beneficial.
7. **Verify:** Walk the "Required Parts Checklist" and "Definition of Done" from the module contract.

---

## Definition of Done (from Module Contract)

A module is complete only when it has:

- Metadata definition and declared dependencies  
- Models (tenant-safe)  
- Actions  
- Requests  
- Controllers (thin)  
- Resources  
- Routes  
- Docs definitions  
- Demo seeder if applicable  
- Tenant-safe data handling  
- Tests for endpoint behavior and project isolation  

---

## Optional Reference

For extended detail on folder structure, route strategy, and test layout, see [reference.md](reference.md) in this skill directory.
