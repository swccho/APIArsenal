/**
 * Reusable ambient background for auth pages (login, register, forgot password).
 * Subtle grid drift + soft floating glows. CSS-only, GPU-friendly.
 */
export function AnimatedAuthBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
            aria-hidden
        >
            {/* Base gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"
                aria-hidden
            />

            {/* Animated grid: faint diagonal drift (respects prefers-reduced-motion) */}
            <div
                className="auth-bg-animate-grid absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #0f172a 1px, transparent 1px),
                        linear-gradient(to bottom, #0f172a 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px',
                }}
                aria-hidden
            />

            {/* Soft floating glows (respects prefers-reduced-motion) */}
            <div
                className="auth-bg-animate-glow-1 absolute -right-1/4 top-0 h-[70vh] w-[70vh] max-w-[600px] rounded-full bg-indigo-200/25 blur-3xl will-change-transform"
                aria-hidden
            />
            <div
                className="auth-bg-animate-glow-2 absolute -left-1/4 bottom-0 h-[50vh] w-[50vh] max-w-[400px] rounded-full bg-slate-300/20 blur-3xl will-change-transform"
                aria-hidden
            />
            <div
                className="auth-bg-animate-glow-3 absolute right-1/3 top-1/2 h-[40vh] w-[40vh] max-w-[320px] rounded-full bg-indigo-100/30 blur-3xl will-change-transform"
                aria-hidden
            />
        </div>
    );
}
