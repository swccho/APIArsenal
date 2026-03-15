# APIArsenal — User Flow

User flow is the most important part of APIArsenal. If the first experience is confusing, developers will leave immediately.

We design a **very smooth "first success" journey** where a developer gets a working API in **under 2 minutes**.

---

# Flow in 4 Stages

1. **Discovery**
2. **Onboarding**
3. **First API Success**
4. **Daily Usage**

---

# 1️⃣ Discovery Flow (Landing Page → Signup)

**Goal:** Convince developers that they can get a backend **instantly**.

## Landing Page

**Main message:**

> **Instant real backends for modern apps**

**Hero section:**

```
Create a project
Enable backend modules
Get production-ready APIs
```

**CTA buttons:**

```
Start Building
View API Demo
```

---

## Demo Section (very important)

Developers should see **real API examples immediately**.

**Example endpoints:**

```
GET /posts
POST /posts
GET /posts/{id}
```

**Example response:**

```json
{
  "id": 1,
  "title": "Hello World",
  "content": "First post",
  "created_at": "2026-01-01"
}
```

This builds trust.

---

## Signup

Signup should be **extremely simple**.

**Fields:**

- Name
- Email
- Password

**Optional later:**

- Sign up with GitHub

**After signup** → user goes to **Project Creation**.

---

# 2️⃣ Onboarding Flow

**Goal:** Help user create **their first backend quickly**.

## Step 1 — Create Project

**Form:**

- Project Name
- Project Slug (auto-generated)
- Description (optional)

**Example:**

```
Project Name: My Blog App
Slug: my-blog-app
```

**Action:** Click **Create Project** → project is instantly created.

---

## Step 2 — Choose Modules

User selects modules. This should feel like **installing packages**.

**Heading:**

```
Choose modules for your backend
```

**Module cards:**

- Auth
- Users
- Blog
- Media
- Settings

**Example selection:**

- ✓ Auth
- ✓ Blog
- ✓ Media

**Action:** Click **Enable Modules** → system installs modules.

---

## Step 3 — Demo Data Option

User chooses:

- **Empty database**
- **Generate demo data**

**Example copy:**

```
Generate demo data (recommended for testing)
```

This creates:

- posts
- categories
- comments

Now the developer instantly has data.

---

# 3️⃣ First API Success (MOST IMPORTANT)

This is the **magic moment**.

The user should immediately see:

```
Your API is ready
```

**Display:**

**Base URL:**

```
https://api.apiarsenal.dev/v1
```

**Project API Key:**

```
ars_live_xxxxx
```

---

## Example Request

**Endpoint:** `GET /posts`

**Example code snippet (JavaScript):**

```javascript
fetch("https://api.apiarsenal.dev/v1/posts", {
  headers: {
    Authorization: "Bearer ars_live_xxxxx"
  }
})
```

**Action:** User clicks **Try API** → interactive API explorer opens.

Response appears instantly.

**Success message:**

```
Success!
You just called your first API.
```

This moment is critical.

---

## Quick Start Panel (recommended UX)

After project creation, show a **Quick Start panel**:

```
1. Copy API key
2. Try first request
3. View API docs
```

This guides new users.

---

# 4️⃣ Dashboard Experience (Daily Usage)

Once the user has a project, they manage it from the dashboard.

## Main Sidebar

- Dashboard
- Projects
- Modules
- API Keys
- Usage
- Documentation
- Settings

---

## Project Dashboard

**Example view:**

```
Project: My Blog App
```

**Summary cards:**

- Enabled Modules
- API Requests Today
- API Errors
- Active API Keys

---

## Modules Page

Users can install or remove modules.

**Installed modules example:**

- Auth
- Blog
- Media

**Available modules example:**

- Chat
- Orders
- Products
- Notifications

**Action:** Click **Install** → module activates instantly.

---

## API Keys Page

Users manage authentication keys.

**Example keys:**

- **Primary Key:** `ars_live_9283hjh`
- **Development Key:** `ars_dev_23sdf`

**Options:**

- Create new key
- Regenerate key
- Delete key

---

## Documentation Page

Auto-generated documentation.

**Sections example:**

- Auth API
- Blog API
- Media API

**Each endpoint shows:**

- URL
- Method
- Request body
- Response example
- Code snippets

**Example:** `POST /posts`

**Body:**

```json
{
  "title": "New post",
  "content": "Hello world"
}
```

---

## API Playground

Developers can test endpoints.

**Example:** `GET /posts`

**Action:** Click **Send Request** → response appears.

This is extremely useful.

---

# 5️⃣ Real Developer Workflow

Example: developer building a React frontend.

**Steps:**

1. Create project
2. Enable modules
3. Get API key
4. Call endpoints

**Example endpoints used:**

```
GET /posts
POST /posts
POST /auth/login
```

Their frontend becomes fully functional.

---

# 6️⃣ Returning User Flow

When a user returns later:

**Login** → **Dashboard**

They can:

- Create new project
- Add modules
- Check usage
- View logs
- Test APIs

---

# 7️⃣ Error Handling Flow

Developers should get **clear API errors**.

**Example — Unauthorized:**

```json
{
  "error": "Unauthorized",
  "message": "Invalid API key"
}
```

**Example — Validation error:**

```json
{
  "error": "Validation failed",
  "fields": {
    "title": ["Title is required"]
  }
}
```

This improves developer experience.

---

# 8️⃣ Ideal Time to First Success

**Target:**

```
Signup → First API response
under 90 seconds
```

If we achieve this, APIArsenal will feel **magical**.
