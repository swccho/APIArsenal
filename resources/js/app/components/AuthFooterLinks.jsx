import { Link } from 'react-router-dom';

export function AuthFooterLinks({ primary, secondary }) {
    return (
        <div className="mt-8 space-y-3 text-center">
            <p className="text-sm text-slate-600">
                {primary.text}{' '}
                <Link
                    to={primary.to}
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                    {primary.linkText}
                </Link>
            </p>
            {secondary && (
                <p className="text-sm">
                    <Link
                        to={secondary.to}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        {secondary.linkText}
                    </Link>
                </p>
            )}
        </div>
    );
}
