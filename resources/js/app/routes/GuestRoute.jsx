import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from './index';
import { useAuth } from '../hooks/useAuth';

export function GuestRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <span className="text-slate-500">Loading…</span>
            </div>
        );
    }

    if (user) {
        return <Navigate to={location.state?.from?.pathname ?? routes.dashboard} replace />;
    }

    return <Outlet />;
}
