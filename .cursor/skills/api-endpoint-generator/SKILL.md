---
name: api-endpoint-generator
description: >-
  Generates REST API endpoints following APIArsenal conventions. Use when the
  user asks to create or generate a REST endpoint, API route, CRUD for a
  resource, or when adding a new module resource. Enforces RESTful routes, Form
  Request validation, action-based business logic, API Resources for responses,
  pagination on list endpoints, and correct HTTP status codes. Controllers stay
  thin; business logic lives in actions.
---

# API Endpoint Generator

Generate REST endpoints for a requested resource following APIArsenal module contract. Controllers are thin; validation, business logic, and response shaping live in dedicated classes.

## When to Use

- User asks for a REST endpoint, CRUD API, or "API for [resource]"
- Adding a new resource to an existing module or creating module endpoints
- User mentions "endpoint", "route", "API" for a resource (e.g. posts, orders, media)

## Conventions (Mandatory)

| Layer | Rule |
|-------|------|
| **Routes** | RESTful: `GET /resource`, `POST /resource`, `GET /resource/{id}`, `PUT /resource/{id}`, `DELETE /resource/{id}` |
| **Validation** | Form Request classes (e.g. `StorePostRequest`, `UpdatePostRequest`); no inline validation in controllers |
| **Business logic** | Actions only (e.g. `CreatePostAction`, `ListPostsAction`); controllers only orchestrate |
| **Responses** | API Resource classes (e.g. `PostResource`); never return raw models |
| **List endpoints** | Paginated (e.g. `ListPostsAction` returns length-aware paginator; controller returns resource collection) |
| **HTTP status** | 200 OK (show/update), 201 Created (store), 204 No Content (destroy), 404 Not Found when missing |

## Workflow

1. **Identify resource and module** — e.g. `Post` in Blog module → `app/Domains/Modules/Blog/`.
2. **Routes** — Add RESTful route group under module prefix (see [reference.md](reference.md)).
3. **Form Requests** — Create `Store{Resource}Request` and `Update{Resource}Request` with rules; use in controller.
4. **Actions** — Create/use `Create{Resource}Action`, `Update{Resource}Action`, `Delete{Resource}Action`, `List{Resource}Action`, `Get{Resource}Action`; accept validated data or IDs; return model(s) or paginator.
5. **Controller** — Thin: validate (via Form Request) → call action → return Resource or ResourceCollection with correct status code.
6. **Resource** — Ensure `{Resource}Resource` exists; use for single item and `{Resource}Resource::collection()` for lists.

## Controller Shape (Thin)

```php
// Example: store
public function store(StorePostRequest $request): JsonResponse
{
    $post = $this->createPostAction->execute($request->validated());
    return response()->json(new PostResource($post), 201);
}

// Example: index (paginated)
public function index(): JsonResponse
{
    $paginator = $this->listPostsAction->execute();
    return response()->json(PostResource::collection($paginator));
}

// Example: destroy
public function destroy(Post $post): JsonResponse
{
    $this->deletePostAction->execute($post);
    return response()->json(null, 204);
}
```

Controllers must **not**: run queries directly, hold validation rules, or contain business logic. Delegate to actions and Form Requests.

## HTTP Status Codes

| Scenario | Status |
|----------|--------|
| List (index) | 200 OK |
| Single (show) | 200 OK |
| Create (store) | 201 Created |
| Update | 200 OK |
| Delete (destroy) | 204 No Content |
| Resource not found | 404 Not Found |
| Validation failed | 422 Unprocessable Entity (Form Request handles) |

## Pagination

- List (index) actions must return a paginator (e.g. `Model::query()->...->paginate()`).
- Controller returns `Resource::collection($paginator)` so the response includes `data`, `links`, `meta` as appropriate.

## File Locations (per module)

- **Routes:** module `routes/api.php` or `Support/{Module}RouteRegistrar.php`
- **Controllers:** `Http/Controllers/{Resource}Controller.php`
- **Requests:** `Http/Requests/Store{Resource}Request.php`, `Update{Resource}Request.php`
- **Actions:** `Actions/Create{Resource}Action.php`, etc.
- **Resources:** `Http/Resources/{Resource}Resource.php`

## Checklist Before Finishing

- [ ] Routes are RESTful and registered under module
- [ ] Store/Update use Form Request classes
- [ ] Controller only validates → calls action → returns Resource(s)
- [ ] Index returns paginated Resource collection
- [ ] Status codes: 201 store, 200 show/update, 204 destroy, 404 when not found
- [ ] No business logic or raw queries in controller

## Reference

- Full module contract and folder structure: [docs/MODULE_CONTRACT_BLUEPRINT.md](../../docs/MODULE_CONTRACT_BLUEPRINT.md)
- Route and code patterns: [reference.md](reference.md)
