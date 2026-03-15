export function AuthHeader({ title, subtitle, welcomeText }) {
    return (
        <div className="mb-8">
            {welcomeText && (
                <p className="text-sm font-medium text-slate-500">{welcomeText}</p>
            )}
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            )}
        </div>
    );
}
