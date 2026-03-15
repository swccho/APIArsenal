export function PrimaryButton({ children, type = 'button', disabled = false, loading = false, className = '', ...props }) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`w-full rounded-lg bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-[background-color,transform] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${className}`.trim()}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                    <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
