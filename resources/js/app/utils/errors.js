import { normalizeApiError } from '../lib/api';

/**
 * Get a single display message from an API error (normalized shape or raw response body).
 */
export function getErrorMessage(error) {
    if (!error) return 'An error occurred.';
    if (error.message && !error.error) return error.message;
    const normalized = normalizeApiError(error);
    return normalized.message || 'An error occurred.';
}
