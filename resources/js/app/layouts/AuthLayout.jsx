import { Outlet } from 'react-router-dom';
import { AuthBrandPanel } from '../components/AuthBrandPanel';
import { AnimatedAuthBackground } from '../components/AnimatedAuthBackground';

export function AuthLayout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <AnimatedAuthBackground />

            <div className="flex min-h-screen flex-col lg:flex-row">
                {/* Brand panel: left on desktop, top on mobile */}
                <div className="flex shrink-0 flex-col justify-center border-b border-slate-200/60 bg-white/50 backdrop-blur-sm lg:w-[44%] lg:border-b-0 lg:border-r lg:bg-white/30">
                    <AuthBrandPanel />
                </div>

                {/* Auth card area: right on desktop, below on mobile */}
                <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
                    <main className="w-full max-w-sm sm:max-w-md" role="main" aria-label="Authentication">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
