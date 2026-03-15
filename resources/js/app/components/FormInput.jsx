export function FormInput({
    id,
    label,
    type = 'text',
    placeholder,
    autoComplete,
    error,
    className = '',
    ...inputProps
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
