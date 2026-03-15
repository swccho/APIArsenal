import { Navigate, useLocation } from 'react-router-dom';
import { routes } from './index';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <span className="text-slate-500">Loading…</span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={routes.login} state={{ from: location }} replace />;
    }

    return children;
}
