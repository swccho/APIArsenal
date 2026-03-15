# APIArsenal Command: /create-module

Create a new APIArsenal module.

**Always follow:**
- docs/module-contract.md (or docs/MODULE_CONTRACT_BLUEPRINT.md)
- docs/folder-structure.md
- api-arsenal-architecture.mdc
- api-arsenal-backend.mdc

**Place the module in:**
```
app/Domains/Modules/{ModuleName}
```

**The module must include:**
- Module Definition
- Models
- Actions
- Requests
- Controllers
- Resources
- Routes
- Docs definitions
- Seeder if demo data supported
- Feature tests

**Structure example:**
```
app/Domains/Modules/{ModuleName}/
- {ModuleName}Module.php
- Models/
- Actions/
- Http/
  - Controllers/
  - Requests/
  - Resources/
- Docs/
- Seeders/
- Routes/
- Policies/
- Queries/
- Support/
```

**Rules:**
- `project_id` must exist on project-owned tables
- Controllers must stay thin
- Business logic must live in Actions
- Responses must use API Resources
- Module routes must be isolated
- Module docs must be defined
