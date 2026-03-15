# APIArsenal — Recommended Implementation Order

Building in the wrong order creates rework. The safest path is:

**Foundation first → platform control → runtime modules → developer experience.**

---

## Phase 1 — Core Foundation

Build the pieces everything else depends on.

### 1. Project structure and providers

Implement:

- domain-first folders
- `ModuleServiceProvider`
- `TenancyServiceProvider`
- shared contracts
- shared base models
- shared API response helpers

### 2. Tenancy foundation

Implement:

- `ProjectContext`
- current project resolver
- API key → project resolution flow
- `ProjectOwnedModel`
- central tenant scoping approach

### 3. Core database tables

Implement migrations for:

- projects
- project_members
- modules
- project_modules
- api_keys
- usage_logs
- audit_logs

### 4. Module registry foundation

Implement:

- module definition contract
- module registry service
- module discovery/registration
- dependency resolution foundation

**Why first:** everything later depends on tenancy, module registration, and shared foundations being correct.

---

## Phase 2 — Platform Control Layer

Build the dashboard/backend control system.

### 5. Projects domain

Implement fully:

- create project
- list projects
- view project
- update project
- project resource
- project policy
- tests

### 6. Project members domain

Implement:

- add member
- list members
- update member role
- remove member

### 7. API keys domain

Implement:

- create API key
- display raw key once
- revoke key
- list keys
- hashed storage
- last used tracking foundation

### 8. Project modules domain

Implement:

- enable module
- disable module
- dependency checks
- module status listing
- config storage
- audit logging for module changes

**Why here:** before runtime APIs exist, the platform must be able to create projects, issue keys, and turn modules on.

---

## Phase 3 — Runtime API Skeleton

Connect the public API runtime.

### 9. Runtime middleware pipeline

Implement:

- API key auth middleware
- project resolution middleware
- module-enabled middleware
- standardized error responses
- request context binding

### 10. Route loading system

Implement:

- `routes/runtime.php`
- central module route loading
- versioned runtime grouping (e.g. `/api/v1`)
- route separation from platform routes

### 11. Base runtime conventions

Implement:

- pagination standard
- API resource response standard
- validation error standard
- not found / disabled module behavior

**Why now:** runtime infrastructure must exist before any real module APIs.

---

## Phase 4 — First Real Module: Users

Build project end-users before Blog.

### 12. Users module

Implement:

- `project_users` model
- create/list/view/update users
- auth-ready structure for app users
- resources
- tests
- docs definition

**Why before Blog:** Blog references authors and user-owned content. Users gives a clean base.

---

## Phase 5 — Blog Module

First full showcase module.

### 13. Blog categories

- category CRUD
- slug handling
- validation
- tests

### 14. Posts

- post CRUD
- publish/draft states
- pagination
- filters
- slug uniqueness per project
- author relation
- tests

### 15. Comments

- comment create/list/delete or moderate
- post ownership checks
- tenant safety tests

### 16. Tags

- tag CRUD if needed
- post-tag attachment flow

### 17. Blog docs + demo seeder

- `BlogDocs`
- `BlogDemoSeeder`
- sample categories/posts/comments

**Why first showcase module:** proves the APIArsenal idea clearly and is easy to demo.

---

## Phase 6 — Media Module

### 18. Media upload system

- upload endpoint
- file metadata storage
- validation
- listing
- delete
- visibility field
- tests

### 19. Media integration

Optionally allow Blog posts to reference media later.

**Why after Blog:** once content exists, media is easier to validate in real workflows.

---

## Phase 7 — Settings Module

### 20. Project settings

- list settings
- upsert setting
- typed/simple validation
- docs
- tests

**Why here:** simple module, useful for config-driven project features.

---

## Phase 8 — Documentation Engine

Improve developer experience.

### 21. Central docs composer

- collect docs from enabled modules
- render per-project docs metadata
- group by module
- expose example requests/responses

### 22. API playground support (optional)

- copyable curl
- sample auth header
- endpoint metadata

**Why after modules:** docs engine is easier once real endpoints exist.

---

## Phase 9 — Observability and Audit

### 23. Usage logging

- request log capture
- async processing if needed
- project/API key association

### 24. Audit logs

- project created
- module enabled/disabled
- API key created/revoked
- member added/removed

### 25. Daily usage stats

- aggregation job
- per-project metrics

**Why now:** observability matters after working flows exist.

---

## Phase 10 — Auth Module for Project End-Users

Real app auth.

### 26. App-user auth module

- register
- login
- logout
- me
- password reset (later)

Authenticates `project_users`, not platform users.

**Why later:** by then you have users, projects, API keys, modules, and runtime structure in place.

---

## Best practical build order (checklist)

Execute in this sequence:

1. Shared foundation
2. Tenancy foundation
3. Core migrations
4. Module registry foundation
5. Projects domain
6. API keys domain
7. Project modules domain
8. Runtime middleware pipeline
9. Users module
10. Blog module
11. Media module
12. Settings module
13. Docs engine
14. Usage + audit
15. App-user auth module

That is the safest order.
