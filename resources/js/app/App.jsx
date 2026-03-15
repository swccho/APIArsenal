import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { routes } from './routes';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { DashboardPage } from './pages/Dashboard';
import { NotFoundPage } from './pages/NotFound';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { GuestRoute } from './routes/GuestRoute';

export default function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path={routes.login} element={<LoginPage />} />
                        <Route path={routes.register} element={<RegisterPage />} />
                        <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
                    </Route>
                </Route>
                <Route
                    path={routes.dashboard}
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />
                </Route>
                <Route path={routes.home} element={<Navigate to={routes.dashboard} replace />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
