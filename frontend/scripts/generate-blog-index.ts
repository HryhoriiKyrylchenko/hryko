// @ts-ignore
import fg from 'fast-glob';
import { readFile, writeFile } from 'fs/promises';
// @ts-ignore
import matter from 'gray-matter';
import readingTime from 'reading-time';
// @ts-ignore
import path from 'path';
import {BlogPostMeta} from '../src/app/core/models/blog-post.model';

interface Frontmatter {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories?: string[];
  tags?: string[];
}

const CONTENT_DIR = path.join(process.cwd(), 'src/assets/content');
const OUTPUT_FILE = path.join(process.cwd(), 'src/assets/generated/blog-index.json');

async function generate() {
  const files = await fg(`${CONTENT_DIR}/**/*.md`);

  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const raw = await readFile(file, 'utf-8');
    const fileData = matter(raw);
    const data = fileData.data as Partial<Frontmatter>;

    if (!data.id || !data.slug || !data.title || !data.excerpt || !data.date) {
      throw new Error(`Missing required frontmatter in ${fileData.orig}`);
    }

    const relativePath = path.relative(CONTENT_DIR, file);
    const [lang] = relativePath.split(path.sep);

    posts.push({
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      categories: data.categories || [],
      tags: data.tags || [],
      readingTime: Math.ceil(readingTime(fileData.content).minutes),
      path: relativePath.replace(/\\/g, '/'),
      lang
    });
  }

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  await writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');

  console.log(`Generated ${posts.length} posts`);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
