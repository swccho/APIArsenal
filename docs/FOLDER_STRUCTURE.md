# APIArsenal — Laravel Folder Structure Blueprint

## Goal

The folder structure must support:

- modular monolith architecture
- strict separation of platform core and feature modules
- project-based multi-tenancy
- thin controllers
- action-based business logic
- modular docs definitions
- modular seeders
- scalable testing structure

This structure should make it easy to understand:

- where to place new code
- how modules are organized
- how shared runtime logic is separated
- how platform logic differs from feature modules

---

## 1. High-Level Structure

Recommended root structure:

```
apiarsenal/
├── app/
├── bootstrap/
├── config/
├── database/
├── docs/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── .cursor/
└── composer.json
```

The important parts for architecture are: `app/`, `docs/`, `routes/`, `tests/`, `.cursor/`.

---

## 2. Recommended `app/` Structure

Use a domain-first structure.

```
app/
├── Domains/
├── Shared/
├── Providers/
└── Console/
```

- **Domains/** = all platform and module business code  
- **Shared/** = reusable cross-domain abstractions  
- **Providers/** = Laravel service providers / bootstrapping  
- **Console/** = commands and scheduling-related code  

---

## 3. Domains Structure

Inside `app/Domains`, split into **Platform** and **Modules**.

```
app/Domains/
├── Platform/
└── Modules/
```

This is the most important boundary in the codebase.

---

## 4. Platform Domain Structure

`Platform` contains the core system features that power APIArsenal itself.

```
app/Domains/Platform/
├── Users/
├── Projects/
├── ProjectMembers/
├── ApiKeys/
├── ModulesRegistry/
├── ProjectModules/
├── Usage/
├── Audit/
├── Documentation/
└── Tenancy/
```

These are platform capabilities, not app modules like Blog or Chat.

---

## 5. Example Structure for a Platform Domain

Each platform domain should follow a consistent internal shape.

**Example: Projects**

```
app/Domains/Platform/Projects/
├── Actions/
│   ├── CreateProjectAction.php
│   ├── UpdateProjectAction.php
│   ├── DeleteProjectAction.php
│   └── ListProjectsAction.php
├── Data/
│   └── ProjectData.php
├── Http/
│   ├── Controllers/
│   │   └── ProjectController.php
│   ├── Requests/
│   │   ├── StoreProjectRequest.php
│   │   └── UpdateProjectRequest.php
│   └── Resources/
│       └── ProjectResource.php
├── Models/
│   └── Project.php
├── Policies/
│   └── ProjectPolicy.php
├── Queries/
│   └── ProjectListQuery.php
└── Support/
    └── ProjectStatus.php
```

This pattern can be reused across other platform domains.

---

## 6. Modules Domain Structure

Feature modules live inside `app/Domains/Modules/`.

Recommended first modules:

```
app/Domains/Modules/
├── Auth/
├── Users/
├── Blog/
├── Media/
└── Settings/
```

Each module is self-contained.

---

## 7. Example Structure for a Module

**Example: Blog module**

```
app/Domains/Modules/Blog/
├── BlogModule.php
├── Actions/
│   ├── CreatePostAction.php
│   ├── UpdatePostAction.php
│   ├── DeletePostAction.php
│   ├── GetPostAction.php
│   ├── ListPostsAction.php
│   ├── CreateCategoryAction.php
│   └── CreateCommentAction.php
├── Data/
│   ├── PostData.php
│   └── CategoryData.php
├── Docs/
│   └── BlogDocs.php
├── Http/
│   ├── Controllers/
│   │   ├── PostController.php
│   │   ├── PostCategoryController.php
│   │   └── PostCommentController.php
│   ├── Requests/
│   │   ├── StorePostRequest.php
│   │   ├── UpdatePostRequest.php
│   │   ├── StorePostCategoryRequest.php
│   │   └── StorePostCommentRequest.php
│   └── Resources/
│       ├── PostResource.php
│       ├── PostCategoryResource.php
│       └── PostCommentResource.php
├── Models/
│   ├── Post.php
│   ├── PostCategory.php
│   ├── PostComment.php
│   ├── PostTag.php
│   └── PostTagItem.php
├── Policies/
│   └── PostPolicy.php
├── Queries/
│   └── PostListQuery.php
├── Routes/
│   └── api.php
├── Seeders/
│   └── BlogDemoSeeder.php
└── Support/
    ├── BlogPermissions.php
    └── BlogConfig.php
```

This is clean, scalable, and easy to follow.

---

## 8. Why This Structure Works

- **Clear ownership** — Everything related to Blog is in one place.  
- **Better AI generation** — New module files can be added without guessing.  
- **Better maintainability** — No need to search generic Laravel folders for related code.  
- **Easier onboarding** — The system is understandable much faster.

---

## 9. Shared Layer Structure

Use `app/Shared` for cross-domain reusable code that does not belong to one specific domain.

```
app/Shared/
├── Auth/
├── Contracts/
├── Data/
├── Docs/
├── Exceptions/
├── Http/
├── Models/
├── Pagination/
├── Responses/
├── Support/
└── Tenancy/
```

This layer should stay small and intentional.

---

## 10. What Goes in `app/Shared`

| Folder | Purpose | Examples |
|--------|---------|----------|
| **Contracts/** | Interfaces and contracts used across domains | `ArsenalModuleContract.php`, `DocsDefinitionContract.php` |
| **Models/** | Shared base models | `BaseModel.php`, `ProjectOwnedModel.php` |
| **Tenancy/** | Tenant resolution and project context | `CurrentProject.php`, `ProjectContext.php`, `ResolvesProjectFromApiKey.php` |
| **Responses/** | Standard API response builders | |
| **Docs/** | Shared docs engine support | |
| **Exceptions/** | Common exception classes | |
| **Data/** | Shared DTO-style data objects | |

---

## 11. Very Important Shared Base Classes

| Class | Path |
|-------|------|
| Base model | `app/Shared/Models/BaseModel.php` |
| Project-owned base model | `app/Shared/Models/ProjectOwnedModel.php` — centralizes tenant-aware behavior |
| Module contract | `app/Shared/Contracts/ArsenalModuleContract.php` |
| Base docs definition | `app/Shared/Docs/BaseModuleDocs.php` |

These shared primitives will help a lot.

---

## 12. Route Structure

Two route types: **platform/dashboard routes** and **public runtime API routes**.

```
routes/
├── web.php
├── api.php
├── platform.php
└── runtime.php
```

| File | Purpose |
|------|---------|
| **web.php** | Minimal web routes if needed |
| **api.php** | Central API entry or bootstrap |
| **platform.php** | Dashboard/platform API routes: projects, project members, API keys, module enablement, usage stats, docs metadata |
| **runtime.php** | Public project runtime API routes: `/posts`, `/auth/login`, `/media` |

---

## 13. Better Route Strategy for Modules

Each module should own its runtime route definitions.

- `app/Domains/Modules/Blog/Routes/api.php`
- `app/Domains/Modules/Auth/Routes/api.php`
- `app/Domains/Modules/Media/Routes/api.php`

A central provider loads them. This is better than one giant route file.

Platform domains can own route files if needed; for core dashboard routes, a central `routes/platform.php` is acceptable.

---

## 14. Service Providers Structure

```
app/Providers/
├── AppServiceProvider.php
├── AuthServiceProvider.php
├── EventServiceProvider.php
├── RouteServiceProvider.php
├── ModuleServiceProvider.php
└── TenancyServiceProvider.php
```

**Important providers:**

- **ModuleServiceProvider.php** — Registering available modules, booting module route loading, docs definitions, central module registration.  
- **TenancyServiceProvider.php** — Binding project context services, registering tenancy resolution helpers, booting tenant-aware shared behavior.

---

## 15. Database Folder Structure

```
database/
├── factories/
├── migrations/
├── seeders/
└── schemas/
```

Laravel uses the first three. Optionally add `schemas/` for architecture reference or raw schema exports.

---

## 16. Migration Organization Recommendation

Migrations live in one folder; naming must be very clear.

Example names:

```
2026_03_15_000001_create_projects_table.php
2026_03_15_000002_create_project_members_table.php
2026_03_15_000003_create_modules_table.php
2026_03_15_000004_create_project_modules_table.php
2026_03_15_000005_create_api_keys_table.php
2026_03_15_000100_create_project_users_table.php
2026_03_15_000101_create_posts_table.php
2026_03_15_000102_create_post_categories_table.php
```

Use clear names and keep creation order logical.

---

## 17. Seeder Structure

**Global seeders:** `database/seeders/` (e.g. `DatabaseSeeder.php`, `ModuleRegistrySeeder.php`).

**Module demo seeders** live inside each module:

- `app/Domains/Modules/Blog/Seeders/BlogDemoSeeder.php`
- `app/Domains/Modules/Media/Seeders/MediaDemoSeeder.php`

Demo seeding belongs to the module.

---

## 18. Factories Structure

Factories in Laravel’s normal place: `database/factories/`.

Recommended structure:

```
database/factories/
├── Platform/
│   ├── ProjectFactory.php
│   ├── ApiKeyFactory.php
│   └── ProjectMemberFactory.php
└── Modules/
    ├── Blog/
    │   ├── PostFactory.php
    │   ├── PostCategoryFactory.php
    │   └── PostCommentFactory.php
    ├── Media/
    │   └── MediaFileFactory.php
    └── Users/
        └── ProjectUserFactory.php
```

If Laravel tooling makes nested folders awkward, keep flat filenames with domain prefixes: `ProjectFactory.php`, `ProjectUserFactory.php`, `PostFactory.php`.

---

## 19. Testing Structure

Tests should mirror architecture.

```
tests/
├── Feature/
│   ├── Platform/
│   │   ├── Projects/
│   │   ├── ApiKeys/
│   │   ├── ProjectModules/
│   │   └── Usage/
│   └── Modules/
│       ├── Auth/
│       ├── Users/
│       ├── Blog/
│       ├── Media/
│       └── Settings/
├── Unit/
│   ├── Platform/
│   ├── Modules/
│   └── Shared/
├── Helpers/
└── TestCase.php
```

---

## 20. Example Test Layout

```
tests/Feature/Platform/Projects/CreateProjectTest.php
tests/Feature/Platform/ApiKeys/RevokeApiKeyTest.php
tests/Feature/Modules/Blog/CreatePostTest.php
tests/Feature/Modules/Blog/ListPostsTest.php
tests/Feature/Modules/Media/UploadMediaFileTest.php
tests/Unit/Shared/Tenancy/ProjectContextTest.php
```

---

## 21. Docs Folder Structure

Recommended:

```
docs/
├── ARCHITECTURE.md
├── SCHEMA_BLUEPRINT.md
├── MODULE_CONTRACT_BLUEPRINT.md
├── FOLDER_STRUCTURE.md
├── api-style.md
└── roadmap.md
```

This blueprint is saved as `docs/FOLDER_STRUCTURE.md`.

---

## 22. Cursor Folder Structure

Recommended:

```
.cursor/
├── rules/
│   ├── api-arsenal-architecture.mdc
│   ├── api-arsenal-backend.mdc
│   └── api-arsenal-testing-rules.mdc
└── commands/
    ├── create-module.md
    ├── create-platform-domain.md
    └── create-feature-test.md
```

---

## 23. Suggested `app/` Tree Snapshot

```
app/
├── Console/
├── Domains/
│   ├── Platform/
│   │   ├── ApiKeys/
│   │   ├── Audit/
│   │   ├── Documentation/
│   │   ├── ModulesRegistry/
│   │   ├── ProjectMembers/
│   │   ├── ProjectModules/
│   │   ├── Projects/
│   │   ├── Tenancy/
│   │   ├── Usage/
│   │   └── Users/
│   └── Modules/
│       ├── Auth/
│       ├── Blog/
│       ├── Media/
│       ├── Settings/
│       └── Users/
├── Providers/
│   ├── AppServiceProvider.php
│   ├── ModuleServiceProvider.php
│   └── TenancyServiceProvider.php
└── Shared/
    ├── Auth/
    ├── Contracts/
    ├── Data/
    ├── Docs/
    ├── Exceptions/
    ├── Http/
    ├── Models/
    ├── Pagination/
    ├── Responses/
    ├── Support/
    └── Tenancy/
```

---

## 24. File Placement Rules

| Type | Must go under |
|------|----------------|
| **Platform logic** | `app/Domains/Platform/` |
| **Feature module logic** | `app/Domains/Modules/` |
| **Shared reusable abstractions** | `app/Shared/` |

**Never dump domain logic into default Laravel generic folders.**

Avoid:

- `app/Models` for everything  
- `app/Http/Controllers` for everything  
- `app/Services` as a giant junk drawer  
- `app/Helpers`  

Those structures become messy quickly.

---

## 25. Recommended Save Locations for Architecture Docs

| Doc | Path |
|-----|------|
| Architecture | `docs/ARCHITECTURE.md` |
| Database schema | `docs/SCHEMA_BLUEPRINT.md` |
| Module contract | `docs/MODULE_CONTRACT_BLUEPRINT.md` |
| Folder structure | `docs/FOLDER_STRUCTURE.md` |

This gives a full architecture reference set.

---

## 26. Strong Recommendation for Cursor Prompting

When asking Cursor to create anything important, include references like:

```
Follow:
- docs/FOLDER_STRUCTURE.md
- docs/MODULE_CONTRACT_BLUEPRINT.md
- docs/SCHEMA_BLUEPRINT.md
- .cursor/rules/api-arsenal-architecture.mdc
- .cursor/rules/api-arsenal-backend.mdc
- .cursor/rules/api-arsenal-testing-rules.mdc
```

That dramatically improves consistency.

---

## 27. Final Recommendation

For APIArsenal, the best Laravel structure is:

- **domain-first**
- split into **Platform** and **Modules**
- use **Shared** only for true cross-domain abstractions
- keep routes modular
- keep module docs and seeders inside modules
- mirror architecture in tests

This is the cleanest structure for both humans and Cursor.

---

## Best Next Step

With rules, database schema, module contract, and folder structure in place, the best next step is:

### **API Route Map Blueprint**

That should define:

- platform routes
- runtime routes
- auth flow
- module route groups
- naming conventions
- versioning conventions

That will make actual implementation much easier.
