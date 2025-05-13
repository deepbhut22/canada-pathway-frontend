import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');
const outFile = path.join(process.cwd(), 'src/data/blogs.json');

const posts = fs.readdirSync(postsDir).map((filename) => {
    const slug = filename.replace('.md', '');
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        ...data,
        content,
    };
});

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`✅ Parsed ${posts.length} blog posts.`);
