# APIArsenal Command: /generate-migration

Generate a Laravel migration following docs/database-schema.md (or docs/SCHEMA_BLUEPRINT.md).

**Rules:**
- Project-owned tables must include `project_id`
- Proper foreign keys must be defined
- Indexes must be added for query efficiency

**Common indexed columns:** `project_id`, `created_at`, `slug`, `email`, `status`

Use JSON columns only for flexible metadata. Avoid storing relational data in JSON.
