/**
 * Base path for GitHub Pages deployment.
 * NEXT_PUBLIC_BASE_PATH is set during build time and inlined into client bundles.
 * In development it's empty, in production it's '/degrasoft-landing'.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
