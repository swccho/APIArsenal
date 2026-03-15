const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Ensure we have a CSRF cookie for stateful SPA (Sanctum).
 * Call before login/register.
 */
export async function ensureCsrfCookie() {
    await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
    });
}

function getCsrfToken() {
    const name = 'XSRF-TOKEN=';
    const decoded = decodeURIComponent(document.cookie);
    const parts = decoded.split(';');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        if (part.indexOf(name) === 0) {
            return part.substring(name.length);
        }
    }
    return null;
}

/**
 * API request with credentials, JSON, and CSRF for mutations.
 */
export async function api(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const { method = 'GET', body, ...rest } = options;
    const isMutation = method !== 'GET' && method !== 'HEAD';
    const headers = {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...options.headers,
    };
    if (isMutation) {
        const csrf = getCsrfToken();
        if (csrf) headers['X-XSRF-TOKEN'] = csrf;
    }
    const res = await fetch(url, {
        ...rest,
        method,
        headers,
        credentials: 'include',
        ...(body !== undefined && { body: JSON.stringify(body) }),
    });
    return res;
}

/**
 * Normalize API error response to { code, message, fields }.
 */
export function normalizeApiError(response) {
    if (!response || !response.error) {
        return { code: 'unknown', message: 'An error occurred.', fields: null };
    }
    const e = response.error;
    return {
        code: e.code || 'error',
        message: e.message || 'An error occurred.',
        fields: e.fields ?? null,
    };
}
