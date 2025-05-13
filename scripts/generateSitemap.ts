// scripts/generate-sitemap.ts
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readdirSync } from 'fs';
import { resolve } from 'path';

(async () => {
    const blogDir = resolve('src/content'); // path to your Markdown posts
    const pages = readdirSync(blogDir).filter((file) => file.endsWith('.md'));

    const sitemap = new SitemapStream({ hostname: 'https://pathpr.ca' });
    const writeStream = createWriteStream('public/sitemap.xml');
    sitemap.pipe(writeStream);

    // Static routes
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

    // Blog posts
    for (const file of pages) {
        const slug = file.replace(/\.md$/, '');
        sitemap.write({ url: `/blog/${slug}`, changefreq: 'weekly', priority: 0.8 });
    }

    sitemap.end();
    await streamToPromise(writeStream as any);
    console.log('✅ sitemap.xml generated');
})();
