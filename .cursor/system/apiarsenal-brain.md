# APIArsenal Project Brain

You are the primary engineering assistant for the APIArsenal project.

APIArsenal is a **modular multi-tenant backend platform** that allows developers to create real backend APIs by enabling prebuilt modules.

The system is designed as a **modular monolith built with Laravel**.

Your job is to help implement features while **strictly respecting architecture rules, tenancy safety, module boundaries, and code quality standards.**

You must always follow the project rules and documentation.

---

# 1. Core Concept of APIArsenal

APIArsenal allows developers to:

1. create a project
2. enable backend modules
3. receive real production-ready APIs instantly

Examples of modules:

- Auth
- Users
- Blog
- Media
- Settings
- Orders
- Chat

Each project acts as an isolated backend environment.

All runtime APIs operate within the context of a project.

---

# 2. Architecture Style

APIArsenal uses a **modular monolith architecture**.

The system is split into:

Platform Core  
Feature Modules  
Shared Runtime Infrastructure  

Platform Core manages:

- users
- projects
- API keys
- module registry
- module enablement
- usage tracking
- documentation generation
- audit logging

Feature Modules implement reusable backend functionality.

Examples:

- Blog module
- Media module
- Auth module
- Settings module

Modules are **enabled per project**.

---

# 3. Folder Structure

The project uses a domain-first folder structure.

Important directories:

app/Domains/Platform  
app/Domains/Modules  
app/Shared  

Platform domains exist in:

app/Domains/Platform/

Feature modules exist in:

app/Domains/Modules/

Shared reusable infrastructure lives in:

app/Shared/

Never dump code into generic Laravel folders such as:

app/Models  
app/Http/Controllers  
app/Services  

Instead follow the documented domain structure.

Refer to:

docs/folder-structure.md

---

# 4. Multi-Tenancy Model

The tenant boundary is always **Project**.

Every project-owned record must contain:

project_id

Examples of project-owned tables:

- project_users
- posts
- categories
- comments
- media_files
- settings

Rules:

1. Never trust request input for project ownership.
2. Project context must be resolved from API authentication.
3. All queries must be scoped by project_id.
4. Cross-project data access must never be possible.

Refer to:

docs/database-schema.md

---

# 5. Module System

Modules are self-contained feature packages.

Each module must include:

- module definition
- models
- actions
- requests
- controllers
- resources
- routes
- docs definitions
- demo seeders
- tests

Modules live in:

app/Domains/Modules/{ModuleName}

Modules must follow the rules in:

docs/module-contract.md

---

# 6. Business Logic Rules

Controllers must remain thin.

Controllers should only:

- receive request
- authorize
- call action
- return resource

Business logic must live in **Actions**.

Example:

CreatePostAction  
UpdateProjectAction  
EnableProjectModuleAction

Never place complex logic inside controllers.

---

# 7. API Design Rules

All APIs must be RESTful.

Examples:

GET /posts  
POST /posts  
GET /posts/{id}  
PUT /posts/{id}  
DELETE /posts/{id}

Use:

FormRequest validation  
Action classes for logic  
API Resources for responses  

Standard response format:

Success:

{
  "data": {}
}

List:

{
  "data": [],
  "meta": {}
}

Error:

{
  "error": {
    "code": "",
    "message": ""
  }
}

---

# 8. Security Rules

Security is critical.

Always enforce:

- API keys must be hashed
- project ownership must never come from request input
- validation must be performed for all input
- authorization must be enforced for sensitive actions
- tenant boundaries must never be bypassed

File uploads must validate:

- mime type
- size
- allowed extensions

---

# 9. Database Rules

Database schema must follow:

docs/database-schema.md

Rules:

- project-owned tables require project_id
- foreign keys must be used appropriately
- indexes must exist for common queries
- JSON columns only for flexible metadata
- core relational data must not be stored in JSON

---

# 10. Testing Philosophy

Tests are mandatory.

All important features must include:

Feature tests.

Tests must cover:

- success case
- validation failure
- authentication failure
- tenant isolation
- response structure

Follow:

apiarsenal-testing-rules.mdc

---

# 11. Documentation System

Modules must provide documentation metadata.

Docs definitions live in:

Module/Docs/

Example:

BlogDocs.php

Docs must include:

- endpoint
- method
- description
- request schema
- response schema
- example payload

---

# 12. Demo Data

Modules may include demo seeders.

Demo seeders must:

- accept project context
- only create records for that project
- generate realistic sample data

Demo seeders live in:

Module/Seeders/

---

# 13. Code Quality Rules

Always prefer:

clear code  
explicit logic  
small responsibilities  
consistent patterns  

Avoid:

fat controllers  
vague helper classes  
hidden magic behavior  
unsafe queries  

Follow:

apiarsenal-backend-rules.mdc

---

# 14. Commands and Skills

Cursor commands exist for common workflows.

Examples:

/create-module  
/create-platform-domain  
/generate-api-endpoint  
/create-feature-test  
/review-code  
/tenant-safety-audit  

Commands should always respect architecture rules.

---

# 15. When Generating Code

When implementing features:

1. respect folder structure
2. respect module boundaries
3. enforce project tenancy
4. keep controllers thin
5. use actions for logic
6. use resources for responses
7. follow database schema
8. add tests

If uncertain, prefer the safest architecture choice.

---

# 16. Definition of Done

A feature is complete when:

- architecture rules are respected
- module structure is correct
- controllers remain thin
- business logic lives in actions
- validation exists
- tenancy safety is enforced
- responses are consistent
- tests are written
- documentation is updated
