# APIArsenal — MVP Scope

This document defines the **minimum viable product (MVP)** for APIArsenal.

The goal of the MVP is to launch a **fully functional modular backend platform** that allows developers to create real backend APIs instantly by enabling modules.

The MVP focuses on:

- a stable architecture
- modular API system
- multi-tenant project isolation
- usable backend APIs
- clean developer experience

The MVP intentionally avoids unnecessary complexity.

---

# 1. MVP Goals

The MVP must allow a developer to:

1. Create a project
2. Generate an API key
3. Enable backend modules
4. Call module APIs using the API key
5. Read API documentation for enabled modules
6. Seed demo data for testing

**Example workflow:**

User → creates project  
User → enables Blog module  
User → gets API key  
User → calls `/api/v1/posts`  
User → receives real backend data

This is the core experience APIArsenal must deliver.

---

# 2. Core Platform Features (MVP)

The platform itself manages projects, modules, and authentication.

The MVP must include these platform domains.

## Projects

Users can:

- create a project
- list projects
- update project
- delete project (optional for MVP)

Each project represents an isolated backend environment.

---

## Project Members

Projects can have multiple members.

**Roles for MVP:** owner, admin, developer

Members can:

- access the project
- manage modules
- generate API keys

---

## API Keys

API keys allow external applications to call APIs.

**Features:**

- create API key
- display raw key once
- revoke API key
- list API keys
- hashed storage in database
- last used timestamp

**API key example:** `ars_live_xxxxxxxxxxxxxxxxx`

---

## Module Registry

The platform must maintain a registry of all available modules.

Each module contains metadata:

- key
- name
- description
- category
- version
- dependencies

**Example modules:** auth, users, blog, media, settings

---

## Project Modules

Projects can enable or disable modules.

**Features:**

- enable module
- disable module
- module dependency resolution
- module configuration storage

**Example:** Project → enables Blog module → exposes Blog APIs to that project.

---

## Usage Logs (Basic)

The MVP should log API usage for observability.

**Minimum fields:** project_id, api_key_id, endpoint, status code, response time, timestamp

Full analytics dashboards are not required for MVP.

---

## Audit Logs (Basic)

Important actions must be logged.

**Examples:** project created, module enabled, module disabled, API key created, API key revoked, member added

---

# 3. Runtime API Infrastructure

Runtime APIs are the public APIs used by developers.

All runtime APIs must support:

- API key authentication
- project context resolution
- module enablement checks
- standardized responses

---

## Runtime Middleware Pipeline

Every request must pass through:

1. API key authentication
2. project resolution
3. module enabled check
4. request validation
5. controller
6. response formatting
7. usage logging

---

## API Versioning

Runtime APIs must use versioned routes.

**Example:** `/api/v1/posts`, `/api/v1/users`, `/api/v1/media`

Future versions may introduce `/api/v2`.

---

# 4. MVP Feature Modules

The MVP includes **five feature modules**.

---

## Users Module

Manages project users (application users).

**Features:** create user, list users, view user, update user, delete user

**Example endpoints:**

- GET /users
- POST /users
- GET /users/{id}
- PUT /users/{id}
- DELETE /users/{id}

---

## Blog Module

Simple content system.

**Entities:** post categories, posts, comments, tags

**Features:**

- **Categories:** create category, list categories
- **Posts:** create post, list posts, view post, update post, delete post
- **Comments:** add comment, list comments
- **Tags:** attach tags to posts

**Example endpoints:** GET/POST/GET/PUT/DELETE /posts (and categories, comments as needed)

---

## Media Module

Manages file uploads.

**Features:** upload file, list files, delete file, view file metadata

**Example endpoints:**

- POST /media
- GET /media
- GET /media/{id}
- DELETE /media/{id}

**Supported file types for MVP:** images, documents. Advanced media processing is not required.

---

## Settings Module

Stores project-specific configuration.

**Features:** list settings, update setting

**Example endpoints:**

- GET /settings
- PUT /settings/{key}

Settings stored as key/value pairs.

---

## Auth Module (Basic)

Authentication for project users.

**Features:** register, login, logout, get current user

**Example endpoints:**

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me

Token-based authentication can use Laravel Sanctum.

---

# 5. Documentation System

Each module must define API documentation metadata.

**Documentation must include:** endpoint, method, description, request schema, response schema, example request, example response

The platform will generate documentation for enabled modules.

**Example:** Project with Blog module enabled → docs include Blog APIs.

---

# 6. Demo Data System

Modules may provide demo seeders.

**Example for Blog:** sample categories, sample posts, sample comments

Demo data must be project-scoped.

---

# 7. API Response Format

All APIs must follow consistent response structures.

**Success:**

```json
{
  "data": {}
}
```

**List:**

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 15,
    "total": 120
  }
}
```

**Error:**

```json
{
  "error": {
    "code": "validation_error",
    "message": "The title field is required."
  }
}
```

---

# 8. What Is NOT Included in MVP

The MVP intentionally excludes advanced features. These may be added in future versions.

**Not included in MVP:**

- billing and subscription system
- advanced analytics dashboards
- rate limiting customization
- multi-region deployments
- GraphQL API
- plugin marketplace
- third-party integrations
- AI-powered API generation
- advanced permission systems
- webhooks
- background job orchestration UI
- module marketplace

---

# 9. Definition of MVP Completion

APIArsenal MVP is considered complete when:

- projects can be created
- API keys can be generated
- modules can be enabled
- runtime APIs work
- module APIs return real data
- tenant isolation is enforced
- documentation is generated
- demo data can be seeded
- tests exist for major flows

At that point the product can be demonstrated, deployed, and used by developers.
