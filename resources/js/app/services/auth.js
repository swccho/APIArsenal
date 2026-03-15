import { ensureCsrfCookie, api, normalizeApiError } from '../lib/api';

export async function login(credentials) {
    await ensureCsrfCookie();
    const res = await api('/api/auth/login', {
        method: 'POST',
        body: credentials,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw normalizeApiError(data);
    }
    return data.data;
}

export async function register(payload) {
    await ensureCsrfCookie();
    const res = await api('/api/auth/register', {
        method: 'POST',
        body: payload,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw normalizeApiError(data);
    }
    return data.data;
}

export async function logout() {
    const res = await api('/api/auth/logout', { method: 'POST' });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw normalizeApiError(data);
    }
}

export async function getCurrentUser() {
    const res = await api('/api/auth/me');
    if (res.status === 401) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return null;
    return data.data ?? null;
}
