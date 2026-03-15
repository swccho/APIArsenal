import { Outlet } from 'react-router-dom';

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="h-14 shrink-0 border-b border-slate-200 bg-white px-4 flex items-center">
                <span className="font-semibold text-slate-800">APIArsenal</span>
            </header>
            <div className="flex flex-1">
                <aside className="w-56 shrink-0 border-r border-slate-200 bg-white hidden md:block" aria-label="Sidebar">
                    {/* Sidebar placeholder for Step 2 */}
                </aside>
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
