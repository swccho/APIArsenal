import { routes } from '../routes';
import { AuthCard } from '../components/AuthCard';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFormField } from '../components/AuthFormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { AuthFooterLinks } from '../components/AuthFooterLinks';

export function ForgotPasswordPage() {
    return (
        <AuthCard>
            <AuthHeader
                title="Forgot password?"
                subtitle="Enter your email and we'll send you a reset link."
            />
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <AuthFormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                />
                <PrimaryButton type="submit">Send reset link</PrimaryButton>
            </form>
            <AuthFooterLinks
                primary={{
                    text: 'Back to',
                    linkText: 'Log in',
                    to: routes.login,
                }}
            />
        </AuthCard>
    );
}
