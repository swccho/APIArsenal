# APIArsenal — Architecture

For APIArsenal, architecture is everything. Because this is a **real backend platform**, the architecture must be:

* modular
* secure
* tenant-aware
* easy to extend
* easy to document
* fast to ship as MVP

The best approach is to design APIArsenal as a **multi-tenant modular API platform** with a **shared core** and **project-scoped data**.

---

# Architecture in 8 Core Parts

1. Platform architecture style
2. Tenant model
3. Module architecture
4. Request lifecycle
5. Data architecture
6. API structure
7. Dashboard architecture
8. Scaling path

---

# 1. Platform Architecture Style

The best MVP architecture is:

## Shared platform + project-scoped modules

That means:

* one main backend codebase
* one dashboard
* one central module registry
* all project data scoped by `project_id`

This is much better than generating a separate Laravel app for every project.

## Why this is the right choice

Per-project isolated apps would create huge complexity:

* deployment overhead
* database management overhead
* versioning problems
* difficult updates
* higher hosting costs

For MVP, shared-core multi-tenancy is the smartest choice.

---

# 2. Tenant Model

In APIArsenal, the **tenant** is the **project**.

Not "company" or "workspace" first. The actual isolation unit is:

## Project = tenant

**Examples:**

* Project A → Blog App
* Project B → Restaurant App
* Project C → CRM App

Every API request belongs to one project.

Every record in project-owned tables must include:

* `project_id`

This is the foundation of isolation.

---

# 3. High-Level System Design

Think of the platform in **4 layers**.

## Layer 1 — Platform Core

Manages:

* users
* authentication
* projects
* project members
* billing (later)
* API keys
* usage logs
* module registry

## Layer 2 — Module Engine

Manages:

* available modules
* module installation
* module activation
* module config
* route registration
* schema definitions
* documentation definitions

## Layer 3 — API Runtime

Handles:

* project identification
* API key auth
* permission checks
* request validation
* controller execution
* project scoping
* response formatting

## Layer 4 — Dashboard / Docs

Handles:

* onboarding
* project management
* module management
* API docs
* usage stats
* API playground

---

# 4. Recommended Backend Structure

Because you're comfortable with Laravel, the cleanest approach is a **modular monolith**.

That means:

* one Laravel app
* separated by domains/modules internally
* strong boundaries between platform core and business modules

This is better than microservices for v1.

## Why modular monolith is right

You get:

* faster development
* easier deployment
* shared authentication
* simpler debugging
* clean upgrade path

Microservices would be overkill right now.

---

# 5. Suggested Laravel Domain Structure

A clean structure could look like this:

```
app/
  Core/
    Auth/
    Projects/
    ApiKeys/
    Tenancy/
    Modules/
    Usage/
    Shared/
  Modules/
    AuthModule/
    UsersModule/
    BlogModule/
    MediaModule/
    SettingsModule/
  Http/
  Support/
routes/
config/
database/
```

A better long-term structure is even more domain-driven:

```
app/
  Domains/
    Platform/
      User/
      Project/
      ProjectMember/
      ApiKey/
      Module/
      UsageLog/
    Runtime/
      Tenancy/
      RequestContext/
      Documentation/
      Permissions/
    Modules/
      Auth/
      Users/
      Blog/
      Media/
      Settings/
```

This keeps the platform clean.

---

# 6. Platform Core Architecture

The platform core should own these entities:

| Entity | Purpose |
|--------|---------|
| **Users** | People who log into APIArsenal dashboard |
| **Projects** | Tenant containers for backend environments |
| **Project Members** | Users who can access a project |
| **Module Registry** | List of all available modules in the platform |
| **Project Modules** | Tracks which modules are enabled per project |
| **API Keys** | Credentials used by external apps |
| **Usage Logs** | Tracks calls, errors, metrics |
| **Docs Registry** | Generates docs based on enabled modules |

---

# 7. Core Database Schema

## users

```
id
name
email
password
created_at
updated_at
```

## projects

```
id
owner_id
name
slug
description
status
created_at
updated_at
```

## project_members

```
id
project_id
user_id
role
created_at
updated_at
```

## modules

```
id
key
name
category
version
description
is_active
created_at
updated_at
```

## project_modules

```
id
project_id
module_id
status
installed_at
config_json
created_at
updated_at
```

## api_keys

```
id
project_id
name
key_prefix
key_hash
last_used_at
revoked_at
created_at
updated_at
```

## usage_logs

```
id
project_id
api_key_id
method
path
status_code
response_time_ms
ip_address
created_at
```

---

# 8. Module Architecture

This is the heart of APIArsenal.

A module should not just be "some routes." A module should be a **self-contained feature package**.

Each module should define:

* metadata
* database entities
* API routes
* validation rules
* permissions
* documentation
* seeders
* optional config

## Example: Blog module

It contains:

* posts
* categories
* tags
* comments

And internally defines:

* models
* migrations/schema
* controllers/actions
* policies
* docs
* seed data

---

# 9. Module Contract Design

Every module should follow a standard contract.

Conceptually, each module should be able to answer:

* What is your key?
* What routes do you provide?
* What tables/entities do you use?
* What permissions do you require?
* What docs do you expose?
* Can you seed demo data?
* Are you enabled for this project?

## Module interface idea

```php
interface ArsenalModule
{
    public function key(): string;
    public function name(): string;
    public function version(): string;
    public function registerRoutes(): void;
    public function registerPermissions(): array;
    public function registerDocumentation(): array;
    public function seedDemoData(Project $project): void;
}
```

Not exact code yet, but this is the idea.

---

# 10. Fixed vs Dynamic Schema

This is one of the biggest design decisions.

## Recommended MVP approach: fixed shared tables

Use **fixed shared tables** for each module.

**Example:** Blog module always has:

* posts
* categories
* tags
* comments

Every row includes `project_id`.

This is much simpler than dynamically creating tables per project.

## Why fixed shared tables are best now

Dynamic table generation adds:

* migration complexity
* runtime schema management
* difficult rollbacks
* upgrade headaches
* more bugs

For MVP, module activation should mean:

* feature becomes available for the project
* rows for that project can now exist
* routes/docs become available

**Not** "create physical tables per project."

---

# 11. Module Enablement Flow

When a user enables a module, the system should:

1. Verify dependencies
2. Mark module enabled in `project_modules`
3. Store module config
4. Expose module routes for that project
5. Register docs for that project
6. Optionally seed demo data

**Example:** Blog depends on Users (maybe optional), Auth (recommended).

If missing dependencies exist, system should either:

* auto-enable them, or
* block with clear message

For MVP, **auto-enable required dependencies** is nicer.

---

# 12. Request Lifecycle

A clean request lifecycle is critical.

## Example external API request

```http
GET /v1/posts
Authorization: Bearer ars_live_xxx
```

### Step 1 — Read API key

Extract bearer token.

### Step 2 — Resolve API key

Find matching hashed key in `api_keys`.

### Step 3 — Resolve project

Get `project_id` from the API key.

### Step 4 — Build request context

Attach project context to request.

**Request context includes:**

* current project
* current API key
* enabled modules
* permission scope

### Step 5 — Check module access

If Blog module is not enabled for this project, return 404 or module unavailable.

### Step 6 — Validate request

Apply request rules.

### Step 7 — Run business logic

Fetch only rows belonging to `project_id`.

### Step 8 — Return normalized response

Structured JSON.

### Step 9 — Log usage

Store request metrics asynchronously.

---

# 13. Tenancy Enforcement

This is security-critical.

Every module query must be project-scoped automatically. You do **not** want developers to remember this manually every time.

## Central tenancy layer

When request context is resolved, the application should automatically scope module queries to current project.

### Possible strategies

**A. Global scopes** — Every project-owned model has a global scope for `project_id`.

**B. Repository / query builders** — All module data access goes through project-aware repositories.

**C. Request context + base model** — Use a shared base model for project-owned entities.

## Best MVP balance: base model + global scope + explicit creation helpers

**Example concept:**

* `ProjectOwnedModel`
* Automatically filters by active project
* Automatically sets `project_id` on create

This will reduce mistakes a lot.

---

# 14. Module Table Types

There are **3 types** of tables in the system.

## A. Platform tables

Not tenant-scoped.

**Examples:** users, modules, system configs

## B. Project-owned tables

Must have `project_id`.

**Examples:** posts, comments, media, settings, messages

## C. Relationship tables

May also need `project_id` depending on design.

**Examples:** post_tags, conversation_members

**Rule:** If data belongs to a project, include `project_id`. Even if a relation could be inferred indirectly, explicit `project_id` often makes scoping and indexing easier.

---

# 15. API Route Design

Keep route structure very simple.

## Best route format

```
/api/v1/auth/register
/api/v1/auth/login
/api/v1/users
/api/v1/posts
/api/v1/categories
/api/v1/media
```

**Do not** put `project_id` in the URL if API key already determines project. That would be redundant and less elegant.

The API key should define the tenant context.

---

# 16. Dashboard vs Runtime Separation

You have two applications in one product.

## A. Dashboard app

For platform users. Needs:

* session auth
* project management
* module management
* docs
* analytics

## B. Public API runtime

For external apps. Needs:

* API key auth
* fast request handling
* tenant scoping
* usage logging

These should share the same codebase, but be logically separated.

**Example route groups:**

```
/routes/web.php
/routes/api.php
/routes/platform.php
/routes/runtime.php
```

Or by module route providers.

---

# 17. Documentation Architecture

Docs should also be modular.

Each module should contribute docs definitions.

**Example:** Blog module provides docs for GET /posts, POST /posts, GET /posts/{id}.

Then project docs page composes documentation from all enabled modules.

## Docs registry idea

Each module returns endpoint metadata like:

* method
* path
* summary
* request schema
* response schema
* auth required
* sample payloads

Then the docs UI renders this automatically.

This is much better than manually writing docs for every project.

---

# 18. Seeder Architecture

Seeders are very important for developer experience.

Each module should optionally provide:

* empty mode
* demo mode

**Example — Blog demo seeding:**

Creates: 5 categories, 10 posts, 20 comments — always for one specific project only.

Module seeders must accept project context.

---

# 19. Permissions Architecture

There are **two permission layers**.

## Platform permissions

Who can manage a project in dashboard.

**Examples:** owner, admin, developer, viewer

## Module/API permissions

Who can do actions inside the backend data.

For MVP, external apps using API key can likely get full project access.

Later you can add:

* scoped API keys
* read-only keys
* endpoint-specific scopes

Do not overbuild this in v1.

---

# 20. Media / File Architecture

Media should be its own module.

**Metadata in DB:**

```
id
project_id
disk
path
filename
mime_type
size
uploaded_by
created_at
```

Actual files can live in:

* local for dev
* S3-compatible storage in production

This keeps storage clean and scalable.

---

# 21. Caching and Queues

Use Redis for:

* usage log processing
* analytics aggregation
* heavy seed jobs (later)
* file processing (later)
* rate limit counters

For MVP, keep API requests mostly synchronous, but offload non-critical work.

**Good candidates for queues:**

* usage logging
* seed generation
* image processing
* webhook delivery (later)

---

# 22. Usage Tracking Architecture

You need two levels of tracking.

## Raw request logs

Every API call. Useful for debugging, analytics, billing (later).

## Aggregated metrics

Daily/hourly counts per project. Useful for dashboard charts, limits, alerts.

**Best approach:**

* write raw logs asynchronously
* aggregate with scheduled jobs

---

# 23. Failure Isolation

One module should not break the whole platform.

Modules should be loosely coupled.

**Example:** If Chat module has a bug, Blog module should still work.

This means:

* no random cross-module hard dependencies
* clear contracts
* shared services only where necessary
* dependency graph managed centrally

---

# 24. Recommended MVP Modules Architecture

Start with these modules:

| Module | Endpoints |
|--------|-----------|
| **Auth** | register, login, logout, me, forgot password, reset password |
| **Users** | list users, get user, update user profile |
| **Blog** | posts CRUD, categories CRUD, comments CRUD, tags (maybe later) |
| **Media** | upload file, list files, delete file |
| **Settings** | list settings, update settings |

This set is strong enough.

---

# 25. Suggested Folder Shape for Modules

A clean per-module folder could look like:

```
app/Domains/Modules/Blog/
  Models/
    Post.php
    Category.php
    Comment.php
  Actions/
    CreatePost.php
    UpdatePost.php
    DeletePost.php
    ListPosts.php
  Http/
    Controllers/
    Requests/
    Resources/
  Policies/
  Docs/
  Seeders/
  Providers/
```

This is much better than dumping everything into generic Laravel folders.

---

# 26. Internal Code Style Recommendation

Use **actions/use-cases** instead of fat controllers.

Controllers should be thin:

* validate
* call action
* return resource

**Examples:**

* `CreatePostAction`
* `ListPostsAction`
* `UpdateProjectModuleAction`

This will help a lot as the platform grows.

---

# 27. API Response Standard

Keep a consistent response format.

## Success list

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 15,
    "total": 100
  }
}
```

## Success item

```json
{
  "data": {
    "id": 1,
    "title": "Hello"
  }
}
```

## Error

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The given data was invalid.",
    "fields": {
      "title": ["The title field is required."]
    }
  }
}
```

This consistency matters a lot.

---

# 28. Security Rules

These are non-negotiable.

## Must-have rules

* Hash API keys in DB
* Never store raw keys after creation
* Always resolve project from key
* All project-owned queries must be tenant-scoped
* Rate limit by API key/project
* Revoke compromised keys
* Audit module enable/disable actions
* Validate all file uploads
* Sanitize unsafe content where needed

One tenancy bug could expose other users' data. This is essential.

---

# 29. Scaling Path

This architecture scales gradually.

## MVP

* single Laravel app
* shared DB
* Redis
* queue workers

## Growth stage

* read replicas
* separate queue workers
* separate docs/dashboard frontend
* object storage
* analytics pipeline

## Later

* split heavy modules into services if necessary
* introduce dedicated search
* event-driven integrations

This architecture does not box you in.

---

# 30. Final Recommended Architecture

## Best architecture for APIArsenal v1

**A modular monolith built with Laravel, using project-based multi-tenancy, fixed shared module tables, API-key-based runtime authentication, and a central module registry that activates routes, docs, and seeders per project.**

That is the right answer for MVP.

---

# Recommended Next Design Steps

The next best step is one of these:

| Option | Description |
|--------|-------------|
| **1. Database schema blueprint** | Define all core tables and first module tables |
| **2. Module contract blueprint** | Define exactly how modules register routes, docs, seeders, and permissions |
| **3. Folder structure blueprint** | Design the actual Laravel project structure in detail |

**Best next step:** **Database schema blueprint**, because everything else will depend on it.
