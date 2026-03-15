# APIArsenal Implementation Order

Follow the **phased implementation order** so the project is built in the safest sequence.

**Canonical reference:** `docs/IMPLEMENTATION_ORDER.md`

---

## Summary

**Order:** Foundation → Platform control → Runtime skeleton → Users → Blog → Media → Settings → Docs → Observability → App-user Auth

**Checklist (do in this order):**

1. Shared foundation  
2. Tenancy foundation  
3. Core migrations  
4. Module registry foundation  
5. Projects domain  
6. API keys domain  
7. Project modules domain  
8. Runtime middleware pipeline  
9. Users module  
10. Blog module  
11. Media module  
12. Settings module  
13. Docs engine  
14. Usage + audit  
15. App-user auth module  

---

## When starting Phase 1

Use this prompt (or equivalent) to implement Phase 1 only:

```md
Implement Phase 1 of APIArsenal.

Focus only on:
- shared foundation classes
- tenancy foundation
- module registry foundation
- core migrations

Follow:
- .cursor/system/apiarsenal-brain.md
- docs/FOLDER_STRUCTURE.md
- docs/SCHEMA_BLUEPRINT.md (or database-schema.md)
- docs/MODULE_CONTRACT_BLUEPRINT.md (or module-contract.md)
- .cursor/rules/api-arsenal-architecture.mdc
- .cursor/rules/api-arsenal-backend.mdc
- .cursor/rules/api-arsenal-testing.mdc

Do not implement full feature modules yet.
Keep architecture clean and production-ready.
```

After Phase 1 is done, implement the **Projects domain** next, then API keys, then Project modules, then runtime pipeline, then Users, Blog, etc. as in `docs/IMPLEMENTATION_ORDER.md`.

---

## Follow-up prompts (after each phase)

- **After Phase 1:** "Implement the Projects platform domain fully. Follow all docs and Cursor rules."
- **After Projects:** "Implement the ApiKeys platform domain fully."
- **After ApiKeys:** "Implement the ProjectModules platform domain fully."
- **After platform control:** "Implement the runtime middleware pipeline and route loading. Follow docs/IMPLEMENTATION_ORDER.md Phase 3."
- **After runtime skeleton:** "Implement the Users module fully."
- **After Users:** "Implement the Blog module fully."
- Then Media, Settings, Docs engine, Usage + audit, App-user Auth as in the doc.

Always respect `docs/IMPLEMENTATION_ORDER.md` when choosing what to build next.
