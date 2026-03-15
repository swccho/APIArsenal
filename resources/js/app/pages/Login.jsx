import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/auth';
import { getErrorMessage } from '../utils/errors';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFormField } from '../components/AuthFormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { AuthFooterLinks } from '../components/AuthFooterLinks';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setFieldErrors(null);
        setLoading(true);
        try {
            const data = await login({ email, password, remember });
            setUser(data);
            navigate(location.state?.from?.pathname ?? routes.dashboard, { replace: true });
        } catch (err) {
            setError(getErrorMessage(err));
            if (err.fields) setFieldErrors(err.fields);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard>
            <AuthHeader
                welcomeText="Welcome back"
                title="Log in"
                subtitle="Enter your credentials to access your account."
            />
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
                aria-label="Log in"
                noValidate
            >
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {error}
                    </div>
                )}
                <AuthFormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={fieldErrors?.email}
                />
                <AuthFormField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={fieldErrors?.password}
                />
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <PrimaryButton type="submit" loading={loading}>
                    {loading ? 'Logging in…' : 'Log in'}
                </PrimaryButton>
            </form>
            <AuthFooterLinks
                primary={{
                    text: "Don't have an account?",
                    linkText: 'Sign up',
                    to: routes.register,
                }}
                secondary={{
                    linkText: 'Forgot password?',
                    to: routes.forgotPassword,
                }}
            />
        </AuthCard>
    );
}
