# APIArsenal Command: /generate-api-endpoint

Generate a REST API endpoint.

**Follow:**
- REST conventions
- Request validation using FormRequest
- Action-based business logic
- API Resource responses

**Structure:** Controller → Request → Action → Resource → Test

**Rules:**

**Controllers must:**
- Receive request
- Authorize
- Call action
- Return resource

**Actions must:**
- Contain business logic
- Operate on tenant-safe models

**Responses must follow:**

Success:
```json
{
  "data": {}
}
```

List:
```json
{
  "data": [],
  "meta": {}
}
```

Error:
```json
{
  "error": {
    "code": "",
    "message": ""
  }
}
```
