# APIArsenal — Module Contract Blueprint

## Overview

In APIArsenal, a **module** is a self-contained backend feature package that can be enabled per project.

Examples: Auth, Users, Blog, Media, Settings, Orders, Chat.

A module is not just a route group. It must include everything needed to support its feature set in a clean and reusable way.

Each module should define:

- identity and metadata
- dependencies
- API routes
- requests and validation
- business actions
- resources / response transformers
- policies / authorization rules where needed
- docs definitions
- demo seeders
- enablement rules

The goal is to make every module follow the same internal contract so new modules can be built consistently.

---

## 1. Module Design Principles

### 1.1 Every module must be self-contained

A module should own its own: models, actions, requests, controllers, resources, policies, docs metadata, seeders. It should be easy to locate and understand in one place.

### 1.2 Every module must follow the same pattern

Do not invent a custom structure for each module. Blog and Media should follow the same architectural pattern. Consistency is mandatory.

### 1.3 Modules are enabled per project

A module is not globally “on” for all projects. It becomes available only when:

- it exists in the system registry
- it is enabled for a specific project
- dependencies are satisfied

### 1.4 Modules should be loosely coupled

Modules should not tightly depend on each other unless necessary. If a dependency exists, it must be explicit and registered.

- **Bad:** Blog module silently assuming another module is installed  
- **Good:** Blog module declares required dependencies clearly

### 1.5 Modules must be safe for multi-tenancy

Every project-owned record inside a module must be scoped by `project_id`. No module may bypass tenancy boundaries.

---

## 2. Module Responsibilities

Each module must be responsible for its own feature behavior.

**A module may define:**

- **Functional:** CRUD APIs, validation rules, entity rules, business workflows  
- **Technical:** route registration, docs metadata, demo data generation, authorization behavior, installability rules  

**A module should not be responsible for:**

- dashboard users, project ownership, API key lifecycle, module registry storage  

Those belong to platform core.

---

## 3. Module Categories

For organization and dashboard, modules belong to categories (metadata only).

| Category        | Examples |
|-----------------|----------|
| **Foundation**  | Auth, Users, Roles, Media, Settings, Notifications |
| **Content**     | Blog, Pages, Categories, Tags, Comments |
| **Business**    | Products, Orders, Customers, Bookings, Invoices |
| **Communication** | Chat, Conversations, Messages, Announcements |

---

## 4. Module Metadata Contract

Every module must expose a standard metadata definition.

**At minimum, declare:**

- key, name, description, category, version  
- enabled status globally  
- dependencies  
- whether it supports demo data  
- whether it exposes public API routes  
- whether it exposes docs entries  

Conceptual example:

```php
final class BlogModuleDefinition
{
    public function key(): string
    {
        return 'blog';
    }

    public function name(): string
    {
        return 'Blog';
    }

    public function description(): string
    {
        return 'Posts, categories, tags, and comments APIs.';
    }

    public function category(): string
    {
        return 'content';
    }

    public function version(): string
    {
        return '1.0.0';
    }

    public function dependencies(): array
    {
        return ['auth', 'users'];
    }

    public function supportsDemoData(): bool
    {
        return true;
    }
}
```

---

## 5. Recommended Module Interface

Every module should implement a shared contract. Conceptual interface:

```php
interface ArsenalModuleContract
{
    public function key(): string;
    public function name(): string;
    public function description(): string;
    public function category(): string;
    public function version(): string;
    public function dependencies(): array;
    public function register(): void;
    public function boot(): void;
    public function routes(): array;
    public function docs(): array;
    public function supportsDemoData(): bool;
    public function seedDemoData(Project $project): void;
}
```

Implementation may vary, but these responsibilities are required.

---

## 6. Recommended Folder Structure Per Module

Every module lives in a dedicated domain folder.

```
app/Domains/Modules/Blog/
  BlogModule.php
  Config/
  Models/
    Post.php
    PostCategory.php
    PostComment.php
    PostTag.php
    PostTagItem.php
  Actions/
    CreatePostAction.php
    UpdatePostAction.php
    DeletePostAction.php
    ListPostsAction.php
    GetPostAction.php
  Http/
    Controllers/
      PostController.php
      PostCategoryController.php
      PostCommentController.php
    Requests/
      StorePostRequest.php
      UpdatePostRequest.php
      StorePostCategoryRequest.php
      StorePostCommentRequest.php
    Resources/
      PostResource.php
      PostCategoryResource.php
      PostCommentResource.php
  Policies/
    PostPolicy.php
  Docs/
    BlogDocs.php
  Seeders/
    BlogDemoSeeder.php
  Support/
    BlogPermissions.php
    BlogRouteRegistrar.php
```

Everything the module owns stays in one place.

---

## 7. Required Parts of Every Module

Unless explicitly unnecessary, every module must contain:

| Part | Description | Example |
|------|-------------|---------|
| **7.1 Module definition class** | Entry point; metadata and registration | `BlogModule.php` |
| **7.2 Models** | All module-owned entities | Post, PostCategory, PostComment, PostTag, PostTagItem |
| **7.3 Actions** | Business logic; controllers must not own it | CreatePostAction, UpdatePostAction, ListPostsAction |
| **7.4 Requests** | Validation in dedicated classes | StorePostRequest, UpdatePostRequest |
| **7.5 Controllers** | Thin; orchestrate request → action → resource | PostController, PostCategoryController |
| **7.6 Resources** | Intentional response shape; never raw models | PostResource, PostCategoryResource |
| **7.7 Docs definitions** | API docs metadata for the module | BlogDocs |
| **7.8 Seeder** | If demo data supported, project-aware seeder | BlogDemoSeeder |
| **7.9 Policies / authorization** | Internal permission rules when needed | PostPolicy |

---

## 8. Optional Module Parts

Allowed when justified: events, listeners, jobs, services, enums, value objects, DTOs, config classes, query objects. Do not add by default unless needed.

---

## 9. Module Registration Lifecycle

### 9.1 Global registration

On application boot, all available modules are registered in the platform module registry. The system knows: what modules exist, their metadata, dependencies, and whether they are globally active. This is not project enablement.

### 9.2 Project enablement

When a user enables a module for a project:

1. Verify the module exists  
2. Verify module is globally active  
3. Verify dependencies  
4. Auto-enable dependencies if allowed  
5. Create or update `project_modules` row  
6. Store config if needed  
7. Expose module docs for that project  
8. Optionally run demo seeding  

### 9.3 Runtime availability

At request time, a module is only usable if it is enabled for the active project. If not enabled:

- Return **404 Not Found** for unavailable module endpoints, or  
- Return a module-disabled error from central middleware  

For API cleanliness, **404** is often preferable.

---

## 10. Module Dependency Rules

- **10.1** Dependencies must be explicit (declared in module metadata).  
- **10.2** Dependencies should be minimal; avoid unnecessary chains.  
- **10.3** Auto-enable dependencies when safe (e.g. user enables Blog → system enables Users).  
- **10.4** Circular dependencies are forbidden.

---

## 11. Route Registration Contract

- Each module has a dedicated route registrar or route file.  
- Routes are registered centrally during boot.  
- Runtime access still depends on project enablement.

Example locations:

- `app/Domains/Modules/Blog/routes/api.php`  
- `app/Domains/Modules/Blog/Support/BlogRouteRegistrar.php`  

Example route design:

```php
Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::post('/', [PostController::class, 'store']);
    Route::get('/{post}', [PostController::class, 'show']);
    Route::put('/{post}', [PostController::class, 'update']);
    Route::delete('/{post}', [PostController::class, 'destroy']);
});
```

The route registrar should be module-owned.

---

## 12. Module Middleware Rules

Every module route should automatically pass through shared runtime middleware:

- API key auth  
- project context resolution  
- module enabled check  
- rate limiting  
- logging  

Module-specific middleware can be added if needed. Core runtime security must be centralized; do not let each module reinvent it.

---

## 13. Docs Contract

Each module must define documentation metadata for its endpoints.

**Include:** endpoint method, path, summary, description, authentication requirement, request/response payload schema, examples, error examples if relevant.

Location example: `app/Domains/Modules/Blog/Docs/BlogDocs.php` — class returns structured endpoint metadata for the central docs engine.

Conceptual structure:

```php
return [
    [
        'method' => 'GET',
        'path' => '/posts',
        'summary' => 'List posts',
        'auth' => true,
    ],
    [
        'method' => 'POST',
        'path' => '/posts',
        'summary' => 'Create a post',
        'auth' => true,
    ],
];
```

---

## 14. Seeder Contract

If a module supports demo data, it must provide a project-aware seeder.

- **14.1** Seeder receives project context; demo data is only for that project.  
- **14.2** Seeder must be idempotent or safely guarded (avoid accidental duplicate data).  
- **14.3** Seeder should create realistic sample data (e.g. categories, posts, comments, tags for Blog).

Example: `app/Domains/Modules/Blog/Seeders/BlogDemoSeeder.php`

---

## 15. Authorization Contract

- Keep policies inside the module.  
- Keep business authorization close to the actions it protects.  
- Do not scatter authorization logic across controllers.  
- Structure should support more advanced module permissions later.

---

## 16. Configuration Contract

Some modules may support configuration (e.g. Blog comments on/off, Media max file size).

For MVP: keep configuration simple; store project-specific config in `project_modules.config_json`; avoid overly dynamic behavior. Configuration is optional, not required for every module.

---

## 17. Model Rules Inside Modules

All project-owned module models must:

- include `project_id`  
- inherit from a project-owned base model if used  
- respect central tenant scoping  
- avoid hidden unsafe query behavior  

Recommended base: `app/Domains/Shared/Models/ProjectOwnedModel.php`  
Example: `Post extends ProjectOwnedModel`, `MediaFile extends ProjectOwnedModel`.

---

## 18. Query Rules Inside Modules

Modules must never query project-owned data without active project scoping.

- **Bad:** `Post::query()->latest()->paginate();`  
- **Good:** Query through a tenant-scoped base model or project-aware query layer.

Assume tenant safety first.

---

## 19. Action Rules Inside Modules

Actions are the primary location for business workflows (e.g. CreatePostAction, UpdatePostAction, PublishPostAction, ListPostsAction).

- **19.1** One action, one purpose; avoid giant workflow classes unless needed.  
- **19.2** Actions receive clear inputs (validated data, explicit dependencies).  
- **19.3** Actions do not return raw uncontrolled data; prefer models or DTO-like results that resources can transform safely.

---

## 20. Controller Rules Inside Modules

Controllers must remain thin.

- **Good:** Receive validated request → call action → return resource.  
- **Bad:** Business logic, complex branching, inline validation arrays, raw query construction.

---

## 21. Resource Rules Inside Modules

Every module defines API resources for public output (e.g. PostResource, PostCategoryResource, MediaFileResource). This ensures consistent output shape, field-level control, safe exposure, and future flexibility.

---

## 22. Events and Jobs

Modules may emit events or queue jobs (e.g. media processing, usage analytics, notifications).

- Use jobs for heavy or non-critical work.  
- Do not use events for hidden, hard-to-trace business logic.  
- Keep behavior explicit; do not overuse event-driven patterns for simple workflows.

---

## 23. Module Install / Enable Action Blueprint

A clean action should exist for module enablement (e.g. `EnableProjectModuleAction`).

Responsibilities:

1. Validate module exists  
2. Validate project exists  
3. Check if already enabled  
4. Resolve dependencies  
5. Create/update `project_modules` record  
6. Save configuration  
7. Run seeder if requested  
8. Record audit log  
9. Return enablement result  

This logic belongs in platform core, not in random controllers.

---

## 24. Module Disable Rules

Disabling is more dangerous than enabling.

**Recommended MVP behavior:** A disabled module becomes inaccessible; existing data remains; docs are hidden; routes return unavailable. **Do not** delete module data automatically on disable — that is too risky.

---

## 25. Versioning Rules

Each module should expose a version string (e.g. `1.0.0`). This helps when modules evolve, behavior changes, docs differ by version, and migrations become more complex. Include version from the start.

---

## 26. Recommended Module Base Classes

Optional shared abstractions:

- **Base module definition:** `app/Domains/Modules/Support/BaseModule.php`  
- **Base project-owned model:** `app/Domains/Shared/Models/ProjectOwnedModel.php`  
- **Base docs definition:** `app/Domains/Shared/Docs/BaseModuleDocs.php`  

Use base classes only where they clearly reduce duplication without hiding too much behavior.

---

## 27. Example: Blog Module Contract Summary

| Area | Items |
|------|--------|
| **Metadata** | key: blog, name: Blog, category: content, version: 1.0.0, dependencies: users, auth, supports demo data: true |
| **Models** | Post, PostCategory, PostComment, PostTag, PostTagItem |
| **Actions** | CreatePostAction, UpdatePostAction, DeletePostAction, ListPostsAction, GetPostAction |
| **Requests** | StorePostRequest, UpdatePostRequest, StorePostCategoryRequest, StorePostCommentRequest |
| **Controllers** | PostController, PostCategoryController, PostCommentController |
| **Resources** | PostResource, PostCategoryResource, PostCommentResource |
| **Docs** | BlogDocs |
| **Seeder** | BlogDemoSeeder |

This is the consistency APIArsenal requires for every module.

---

## 28. Definition of Done for a New Module

A module is complete only when it has:

- metadata definition  
- declared dependencies  
- models  
- actions  
- requests  
- controllers  
- resources  
- routes  
- docs definitions  
- seed support if applicable  
- tenant-safe data handling  
- tests for endpoint behavior and project isolation  

If any of these are missing, the module is incomplete.

---

## 29. Final Recommendation

- **Platform core** manages projects, API keys, module enablement, docs composition.  
- **Modules** manage their own entities and APIs.  
- **Every module follows the same contract.**  
- **Every module is project-aware.**  
- **Tenant safety is enforced centrally.**

This makes adding new modules fast, predictable, and clean.

---

## Next Step

Define the **Laravel Folder Structure Blueprint** for the full project structure:

- platform core  
- shared runtime  
- modules  
- actions  
- docs  
- seeders  
- route registration  
- tests  

That will turn the architecture into a build-ready skeleton.
