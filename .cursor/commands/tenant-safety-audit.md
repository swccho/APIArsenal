# APIArsenal Command: /tenant-safety-audit

Perform a multi-tenancy security audit.

**Verify:** All project-owned queries are scoped by `project_id`.

**Ensure:**
- No cross-project access
- Project ownership never comes from request input
- Project context resolved from API key
- Models inherit ProjectOwnedModel when required

Report any unsafe query patterns.
