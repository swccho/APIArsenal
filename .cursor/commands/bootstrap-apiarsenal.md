# Bootstrap APIArsenal Backend Skeleton

Bootstrap the initial backend architecture for APIArsenal.

**Follow strictly:**

- .cursor/system/apiarsenal-brain.md
- docs/folder-structure.md
- docs/database-schema.md
- docs/module-contract.md
- .cursor/rules/apiarsenal-architecture-rules.mdc
- .cursor/rules/apiarsenal-backend-rules.mdc
- .cursor/rules/apiarsenal-testing-rules.mdc

APIArsenal is a modular multi-tenant backend platform built as a Laravel modular monolith.

The goal of this command is to generate the **initial project skeleton only**, with clean architecture and correct file placement.

- Do not add unnecessary business features beyond the requested skeleton.
- Do not dump code into generic Laravel folders.
- Do not skip tenancy-safe structure.

---

## 1. Create the Core Folder Structure

Ensure the following structure exists and is used correctly:

```
app/
  Domains/
    Platform/
      Users/
      Projects/
      ProjectMembers/
      ApiKeys/
      ModulesRegistry/
      ProjectModules/
      Usage/
      Audit/
      Documentation/
      Tenancy/
    Modules/
      Auth/
      Users/
      Blog/
      Media/
      Settings/
  Shared/
    Auth/
    Contracts/
    Data/
    Docs/
    Exceptions/
    Http/
    Models/
    Pagination/
    Responses/
    Support/
    Tenancy/
  Providers/
```

Create missing directories if necessary.

---

## 2. Create Shared Foundation Classes

Create the following shared base classes and contracts:

### Shared Models
- app/Shared/Models/BaseModel.php
- app/Shared/Models/ProjectOwnedModel.php

### Shared Contracts
- app/Shared/Contracts/ArsenalModuleContract.php
- app/Shared/Contracts/DocsDefinitionContract.php

### Shared Tenancy
- app/Shared/Tenancy/CurrentProject.php
- app/Shared/Tenancy/ProjectContext.php
- app/Shared/Tenancy/ResolvesProjectFromApiKey.php

### Shared Docs
- app/Shared/Docs/BaseModuleDocs.php

### Shared Responses
- app/Shared/Responses/ApiSuccessResponse.php
- app/Shared/Responses/ApiErrorResponse.php

These should be minimal but production-quality. ProjectOwnedModel must be prepared for project-based tenant scoping.

---

## 3. Create Service Providers

Create and wire the following providers if missing:

- app/Providers/ModuleServiceProvider.php
- app/Providers/TenancyServiceProvider.php

**Responsibilities:**

### ModuleServiceProvider
- register available modules
- prepare module route registration
- prepare module docs registration

### TenancyServiceProvider
- bind project context services
- prepare project resolution from API key
- centralize tenant-related bootstrapping

Keep implementation clean and extensible.

---

## 4. Create Platform Domain Skeletons

Create skeletons for these platform domains:

- Users
- Projects
- ProjectMembers
- ApiKeys
- ModulesRegistry
- ProjectModules
- Usage
- Audit
- Documentation
- Tenancy

For each relevant platform domain, create a clean internal structure such as:

- Models/
- Actions/
- Http/Controllers/
- Http/Requests/
- Http/Resources/
- Policies/ when needed
- Queries/ when needed
- Support/ when needed

**At minimum, create meaningful starter files for these domains:**

### Projects
- Model
- CreateProjectAction
- ProjectController
- StoreProjectRequest
- ProjectResource

### ApiKeys
- Model
- CreateApiKeyAction
- RevokeApiKeyAction
- ApiKeyController
- ApiKeyResource

### ProjectModules
- Model
- EnableProjectModuleAction
- DisableProjectModuleAction
- ProjectModuleController
- ProjectModuleResource

### ModulesRegistry
- Module model or registry representation
- module lookup support class

### Tenancy
- support service or action for resolving project from runtime auth context

Keep controllers thin. Business logic must live in actions.

---

## 5. Create Initial Feature Module Skeletons

Create the first module skeletons inside:

```
app/Domains/Modules/
```

**Modules:** Auth, Users, Blog, Media, Settings

Each module must follow the module contract structure and include appropriate starter files.

**At minimum:**

### Auth Module
- AuthModule.php
- Http/Controllers/
- Http/Requests/
- Http/Resources/
- Routes/api.php
- Docs/AuthDocs.php

### Users Module
- UsersModule.php
- Models/ProjectUser.php
- Actions/
- Http/
- Routes/api.php
- Docs/UsersDocs.php

### Blog Module
- BlogModule.php
- Models/Post.php, PostCategory.php, PostComment.php, PostTag.php, PostTagItem.php
- Actions/
- Http/
- Routes/api.php
- Docs/BlogDocs.php
- Seeders/BlogDemoSeeder.php

### Media Module
- MediaModule.php
- Models/MediaFile.php
- Actions/
- Http/
- Routes/api.php
- Docs/MediaDocs.php

### Settings Module
- SettingsModule.php
- Models/ProjectSetting.php
- Actions/
- Http/
- Routes/api.php
- Docs/SettingsDocs.php

Keep files minimal but structurally correct.

---

## 6. Create Runtime Route Strategy

Create runtime route files for each module:

- app/Domains/Modules/Auth/Routes/api.php
- app/Domains/Modules/Users/Routes/api.php
- app/Domains/Modules/Blog/Routes/api.php
- app/Domains/Modules/Media/Routes/api.php
- app/Domains/Modules/Settings/Routes/api.php

Create or update route loading so the application is prepared to load module routes centrally.

Also create or prepare:

- routes/platform.php
- routes/runtime.php

Use clean route grouping. Do not put business logic in route files.

---

## 7. Create Initial Database Migrations

Generate starter migrations based on docs/database-schema.md for these core tables:

### Platform tables
- users (only if needed or adapt existing Laravel users table)
- projects
- project_members
- modules
- project_modules
- api_keys
- usage_logs
- audit_logs

### MVP module tables
- project_users
- post_categories
- posts
- post_comments
- post_tags
- post_tag_items
- media_files
- project_settings

**Rules:**
- all project-owned tables must include project_id
- add proper foreign keys
- add indexes for common lookups
- do not overuse JSON
- use JSON only for flexible config/metadata where appropriate

Keep migration names clear and ordered.

---

## 8. Create Initial Factories

Create starter factories for:

### Platform
- ProjectFactory
- ApiKeyFactory
- ProjectMemberFactory

### Modules
- ProjectUserFactory
- PostFactory
- PostCategoryFactory
- PostCommentFactory
- MediaFileFactory

Factories should be realistic and readable.

---

## 9. Create Initial Feature Tests

Create starter feature tests for the most important flows:

### Platform
- tests/Feature/Platform/Projects/CreateProjectTest.php
- tests/Feature/Platform/ApiKeys/CreateApiKeyTest.php
- tests/Feature/Platform/ProjectModules/EnableProjectModuleTest.php

### Modules
- tests/Feature/Modules/Blog/CreatePostTest.php
- tests/Feature/Modules/Blog/ListPostsTest.php
- tests/Feature/Modules/Media/UploadMediaFileTest.php

Tests must cover: happy path, validation where relevant, authentication failure where relevant, tenant isolation where relevant.

Keep tests minimal but correct.

---

## 10. Create Documentation Placeholders If Missing

Ensure these docs files exist in the repo:

- docs/architecture.md
- docs/database-schema.md
- docs/module-contract.md
- docs/folder-structure.md

If missing, create placeholders with headings only and TODO notes. Do not overwrite existing detailed documentation.

---

## 11. Create Sensible Starter Code, Not Fake Noise

**Important:**

- do not generate random placeholder methods with no purpose
- do not add fake comments everywhere
- do not create bloated scaffolding
- do not implement full business features yet

**The goal is:**
- correct architecture
- correct file placement
- correct contracts
- correct skeleton

Every generated file should be meaningful and aligned with APIArsenal standards.

---

## 12. Final Output Expectations

After completion, the repo should have:

- domain-first Laravel structure
- platform core skeleton
- first module skeletons
- shared tenancy foundation
- shared module contracts
- starter migrations
- starter factories
- starter tests
- route loading structure
- provider bootstrapping foundation

Everything must be organized, tenant-aware, and ready for iterative implementation.

**If you need to choose between speed and architecture quality, choose architecture quality.**
