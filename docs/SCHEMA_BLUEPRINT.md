# APIArsenal Core Database Schema Blueprint

This schema supports:

- multi-project tenancy
- module enablement
- API key auth
- usage tracking
- clean expansion later

Sections:

1. Platform core tables  
2. Tenant/project tables  
3. Module system tables  
4. API access tables  
5. Observability tables  
6. First MVP module tables  

---

## 1. Platform Core Tables

Global platform tables, not tenant-owned business data.

### `users`

Stores dashboard users of APIArsenal.

| Column            | Type         | Notes |
|-------------------|--------------|-------|
| id                | bigint PK    |       |
| name              | string       |       |
| email             | string       |       |
| email_verified_at | timestamp    | nullable |
| password          | string       |       |
| avatar_url        | string       | nullable |
| last_login_at     | timestamp    | nullable |
| created_at        | timestamp    |       |
| updated_at        | timestamp    |       |

**Notes:**

- Unique index on `email`
- This is for platform login, not project app end-users

---

## 2. Project / Tenant Tables

### `projects`

Each project is a tenant.

| Column      | Type      | Notes |
|-------------|-----------|-------|
| id          | bigint PK |       |
| owner_id    | bigint FK | → users.id |
| name        | string    |       |
| slug        | string    |       |
| description | text      | nullable |
| status      | string    |       |
| created_at  | timestamp |       |
| updated_at  | timestamp |       |

**Notes:**

- Unique index on `slug`
- `status`: active, suspended, archived

---

### `project_members`

Users who can access a project dashboard.

| Column      | Type      | Notes |
|-------------|-----------|-------|
| id          | bigint PK |       |
| project_id  | bigint FK | → projects.id |
| user_id     | bigint FK | → users.id |
| role        | string    |       |
| created_at  | timestamp |       |
| updated_at  | timestamp |       |

**Notes:**

- Role examples: owner, admin, developer, viewer
- Unique composite index on `(project_id, user_id)`

---

## 3. Module System Tables

### `modules`

Master registry of all modules available in APIArsenal.

| Column      | Type      | Notes |
|-------------|-----------|-------|
| id          | bigint PK |       |
| key         | string    |       |
| name        | string    |       |
| category    | string    |       |
| version     | string    |       |
| description | text      | nullable |
| is_active   | boolean   |       |
| created_at  | timestamp |       |
| updated_at  | timestamp |       |

**Notes:**

- Examples of `key`: auth, users, blog, media, settings
- Unique index on `key`

---

### `project_modules`

Tracks enabled modules per project.

| Column        | Type      | Notes |
|---------------|-----------|-------|
| id            | bigint PK |       |
| project_id    | bigint FK | → projects.id |
| module_id     | bigint FK | → modules.id |
| status        | string    |       |
| config_json   | json      | nullable |
| enabled_at    | timestamp | nullable |
| disabled_at   | timestamp | nullable |
| created_at    | timestamp |       |
| updated_at    | timestamp |       |

**Notes:**

- Status examples: enabled, disabled, pending
- Unique composite index on `(project_id, module_id)`

---

### `module_dependencies` *(optional but recommended)*

Defines module dependencies globally.

| Column              | Type      | Notes |
|---------------------|-----------|-------|
| id                  | bigint PK |       |
| module_id           | bigint FK | → modules.id |
| depends_on_module_id| bigint FK | → modules.id |
| created_at          | timestamp |       |
| updated_at          | timestamp |       |

**Notes:**

- Helps auto-enable required modules later
- Example: blog may depend on users or auth depending on design

---

## 4. API Access Tables

### `api_keys`

Stores project API credentials.

| Column       | Type      | Notes |
|--------------|-----------|-------|
| id           | bigint PK |       |
| project_id   | bigint FK | → projects.id |
| name         | string    |       |
| key_prefix   | string    |       |
| key_hash     | string    |       |
| last_used_at | timestamp | nullable |
| revoked_at   | timestamp | nullable |
| expires_at   | timestamp | nullable |
| created_at   | timestamp |       |
| updated_at   | timestamp |       |

**Notes:**

- Never store raw API key. Store only:
  - prefix for display
  - secure hash for lookup/validation
- Index on `project_id`
- Unique index on `key_prefix` if used for lookup optimization

---

### `api_key_scopes` *(future-ready, optional for MVP)*

Defines scopes per API key.

| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | bigint PK |       |
| api_key_id | bigint FK | → api_keys.id |
| scope      | string    |       |
| created_at | timestamp |       |
| updated_at | timestamp |       |

**Notes:**

- Examples: read, write, posts:read, posts:write
- Can be skipped in MVP if all keys are full-access

---

## 5. Observability / Tracking Tables

### `usage_logs`

Raw API request logs. High-volume table.

| Column          | Type      | Notes |
|-----------------|-----------|-------|
| id              | bigint PK |       |
| project_id      | bigint FK | → projects.id |
| api_key_id      | bigint FK | nullable → api_keys.id |
| method          | string    |       |
| path            | string    |       |
| route_name      | string    | nullable |
| status_code     | integer   |       |
| response_time_ms| integer   |       |
| ip_address      | string    | nullable |
| user_agent      | text      | nullable |
| requested_at    | timestamp |       |
| created_at      | timestamp |       |

**Indexes:**

- `project_id`
- `api_key_id`
- `requested_at`
- Composite: `(project_id, requested_at)`

---

### `daily_usage_stats`

Pre-aggregated daily usage per project.

| Column               | Type      | Notes |
|----------------------|-----------|-------|
| id                   | bigint PK |       |
| project_id           | bigint FK | → projects.id |
| date                 | date      |       |
| total_requests       | integer   |       |
| total_errors         | integer   |       |
| avg_response_time_ms | integer   | nullable |
| created_at           | timestamp |       |
| updated_at           | timestamp |       |

**Notes:**

- Unique composite index on `(project_id, date)`
- Generated from usage_logs via scheduled job

---

### `audit_logs`

Tracks important platform/security events.

| Column       | Type      | Notes |
|--------------|-----------|-------|
| id           | bigint PK |       |
| project_id   | bigint FK | nullable → projects.id |
| user_id      | bigint FK | nullable → users.id |
| action       | string    |       |
| entity_type  | string    | nullable |
| entity_id    | bigint    | nullable |
| metadata_json| json      | nullable |
| created_at   | timestamp |       |

**Action examples:**

- project.created
- api_key.created
- api_key.revoked
- module.enabled
- module.disabled
- member.added

---

## 6. MVP Module Tables

All tables in this section are **project-owned** and must include `project_id`.

### Platform users vs project app users

- **`users`** = people using APIArsenal dashboard  
- **`project_users`** = app end-users inside a project’s generated backend  

These must remain separate.

---

### Auth / App Users Module

#### `project_users`

Stores end-users of a project’s API.

| Column            | Type      | Notes |
|-------------------|-----------|-------|
| id                | bigint PK |       |
| project_id        | bigint FK | → projects.id |
| name              | string    |       |
| email             | string    |       |
| password          | string    |       |
| email_verified_at | timestamp | nullable |
| status            | string    |       |
| last_login_at     | timestamp | nullable |
| created_at        | timestamp |       |
| updated_at        | timestamp |       |

**Notes:**

- Unique composite index on `(project_id, email)`
- Status examples: active, suspended

#### `project_user_profiles` *(optional later)*

Skip for MVP if profile fields are small.

---

### Blog Module

#### `post_categories`

| Column      | Type      | Notes |
|-------------|-----------|-------|
| id          | bigint PK |       |
| project_id  | bigint FK | → projects.id |
| name        | string    |       |
| slug        | string    |       |
| description | text      | nullable |
| created_at  | timestamp |       |
| updated_at  | timestamp |       |

- Unique composite index on `(project_id, slug)`

---

#### `posts`

| Column      | Type      | Notes |
|-------------|-----------|-------|
| id          | bigint PK |       |
| project_id  | bigint FK | → projects.id |
| author_id   | bigint FK | nullable → project_users.id |
| category_id | bigint FK | nullable → post_categories.id |
| title       | string    |       |
| slug        | string    |       |
| excerpt     | text      | nullable |
| content     | longtext  |       |
| status      | string    |       |
| published_at| timestamp | nullable |
| created_at  | timestamp |       |
| updated_at  | timestamp |       |

**Notes:**

- Unique composite index on `(project_id, slug)`
- Status examples: draft, published, archived

---

#### `post_comments`

| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | bigint PK |       |
| project_id | bigint FK | → projects.id |
| post_id    | bigint FK | → posts.id |
| user_id    | bigint FK | nullable → project_users.id |
| parent_id  | bigint FK | nullable → post_comments.id |
| body       | text      |       |
| status     | string    |       |
| created_at | timestamp |       |
| updated_at | timestamp |       |

**Notes:**

- `parent_id` for nested comments
- Status examples: visible, hidden, pending

---

#### `post_tags`

| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | bigint PK |       |
| project_id | bigint FK | → projects.id |
| name       | string    |       |
| slug       | string    |       |
| created_at | timestamp |       |
| updated_at | timestamp |       |

- Unique composite index on `(project_id, slug)`

---

#### `post_tag_items`

| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | bigint PK |       |
| project_id | bigint FK | → projects.id |
| post_id    | bigint FK | → posts.id |
| tag_id     | bigint FK | → post_tags.id |
| created_at | timestamp |       |
| updated_at | timestamp |       |

- Unique composite index on `(project_id, post_id, tag_id)`

---

### Media Module

#### `media_files`

| Column       | Type      | Notes |
|--------------|-----------|-------|
| id           | bigint PK |       |
| project_id   | bigint FK | → projects.id |
| uploaded_by  | bigint FK | nullable → project_users.id |
| disk         | string    |       |
| path         | string    |       |
| filename     | string    |       |
| original_name| string    |       |
| extension    | string    | nullable |
| mime_type    | string    |       |
| size         | integer   |       |
| visibility   | string    |       |
| created_at   | timestamp |       |
| updated_at   | timestamp |       |

**Notes:**

- Visibility examples: public, private
- Index on `project_id`

---

### Settings Module

#### `project_settings`

| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | bigint PK |       |
| project_id | bigint FK | → projects.id |
| key        | string    |       |
| value_json | json      | nullable |
| created_at | timestamp |       |
| updated_at | timestamp |       |

**Notes:**

- Unique composite index on `(project_id, key)`
- Use for flexible per-project settings; JSON is acceptable here

---

## 7. Foreign Key Summary

| Table / Column | References |
|----------------|------------|
| projects.owner_id | users.id |
| project_members.project_id | projects.id |
| project_members.user_id | users.id |
| project_modules.project_id | projects.id |
| project_modules.module_id | modules.id |
| module_dependencies.module_id | modules.id |
| module_dependencies.depends_on_module_id | modules.id |
| api_keys.project_id | projects.id |
| usage_logs.project_id | projects.id |
| usage_logs.api_key_id | api_keys.id (nullable) |
| daily_usage_stats.project_id | projects.id |
| audit_logs.project_id | projects.id (nullable) |
| audit_logs.user_id | users.id (nullable) |
| project_users.project_id | projects.id |
| post_categories.project_id | projects.id |
| posts.project_id | projects.id |
| posts.category_id | post_categories.id (nullable) |
| posts.author_id | project_users.id (nullable) |
| post_comments.project_id | projects.id |
| post_comments.post_id | posts.id |
| post_comments.user_id | project_users.id (nullable) |
| post_comments.parent_id | post_comments.id (nullable) |
| post_tags.project_id | projects.id |
| post_tag_items.project_id | projects.id |
| post_tag_items.post_id | posts.id |
| post_tag_items.tag_id | post_tags.id |
| media_files.project_id | projects.id |
| media_files.uploaded_by | project_users.id (nullable) |
| project_settings.project_id | projects.id |

---

## 8. Indexing Priorities

### Always index

- `project_id`
- Foreign keys
- Unique slugs
- Emails where login/search matters
- `created_at` where sorted often
- `status` where filtered often

### Important composite indexes

- `(project_id, slug)`
- `(project_id, email)`
- `(project_id, module_id)`
- `(project_id, key)`
- `(project_id, requested_at)`

---

## 9. Design Decisions

### ID type

- **Recommendation for MVP:** bigint auto-increment IDs internally.
- Public-safe identifiers (e.g. UUID) can be added later if needed.

### Platform vs project users

- Keep **platform users** (`users`) and **project app users** (`project_users`) strictly separate.

### Shared tables with `project_id`

- Yes. Shared tables with `project_id` are the right MVP design for tenancy.

### JSON usage

**Use JSON for:**

- `project_modules.config_json`
- `project_settings.value_json`
- `audit_logs.metadata_json`

**Do not use JSON for:**

- Posts, users, categories, keys, or other core relational content.

---

## 10. Core Schema Summary

| Group | Tables |
|-------|--------|
| **Platform** | users, projects, project_members |
| **Module system** | modules, project_modules, module_dependencies |
| **Access** | api_keys, api_key_scopes (optional later) |
| **Observability** | usage_logs, daily_usage_stats, audit_logs |
| **MVP app-user** | project_users |
| **Blog** | post_categories, posts, post_comments, post_tags, post_tag_items |
| **Media** | media_files |
| **Settings** | project_settings |

---

## Next step

Define the **Module Contract Blueprint** so each module has a consistent structure in Laravel. That document should define:

- Module folder structure
- Required classes per module
- Route registration pattern
- Docs registration pattern
- Seeder pattern
- Enable/disable behavior
