# APIArsenal Command: /create-platform-domain

Create a new platform domain.

**Place it in:**
```
app/Domains/Platform/{DomainName}
```

**Include:**
- Model
- Actions
- Requests
- Controller
- Resource
- Policy if required
- Tests

**Structure example:**
```
app/Domains/Platform/{DomainName}/
- Models/
- Actions/
- Http/
  - Controllers/
  - Requests/
  - Resources/
- Policies/
- Queries/
- Support/
```

**Rules:**
- Platform domains manage platform infrastructure
- Platform domains must NOT contain module logic
- Controllers must stay thin
- Business logic must live in actions

**Examples of platform domains:** Projects, ApiKeys, ProjectMembers, ProjectModules, Usage, Audit, Documentation
