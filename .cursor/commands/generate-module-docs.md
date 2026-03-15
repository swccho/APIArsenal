# APIArsenal Command: /generate-module-docs

Generate API documentation metadata for a module.

**Place docs inside:** `Module/Docs/`

**Example:** `BlogDocs.php`

**Docs must include:**
- Endpoint path
- HTTP method
- Summary
- Description
- Authentication requirement
- Request schema
- Response schema
- Example payload

**Example structure:**
- GET /posts
- POST /posts
- GET /posts/{id}
- PUT /posts/{id}
- DELETE /posts/{id}

Documentation must match actual controller behavior.
