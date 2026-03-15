export function AuthBrandPanel() {
    return (
        <div className="relative flex min-h-[280px] flex-col justify-center px-8 py-12 pb-16 lg:min-h-0 lg:px-12 lg:py-16 lg:pb-20">
            {/* Subtle grid and glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px),
 linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
            <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
            <div className="absolute bottom-1/4 left-0 h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />

            <div className="relative min-h-0 overflow-visible">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                    APIArsenal
                </h1>
                <span className="mt-2 inline-block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Developer Platform
                </span>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-600 lg:text-lg">
                    Build, mock, and test APIs in one place. Developer infrastructure for rapid
                    backend prototyping.
                </p>
            </div>
        </div>
    );
}
