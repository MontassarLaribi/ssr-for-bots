/**
 * https://developers.google.com/web/tools/puppeteer/articles/ssr#reuseinstance
 * @param {string} url URL to prerender.
 */
declare function ssr(url: string, useCache: boolean, cacheRefreshRate: number): Promise<{
    html: any;
    status: number;
}>;
declare function clearCache(): void;
export { ssr, clearCache };
