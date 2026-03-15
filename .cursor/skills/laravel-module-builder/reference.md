# Laravel Module Builder — Reference

Quick pointers for building APIArsenal modules. Full authority remains with the project docs and rules.

## Project doc and rule paths

| Doc / rule | Path |
|------------|------|
| Module contract | `docs/MODULE_CONTRACT_BLUEPRINT.md` |
| Folder structure | `docs/FOLDER_STRUCTURE.md` |
| Architecture | `.cursor/rules/api-arsenal-architecture.mdc` |
| Backend | `.cursor/rules/api-arsenal-backend.mdc` |
| Testing | `.cursor/rules/api-arsenal-testing.mdc` |

## Module folder template (from FOLDER_STRUCTURE)

```
app/Domains/Modules/{ModuleName}/
├── {ModuleName}Module.php
├── Actions/
├── Data/                    # optional DTOs
├── Docs/
│   └── {ModuleName}Docs.php
├── Http/
│   ├── Controllers/
│   ├── Requests/
│   └── Resources/
├── Models/
├── Policies/
├── Queries/                 # optional
├── Routes/
│   └── api.php
├── Seeders/
│   └── {ModuleName}DemoSeeder.php
└── Support/                 # optional (permissions, config, route registrar)
```

## Shared base classes (from FOLDER_STRUCTURE)

| Class | Path |
|-------|------|
| Project-owned model | `app/Shared/Models/ProjectOwnedModel.php` |
| Module contract | `app/Shared/Contracts/ArsenalModuleContract.php` |
| Base module docs | `app/Shared/Docs/BaseModuleDocs.php` |

## Test paths

- Feature: `tests/Feature/Modules/{ModuleName}/*.php`
- Unit: `tests/Unit/Modules/{ModuleName}/` or `tests/Unit/Shared/` as appropriate

## Route registration

- Module owns routes in `Routes/api.php` or a dedicated registrar in `Support/`.
- Central provider (e.g. ModuleServiceProvider) loads module routes.
- Runtime access still depends on project enablement (404 or module-disabled response when disabled).

## Docs definition shape (conceptual)

Return array of endpoint entries with at least: `method`, `path`, `summary`, `auth`. Add description, request/response schema, examples as needed for the docs engine.
