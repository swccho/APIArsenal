import { useState } from 'react';

function EyeIcon({ open }) {
    return (
        <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
        >
            {open ? (
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </>
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            )}
        </svg>
    );
}

export function AuthFormField({
    id,
    label,
    type = 'text',
    placeholder,
    autoComplete,
    error,
    className = '',
    ...inputProps
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-[border-color,box-shadow] duration-200 ease-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isPassword ? 'pr-11' : ''}`}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...inputProps}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        <EyeIcon open={showPassword} />
                    </button>
                )}
            </div>
            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
