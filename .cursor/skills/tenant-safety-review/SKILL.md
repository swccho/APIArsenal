---
name: tenant-safety-review
description: Review code to ensure project-based tenancy is enforced. Use when reviewing multi-tenancy safety, checking project scoping, API key resolution, or when the user asks for a tenant-safety or tenancy review.
---

# Tenant Safety Review

Review the given code and verify multi-tenancy safety. Ensure project-based tenancy is enforced and cross-project access is impossible.

## Review Checklist

Apply this checklist to routes, controllers, actions, queries, and any code that touches project-owned data:

- [ ] **project_id present**: Project-owned models have `project_id` (or equivalent) and it is used in create/update/query.
- [ ] **Queries scoped**: All reads/writes for project-owned resources are scoped to the active project (e.g. `where('project_id', $projectId)` or equivalent).
- [ ] **No project from input**: Project/tenant context is never taken from request body, query string, or route parameters. Reject or ignore `project_id` (and similar) from user input.
- [ ] **Cross-project blocked**: No path allows loading or mutating another project’s data (no ID-only lookups without project scope).
- [ ] **Tenant from API key**: Tenant/project context is derived from API key resolution (or equivalent trusted auth) and applied consistently.

## What to Look For

### Safe patterns

- Project ID comes from resolved context (e.g. `$request->project()`, `auth()->user()->currentProjectId()`, or API key → project mapping).
- Queries always include project scope: `Model::where('project_id', $projectId)->...`
- Creates set `project_id` from context: `Model::create([...data, 'project_id' => $projectId])`
- Request validation does not accept `project_id` (or strips/ignores it).

### Unsafe patterns

- Using `$request->input('project_id')`, `$request->get('project_id')`, or route parameter for tenant context.
- Fetching by ID only: `Model::find($id)` or `Model::where('id', $id)` without project scope.
- Allowing client to set `project_id` in create/update payloads.
- Any branch that could return or modify another project’s data.

## Output Format

1. **Summary**: One line on whether the code is tenant-safe or not.
2. **Findings**: List each issue with file/line (or snippet) and which checklist item it violates.
3. **Fixes**: For each finding, suggest a concrete fix (e.g. “Scope this query with `->where('project_id', $projectId)` using project from API key context”).

If no issues are found, state that the reviewed code appears tenant-safe and briefly note how project context and scoping are applied.

## Optional Reference

For project-specific tenancy patterns and module contracts, see the repo’s architecture docs (e.g. module blueprint) if present.
