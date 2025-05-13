// scripts/generateSitemap.ts or .js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readdirSync } from 'fs';
import { resolve } from 'path';

(async () => {
    const blogDir = resolve('./posts');
    const pages = readdirSync(blogDir).filter((file) => file.endsWith('.md'));

    const sitemap = new SitemapStream({ hostname: 'https://pathpr.ca' });
    const writeStream = createWriteStream('public/sitemap.xml');

    // Pipe sitemap output to file
    sitemap.pipe(writeStream);

    // Write static pages
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

    // Write blog posts
    for (const file of pages) {
        const slug = file.replace(/\.md$/, '');
        sitemap.write({ url: `/blog/${slug}`, changefreq: 'weekly', priority: 0.8 });
    }

    sitemap.end();

    // ✅ FIX: Pass the sitemap stream (not the file write stream)
    await streamToPromise(sitemap);

    console.log('✅ sitemap.xml generated');
})();
