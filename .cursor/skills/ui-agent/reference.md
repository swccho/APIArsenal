# UI Agent Reference

Use this when you need more detail on component patterns or file layout.

## File Conventions

- React components: `resources/js/Components/` (or per-domain)
- Pages (Inertia): `resources/js/Pages/`
- Shared layout: e.g. `resources/js/Layouts/AppLayout.tsx` with sidebar + header
- Tailwind config: extend theme for brand colors if needed; keep palette minimal

## Component Patterns (Stripe/Linear style)

- **Primary button:** Solid, one accent color; use sparingly for main CTA
- **Secondary/ghost:** Border or transparent; for secondary actions
- **Tables:** Header row with subtle background; zebra or hover only; no heavy grid lines
- **Cards:** Light border or shadow-sm; padding consistent (e.g. p-4, p-6)
- **Empty state:** Icon + short message + optional CTA; centered, plenty of whitespace
- **Loading:** Skeleton blocks (rounded, subtle bg) matching content shape; no spinners for full-page

## Typography

- Clear hierarchy: one main title per page (e.g. text-xl or text-2xl), section headings (text-lg), body (text-sm/base)
- Prefer system font stack or one clean sans (e.g. Inter, Geist) for developer-focused feel

## Spacing

- Use Tailwind spacing scale consistently (4, 6, 8 for tight; 6, 8, 12 for content)
- Section gaps: space-y-6 or space-y-8
- Sidebar: comfortable padding; icon + label alignment

## Accessibility

- Buttons and links: focus ring (e.g. `focus:ring-2 focus:ring-offset-2`)
- Form inputs: associate label with input (id/for or aria-label)
- Tables: use semantic `<table>`, `<th>`, `<td>`; scope on headers
