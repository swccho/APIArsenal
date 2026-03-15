export function AuthCard({ children, className = '' }) {
    return (
        <div
            className={`w-full rounded-2xl border border-slate-200/80 bg-white/95 p-8 shadow-lg shadow-slate-200/50 backdrop-blur sm:p-10 ${className}`.trim()}
        >
            {children}
        </div>
    );
}
