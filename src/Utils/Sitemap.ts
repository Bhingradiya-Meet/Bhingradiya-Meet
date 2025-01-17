/**
 *  @FileID          Utils\Sitemap.ts
 *  @Description     Currently, there is no description available.
 *  @Author          @MeetBhingradiya
 *  
 *  -----------------------------------------------------------------------------
 *  Copyright (c) 2025 Meet Bhingradiya
 *  All rights reserved.
 *  
 *  This file is part of the @MeetBhingradiya's Portfolio project and is protected under copyright
 *  law. Unauthorized copying of this file, via any medium, is strictly prohibited
 *  without explicit permission from the author.
 *  
 *  -----------------------------------------------------------------------------
 *  @created 13/01/25 11:34 AM IST (Kolkata +5:30 UTC)
 *  @modified 14/01/25 3:22 PM IST (Kolkata +5:30 UTC)
 */

/**
 * Generates the XML header for the sitemap.
 * @param data - The XML content to wrap.
 * @returns The XML-wrapped string.
 */
function XMLWrap(data: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n${data}`;
}

/**
 * Wraps a set of URLs in a sitemap `<urlset>` tag.
 * @param data - The combined URL items as a string.
 * @returns The `<urlset>` wrapped string.
 */
function SitemapURLSetWrap(data: string): string {
    return `<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
${data}
</urlset>`;
}

/**
 * Wraps a set of sitemap indices in a `<sitemapindex>` tag.
 * @param data - The combined sitemap index items as a string.
 * @returns The `<sitemapindex>` wrapped string.
 */
function SitemapIndexWrap(data: string): string {
    return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${data}
</sitemapindex>`;
}

/**
 * Generates a single sitemap index item.
 * @param endpoint - The URL of the sitemap index item.
 * @returns The generated `<sitemap>` string.
 */
function SitemapIndexItemWrap(endpoint: string): string {
    if (!endpoint) throw new Error('Endpoint is required for SitemapIndexItemWrap.');
    return `<sitemap>
<loc>${endpoint}</loc>
</sitemap>`;
}

/**
 * Generates a single URL item for the sitemap.
 * @param params - The parameters for the URL item.
 * @returns The generated `<url>` string.
 */
function SitemapItemWrap({
    endpoint,
    lastmod = new Date().toISOString(),
    frequency = 'weekly',
    priority = 0.5,
    alternates = []
}: {
    endpoint: string;
    lastmod?: string | Date;
    frequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: { lang: string; url: string }[];
}): string {
    if (!endpoint) throw new Error('Endpoint is required for SitemapItemWrap.');

    const alternateLinks = alternates
        .map(
            ({ lang, url }) =>
                `<xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`
        )
        .join('\n');

    return `<url>
<loc>${endpoint}</loc>
<lastmod>${lastmod instanceof Date ? lastmod.toISOString() : lastmod}</lastmod>
<changefreq>${frequency}</changefreq>
<priority>${priority}</priority>
${alternateLinks}
</url>`;
}

/**
 * Combines multiple sitemap items into a single sitemap URL set.
 * @param items - Array of sitemap items as strings.
 * @returns The complete `<urlset>` wrapped sitemap.
 */
function generateSitemap(items: string[]): string {
    const content = items.join('\n');
    return XMLWrap(SitemapURLSetWrap(content));
}

/**
 * Combines multiple sitemap index items into a single sitemap index.
 * @param items - Array of sitemap index items as strings.
 * @returns The complete `<sitemapindex>` wrapped sitemap index.
 */
function generateSitemapIndex(items: string[]): string {
    const content = items.join('\n');
    return XMLWrap(SitemapIndexWrap(content));
}

export {
    generateSitemap,
    generateSitemapIndex,
    SitemapItemWrap,
    SitemapIndexItemWrap
}