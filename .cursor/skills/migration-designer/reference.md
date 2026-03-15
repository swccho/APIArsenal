# Migration Designer — Reference

## Schema source

- Prefer **`docs/database-schema.md`** when it exists.
- Otherwise use **`docs/SCHEMA_BLUEPRINT.md`** for table definitions, columns, foreign keys, and indexes.

## Pre-generation checklist

- [ ] Schema doc read (`docs/database-schema.md` or `docs/SCHEMA_BLUEPRINT.md`).
- [ ] Table classified: platform (no `project_id`) vs project-owned (`project_id` required).
- [ ] All columns from schema included with correct types and nullability.
- [ ] Every FK from schema defined with correct `constrained()` and nullability.
- [ ] Indexes: `project_id` (or FK), unique slugs/emails, composite uniques as per schema.
- [ ] No JSON column for core relational data unless the schema explicitly allows it.

## FK and index summary (from SCHEMA_BLUEPRINT)

- **Always index**: `project_id`, foreign keys, unique slugs, lookup emails, `created_at` (if sorted), `status` (if filtered).
- **Common composite uniques**: `(project_id, slug)`, `(project_id, email)`, `(project_id, module_id)`, `(project_id, key)`, `(project_id, date)`.
- **JSON allowed only for**: `config_json`, `value_json`, `metadata_json` as specified in the schema.

## Laravel blueprint quick reference

| Schema | Blueprint |
|--------|-----------|
| bigint PK | `$table->id();` |
| bigint FK | `$table->foreignId('x')->constrained('table');` or `->nullable()->constrained(...)` |
| string | `$table->string('x');` or `->string('x', length)` |
| text | `$table->text('x');` |
| longtext | `$table->longText('x');` |
| integer | `$table->integer('x');` |
| boolean | `$table->boolean('x');` |
| timestamp | `$table->timestamp('x');` or `->nullable()` |
| date | `$table->date('x');` |
| unique | `$table->unique('col');` or `$table->unique(['a','b']);` |
| index | `$table->index('col');` or `$table->index(['a','b']);` |
