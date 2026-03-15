import { Link } from 'react-router-dom';
import { routes } from '../routes';

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <h1 className="text-2xl font-semibold text-slate-900">404</h1>
            <p className="mt-2 text-slate-600">Page not found.</p>
            <Link to={routes.home} className="mt-4 text-slate-900 font-medium underline">Go home</Link>
        </div>
    );
}
