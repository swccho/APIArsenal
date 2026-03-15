import { Link } from 'react-router-dom';

export function AuthFooterLink({ text, linkText, to }) {
    return (
        <p className="mt-6 text-center text-sm text-slate-600">
            {text}{' '}
            <Link to={to} className="font-medium text-slate-900 hover:text-slate-700">
                {linkText}
            </Link>
        </p>
    );
}
