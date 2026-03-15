import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useAuth } from '../hooks/useAuth';
import { register as registerUser } from '../services/auth';
import { getErrorMessage } from '../utils/errors';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFormField } from '../components/AuthFormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { AuthFooterLinks } from '../components/AuthFooterLinks';

export function RegisterPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setFieldErrors(null);
        setLoading(true);
        try {
            const data = await registerUser({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setUser(data);
            navigate(routes.dashboard, { replace: true });
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
                title="Create account"
                subtitle="Get started with APIArsenal in a few seconds."
            />
            <form className="space-y-5" onSubmit={handleSubmit} aria-label="Create account" noValidate>
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {error}
                    </div>
                )}
                <AuthFormField
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={fieldErrors?.name}
                />
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={fieldErrors?.password}
                />
                <AuthFormField
                    id="password_confirmation"
                    label="Confirm password"
                    type="password"
                    autoComplete="new-password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    error={fieldErrors?.password_confirmation}
                />
                <PrimaryButton type="submit" loading={loading}>
                    {loading ? 'Creating account…' : 'Sign up'}
                </PrimaryButton>
            </form>
            <AuthFooterLinks
                primary={{
                    text: 'Already have an account?',
                    linkText: 'Log in',
                    to: routes.login,
                }}
            />
        </AuthCard>
    );
}
