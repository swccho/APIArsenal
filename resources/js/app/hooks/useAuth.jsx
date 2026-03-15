import { useState, useEffect, createContext, useContext } from 'react';
import { getCurrentUser } from '../services/auth';

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((u) => setUser(u))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const value = { user, setUser, loading };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
