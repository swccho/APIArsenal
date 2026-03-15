# APIArsenal Command: /create-feature-test

Generate a Laravel feature test.

**Place it in:** `tests/Feature/`

**Follow:** api-arsenal-testing.mdc

**The test must cover:**
- Success case
- Validation failure
- Unauthorized request
- Forbidden request
- Tenant isolation
- Response structure
- Database state changes

Use factories when possible.

**Example test names:**
- `it_creates_a_post_for_the_authenticated_project`
- `it_does_not_return_posts_from_other_projects`
- `it_rejects_requests_with_invalid_api_key`

Tests must clearly express behavior.
