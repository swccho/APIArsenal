---
name: feature-test-generator
description: Generate Laravel feature tests for API endpoints following APIArsenal testing rules. Use when the user asks for feature tests, test generation for an endpoint, or coverage for success, validation, auth, tenancy, database, or response structure.
---

# Feature Test Generator

Generate Laravel feature tests for the provided endpoint. Tests must align with project testing rules and cover the required scenarios.

## Before Generating

1. **Read project testing rules**: Load and apply [.cursor/rules/api-arsenal-testing.mdc](../../rules/api-arsenal-testing.mdc). All generated tests must follow those rules.
2. **Identify the endpoint**: Method, URI, route name (if any), controller/action, request validation rules, and response shape.
3. **Identify models and factories**: Use existing factories (e.g. `database/factories/`) where they exist; create or extend factories only when needed for realistic setup.

## Required Test Coverage

Every generated feature test suite for an endpoint must include tests for:

| Scenario | What to verify |
|----------|----------------|
| **Success case** | Valid request returns expected status (e.g. 200/201), response shape, and any side effects. |
| **Validation failure** | Invalid or missing required fields return 422 (or project standard), error structure, and no unwanted persistence. |
| **Unauthorized access** | Missing or invalid credentials (e.g. missing API key, wrong key) return 401; no data leaked. |
| **Tenant isolation** | Authenticated as project A cannot read/update/delete project B data; list endpoints return only current project data. |
| **Database changes** | Create: record exists with correct attributes; Update: record updated; Delete: record removed or soft-deleted as designed. |
| **Response structure** | Assert `data`, `meta`, `error` (or project convention), status code, and critical keys. |

Skip a scenario only if it does not apply (e.g. no auth on a public endpoint, no tenant on a global endpoint). Document why in a short comment.

## Workflow

1. **Gather endpoint details**  
   From routes, controller, form request, and API docs: method, URI, auth, validation rules, success response shape, and which models are read/written.

2. **Plan test cases**  
   Map each required scenario above to concrete test methods. Name tests by behavior with `test_` prefix (e.g. `test_it_returns_201_and_creates_resource_when_valid`, `test_it_returns_422_when_required_field_missing`, `test_it_returns_401_without_api_key`, `test_it_does_not_return_resources_from_another_project`).

3. **Setup**  
   Use factories and minimal data. For tenancy: create at least two projects (or tenants), attach API key/user to one, and assert isolation from the other.

4. **Implement**  
   Extend `Tests\TestCase`. Use HTTP calls (e.g. `get`, `post`, `put`, `delete`) with correct headers (e.g. API key). Assert status, response structure, and database state.

5. **Cross-check**  
   Confirm each of the six areas (success, validation, unauthorized, tenant isolation, database, response structure) is covered and that naming/style match api-arsenal-testing.mdc.

## Test Structure Template

```php
<?php

namespace Tests\Feature\[ModuleOrArea];

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class [Resource]EndpointTest extends TestCase
{
    use RefreshDatabase;

    // Success
    public function test_it_returns_success_and_expected_structure_when_valid(): void { }

    // Validation
    public function test_it_returns_422_when_[specific_validation_failure]: void { }

    // Unauthorized
    public function test_it_returns_401_without_api_key(): void { }
    public function test_it_returns_401_with_invalid_api_key(): void { }

    // Tenant isolation (if endpoint is tenant-scoped)
    public function test_it_does_not_return_[resources]_from_another_project(): void { }
    public function test_it_does_not_[update|delete]_[resource]_from_another_project(): void { }

    // Database
    public function test_it_persists_[resource]_on_successful_create(): void { }

    // Response structure
    public function test_it_returns_expected_json_structure_on_success(): void { }
}
```

Use `RefreshDatabase` so each test has a clean DB. Use factories for projects, users, API keys, and domain models. Assert with `assertStatus`, `assertJsonStructure`, `assertDatabaseHas`, `assertDatabaseMissing`, etc., as appropriate.

## Conventions

- **Naming**: Descriptive, behavior-oriented method names with `test_` prefix (e.g. `test_it_creates_a_post_for_the_authenticated_project`). No vague names like `test_post` or `test_works_correctly`.
- **Auth**: Use the same auth mechanism as the app (e.g. API key in header). Create and use a valid key for success/tenant tests; omit or invalidate for unauthorized tests.
- **Tenancy**: Create two projects; authenticate as one and assert that the other’s data is not visible or modifiable.
- **Factories**: Prefer existing factories; keep new factories minimal and realistic.

## Reference

- Full testing principles, tenancy rules, and definition of done: [.cursor/rules/api-arsenal-testing.mdc](../../rules/api-arsenal-testing.mdc).
