# APIArsenal Development Workflow

This document defines the development workflow for APIArsenal.

The goal of this workflow is to ensure that development remains:

- consistent
- architecture-driven
- safe for multi-tenancy
- testable
- easy to maintain

The project is designed to be developed using **Cursor with AI assistance**, guided by architecture documentation and rules.

---

# 1. Development Philosophy

APIArsenal must be developed using an **architecture-first approach**.

**Rules:**

- Architecture documents must be respected.
- Folder structure must not be violated.
- Module contracts must always be followed.
- Controllers must remain thin.
- Business logic must live in actions.
- Multi-tenancy safety must never be broken.

If unsure about implementation details, always prefer **the safest architecture decision**.

---

# 2. Project Documentation

Before implementing code, always consult the project documentation.

**Important documents:**

- docs/ARCHITECTURE.md (or architecture.md)
- docs/SCHEMA_BLUEPRINT.md (or database-schema.md)
- docs/MODULE_CONTRACT_BLUEPRINT.md (or module-contract.md)
- docs/FOLDER_STRUCTURE.md (or folder-structure.md)
- docs/IMPLEMENTATION_ORDER.md (or implementation-order.md)
- docs/mvp-scope.md
- docs/api-style.md
- docs/dev-workflow.md

These documents define how the system must behave. No code should violate these specifications.

---

# 3. Cursor AI System

Cursor acts as the primary development assistant.

**Cursor must follow:** .cursor/system/apiarsenal-brain.md

This file defines the **global system behavior for AI development**.

**Cursor must also respect:**

- .cursor/rules/api-arsenal-architecture.mdc
- .cursor/rules/api-arsenal-backend.mdc
- .cursor/rules/api-arsenal-testing.mdc

These rules enforce architecture and code quality.

---

# 4. Development Phases

All development must follow the roadmap defined in **docs/IMPLEMENTATION_ORDER.md**.

Phases must be implemented in order.

**Example phases:**

- Phase 1 → Foundation
- Phase 2 → Platform Control Layer
- Phase 3 → Runtime API Infrastructure
- Phase 4 → Users Module
- Phase 5 → Blog Module
- Phase 6 → Media Module

Never implement later phases before earlier phases are complete.

---

# 5. Using Cursor Commands

Cursor commands automate development tasks.

**Commands are located in:** .cursor/commands/

**Important commands include:**

- /bootstrap-apiarsenal
- /implementation-order (or /implement-phase for phase-specific work)
- /create-module
- /create-platform-domain
- /generate-api-endpoint
- /generate-migration
- /create-feature-test
- /review-code
- /tenant-safety-audit
- /architecture-review

These commands help maintain consistent architecture.

---

# 6. Starting Development

The recommended starting process:

**Step 1.** Run the bootstrap command: `/bootstrap-apiarsenal`  
This generates the base architecture skeleton.

**Step 2.** Review the generated code: `/review-code`

**Step 3.** Audit tenancy safety: `/tenant-safety-audit`

**Step 4.** Begin implementing the roadmap: use `/implementation-order` and implement Phase 1 as described there.

---

# 7. Daily Development Workflow

A typical development session should follow this process.

1. **Identify the current roadmap phase.** Check docs/IMPLEMENTATION_ORDER.md.

2. **Continue development.** Use the appropriate command or prompt (e.g. “Implement the Projects domain fully”).

3. **After generating code, run quality checks:** `/review-code`

4. **Verify tenant safety:** `/tenant-safety-audit`

5. **Add or update tests** where needed.

---

# 8. Creating New Modules

When creating a new feature module, use the command:

**/create-module ModuleName**

**Example:** /create-module Blog

This will generate the required structure based on docs/MODULE_CONTRACT_BLUEPRINT.md (or module-contract.md).

**Module structure includes:** module definition, models, actions, requests, controllers, resources, routes, docs definitions, seeders, tests.

---

# 9. Creating Platform Domains

Platform features must be created using:

**/create-platform-domain DomainName**

**Example:** /create-platform-domain Projects

Platform domains must be placed in **app/Domains/Platform/**.

Platform domains handle infrastructure such as: projects, API keys, module enablement, usage logging.

---

# 10. Generating API Endpoints

Use **/generate-api-endpoint**.

Endpoints must follow **docs/api-style.md**.

**Requirements:** RESTful routes, request validation, action-based business logic, API resources for responses, tests. Controllers must remain thin.

---

# 11. Writing Tests

Tests are mandatory for all important features.

Use the command **/create-feature-test**.

**Tests should cover:** success case, validation failure, authentication failure, tenant isolation, response structure.

Tests must live in **tests/Feature/**.

---

# 12. Multi-Tenancy Safety

Tenant isolation is critical.

**Rules:**

- project ownership must never come from request input
- project context must come from authentication
- all queries must be scoped by project_id
- project data must never leak across tenants

Before merging code, run **/tenant-safety-audit**.

---

# 13. Code Review Workflow

After implementing a feature, run **/review-code**.

This command checks: architecture violations, fat controllers, missing validation, security risks, tenant safety issues.

Always fix issues before continuing development.

---

# 14. Module Documentation

Every module must provide documentation metadata.

Documentation definitions must live in **Module/Docs/** (e.g. BlogDocs.php).

**Docs must describe:** endpoint, request schema, response schema, examples. Documentation must match real behavior.

---

# 15. Database Migrations

All schema changes must follow docs/SCHEMA_BLUEPRINT.md (or database-schema.md).

**Rules:** project-owned tables must include project_id; foreign keys must be used where appropriate; indexes must be added for common queries. Migrations should be clear and ordered.

---

# 16. API Response Consistency

All responses must follow **docs/api-style.md**.

- **Success:** `{ "data": {} }`
- **List:** `{ "data": [], "meta": {} }`
- **Error:** `{ "error": {} }`

Never return raw models. Always use API resources.

---

# 17. Commit Guidelines

Commits should be clear and descriptive.

**Examples:**

- feat: implement project creation API
- feat: add Blog module skeleton
- fix: enforce tenant scoping for posts query
- test: add CreatePost feature test

Avoid vague commit messages (e.g. “update stuff”).

---

# 18. When to Refactor

Refactor when: controllers become large, business logic leaks into controllers, duplicated logic appears, module boundaries become unclear.

Refactoring must maintain tenant safety.

---

# 19. Definition of Done

A feature is considered complete when:

- architecture rules are respected
- module structure is correct
- controllers remain thin
- actions contain business logic
- validation exists
- tenant safety is enforced
- API responses follow the style guide
- tests exist
- documentation metadata exists

---

# 20. Long-Term Maintenance

As the project grows:

- new modules must follow the module contract
- API style must remain consistent
- tenant safety must never be compromised
- architecture boundaries must remain clear

If the system becomes complex, always prefer **clarity over cleverness**.
