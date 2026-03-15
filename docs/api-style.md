# APIArsenal API Style Guide

This document defines the API design standards for APIArsenal.

All APIs must follow this guide to ensure:

- consistency
- predictability
- clean developer experience
- maintainable architecture

These rules apply to **all platform APIs and runtime module APIs**.

---

# 1. Base API URL

Runtime APIs must use versioned endpoints.

**Example:** `/api/v1`

- /api/v1/posts
- /api/v1/users
- /api/v1/media

Future versions may introduce `/api/v2`. Versioning must always be included in runtime APIs.

---

# 2. Authentication

APIArsenal runtime APIs use **API key authentication**.

API keys must be sent via header:

```
Authorization: Bearer {API_KEY}
```

**Example:** `Authorization: Bearer ars_live_xxxxxxxxxxxxxx`

**Rules:**

- API keys must be hashed in database
- raw keys must only be shown once
- requests without valid API key must return 401

**Example error:**

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Invalid API key."
  }
}
```

---

# 3. Resource Naming

Resources must use **plural nouns**.

**Correct:** /posts, /users, /media, /categories

**Incorrect:** /post, /getPosts, /createUser

---

# 4. HTTP Methods

Use standard REST methods.

- GET → retrieve data
- POST → create resource
- PUT → update resource
- PATCH → partial update
- DELETE → remove resource

**Examples:** GET /posts, POST /posts, GET /posts/{id}, PUT /posts/{id}, DELETE /posts/{id}

---

# 5. Standard Response Structure

All responses must follow consistent formats.

## Success Response

```json
{
  "data": {}
}
```

**Example:**

```json
{
  "data": {
    "id": 1,
    "title": "My first post"
  }
}
```

## List Response

```json
{
  "data": [],
  "meta": {}
}
```

**Example:**

```json
{
  "data": [
    { "id": 1, "title": "Post A" },
    { "id": 2, "title": "Post B" }
  ],
  "meta": {
    "page": 1,
    "per_page": 15,
    "total": 42
  }
}
```

## Error Response

```json
{
  "error": {
    "code": "",
    "message": ""
  }
}
```

**Example:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Post not found."
  }
}
```

---

# 6. Pagination

List endpoints must support pagination.

**Query parameters:** page, per_page

**Example:** /posts?page=1&per_page=15

**Response meta:**

```json
"meta": {
  "page": 1,
  "per_page": 15,
  "total": 120
}
```

- Default per_page = 15
- Maximum per_page = 100

---

# 7. Filtering

Filtering must use query parameters.

**Example:** /posts?status=published

**Multiple filters:** /posts?status=published&author_id=12

**Rules:** filters must match database fields or safe aliases; validation must be applied to filters.

---

# 8. Sorting

Sorting must use the `sort` parameter.

**Example:** /posts?sort=created_at

**Descending:** /posts?sort=-created_at

**Multiple sorts:** /posts?sort=-created_at,title

---

# 9. Searching

Text search must use the `search` parameter.

**Example:** /posts?search=laravel

**Behavior:** partial match, case insensitive. Search implementation should be handled via query objects.

---

# 10. Resource IDs

Resources must use numeric or UUID identifiers.

**Examples:** /posts/1, /users/5, /media/21

IDs must never be guessable across projects. Tenant isolation must always be enforced.

---

# 11. Validation Errors

Validation errors must return HTTP 422.

**Example:**

```json
{
  "error": {
    "code": "validation_error",
    "message": "The title field is required.",
    "fields": {
      "title": ["The title field is required."]
    }
  }
}
```

---

# 12. HTTP Status Codes

Use correct HTTP status codes.

- 200 → success
- 201 → resource created
- 204 → successful delete
- 400 → bad request
- 401 → unauthorized
- 403 → forbidden
- 404 → not found
- 409 → conflict
- 422 → validation error
- 500 → server error

**Example:** POST /posts → 201 Created

---

# 13. Request Body Format

Requests must use JSON.

**Example:** POST /posts

```json
{
  "title": "My first post",
  "content": "Hello world",
  "category_id": 2
}
```

Content-Type header must be: `application/json`

---

# 14. Resource Fields

Responses must expose only necessary fields.

**Example Post Resource:**

```json
{
  "data": {
    "id": 1,
    "title": "My post",
    "content": "...",
    "status": "published",
    "created_at": "2026-03-15T12:00:00Z"
  }
}
```

Sensitive fields must never be exposed (e.g. password, api_key, internal metadata).

---

# 15. Relationships

Related resources should be nested carefully.

**Example:**

```json
{
  "data": {
    "id": 1,
    "title": "My post",
    "author": {
      "id": 5,
      "name": "John"
    }
  }
}
```

Avoid deep nesting.

---

# 16. Module API Rules

Module APIs must:

- only operate on project-owned data
- enforce project_id scoping
- respect module enablement

If a module is disabled for a project, return 404 Not Found:

```json
{
  "error": {
    "code": "module_not_enabled",
    "message": "This module is not enabled for the project."
  }
}
```

---

# 17. File Uploads

Uploads must use multipart/form-data.

**Example:** POST /media — field: `file`

**Validation rules:** allowed mime types, max size, safe storage path.

Response must include file metadata.

---

# 18. Rate Limiting

Rate limiting may be applied based on API key or project.

**Example response:** 429 Too Many Requests

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests."
  }
}
```

---

# 19. Timestamp Format

All timestamps must be ISO 8601.

**Example:** 2026-03-15T14:25:00Z

Timezone should be UTC.

---

# 20. API Documentation

Each module must provide documentation metadata.

**Docs must include:** endpoint, method, description, request schema, response schema, examples.

Documentation should automatically appear for enabled modules.

---

# 21. Naming Conventions

Use consistent naming.

**Field naming:** snake_case

**Example:** created_at, updated_at, author_id

Avoid camelCase in API payloads.

---

# 22. Idempotency

PUT and DELETE requests must be idempotent.

**Example:** Deleting the same resource twice should not break the API.

---

# 23. Backwards Compatibility

New API versions must not break existing integrations. Changes must be introduced via /api/v2.

---

# 24. Security

Never expose: internal database fields, hashed keys, private metadata.

All inputs must be validated. All queries must enforce tenant safety.

---

# 25. Definition of Done

An API endpoint is complete when:

- it follows REST conventions
- request validation exists
- response format matches the API style guide
- tests exist
- documentation metadata exists
- tenant isolation is enforced
