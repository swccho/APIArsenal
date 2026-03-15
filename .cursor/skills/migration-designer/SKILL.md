---
name: migration-designer
description: >-
  Generate Laravel migrations following the project database schema docs. Use when
  creating migrations, adding tables, or designing database schema. Follows
  docs/database-schema.md (or docs/SCHEMA_BLUEPRINT.md), proper foreign keys,
  indexes, tenant-safe design with project_id for project-owned tables; avoids
  storing core data in JSON unless required.
---

# Migration Designer (APIArsenal)

Generate Laravel migrations that match the project’s schema rules: correct foreign keys, indexes, tenant-safe design, and no core data in JSON unless the schema allows it.

## Mandatory Reference (Read First)

Before generating any migration, read and apply:

| Reference | Path | Purpose |
|-----------|------|---------|
| Schema blueprint | `docs/database-schema.md` or `docs/SCHEMA_BLUEPRINT.md` | Table definitions, columns, FKs, indexes, tenant vs platform tables |

Use `docs/database-schema.md` if it exists; otherwise use `docs/SCHEMA_BLUEPRINT.md`. If neither exists, ask the user for the schema source.

---

## Tenant-Safe Design

- **Project-owned tables** (module/business data): must include `project_id` (bigint, FK → `projects.id`). All such tables are scoped by project.
- **Platform tables** (e.g. `users`, `projects`, `project_members`, `modules`): no `project_id`; they are global.
- **Shared tables with `project_id`** are the correct pattern for tenancy in this project.

When in doubt, if the table holds data that belongs to “a project’s app,” add `project_id`.

---

## Migration Rules

### 1. IDs and timestamps

- Use `$table->id();` for primary key (bigint).
- Use `$table->timestamps();` unless the schema explicitly omits them.

### 2. Foreign keys

- Use `$table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();` for project-owned tables (or `->nullable()->constrained(...)` only when the schema says nullable).
- Use `$table->foreignId('other_id')->nullable()->constrained('other_table');` when the schema marks the FK as nullable.
- Define every FK stated in the schema; do not skip or guess.

### 3. Indexes

- **Always index** `project_id` (often via the foreign key).
- Add indexes for: foreign keys, unique slugs, emails used for lookup, `created_at` when used in sorts, `status` when filtered often.
- **Composite indexes** where the schema specifies them, e.g.:
  - `(project_id, slug)`
  - `(project_id, email)`
  - `(project_id, module_id)`
  - `(project_id, key)`
  - `(project_id, requested_at)`
- Use `->unique()` for unique constraints; use `$table->unique(['col_a', 'col_b']);` for composite uniques.

### 4. JSON columns

- **Do not** use JSON for core relational data (users, posts, categories, keys, etc.).
- **Use JSON only** where the schema explicitly allows it, e.g.:
  - `project_modules.config_json`
  - `project_settings.value_json`
  - `audit_logs.metadata_json`

### 5. Column types

- Map schema types to Laravel blueprint methods: string, text, integer, bigInteger, boolean, timestamp, date, etc.
- Use `->nullable()` when the schema says nullable.
- Use `longText` for very long content (e.g. post body).

---

## Workflow

1. **Resolve schema doc**: Read `docs/database-schema.md` or `docs/SCHEMA_BLUEPRINT.md`.
2. **Identify table type**: Platform (no `project_id`) vs project-owned (include `project_id`).
3. **Generate migration**: One migration per table (or one per logical group if the project prefers). Include:
   - All columns from the schema
   - All foreign keys with correct references and nullability
   - All indexes and unique constraints from the schema
4. **Self-check**: project_id on project-owned tables; no JSON for core data unless in schema; every FK and index from the schema present.

---

## Output

- Place new migrations in `database/migrations/`.
- Use a descriptive name, e.g. `xxxx_xx_xx_xxxxxx_create_post_categories_table.php`.
- Implement both `up()` and `down()` (create/drop table or add/drop columns).
- Use the existing codebase style (e.g. `Schema::create`, `Blueprint`, `return new class extends Migration`).

---

## Additional reference

For the full table list, FK summary, and indexing priorities, see [reference.md](reference.md).
