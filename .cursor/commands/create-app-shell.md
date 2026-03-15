# APIArsenal Command: /create-app-shell

Create the main application shell for APIArsenal.

Stack:
Laravel + React + Inertia + TypeScript + Tailwind.

The layout must follow a modern SaaS dashboard structure inspired by Stripe and Linear.

Layout structure:

Sidebar (left)
Top navigation bar
Main content area

Sidebar items:

Dashboard
Projects
Templates
Resources
API Explorer
Documentation
Settings

Requirements:

• Sidebar should be collapsible
• Active navigation highlighting
• Lucide icons for navigation
• Responsive layout
• Clean spacing
• Modern typography
• Tailwind styling

Topbar should contain:

• Page title
• Global search (optional placeholder)
• User menu dropdown
• Notifications icon placeholder

The layout must be reusable for all pages.

Create:

resources/js/layouts/AppLayout.tsx
