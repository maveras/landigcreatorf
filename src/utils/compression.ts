import { LandingConfig } from '../types';

/**
 * Encodes the configuration object into a Base64 string for URL sharing.
 * Warning: This is not efficient for large binary data (images).
 */
export const encodeState = (config: LandingConfig): string => {
    try {
        const json = JSON.stringify(config);
        // Use btoa for simple Base64 encoding. 
        // In a real app, lz-string would be better for compression.
        return btoa(encodeURIComponent(json));
    } catch (e) {
        console.error('Error encoding state:', e);
        return '';
    }
};

/**
 * Decodes the Base64 string back into a configuration object.
 */
export const decodeState = (encoded: string): LandingConfig | null => {
    try {
        const json = decodeURIComponent(atob(encoded));
        return JSON.parse(json);
    } catch (e) {
        console.error('Error decoding state:', e);
        return null;
    }
};
