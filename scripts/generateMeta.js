const fs = require('fs-extra');
const matter = require('gray-matter');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const META_DIR = path.join(__dirname, '../data');
const META_FILE = path.join(META_DIR, 'posts-meta.json');

const isMarkdown = (filename) => filename.endsWith('.md');

(async () => {
  const files = await fs.readdir(POSTS_DIR);
  const posts = [];

  for (const file of files) {
    if (!isMarkdown(file)) continue;

    const slug = file.replace(/\.md$/, '');
    const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(content);

    posts.push({
      slug,
      ...data,
    });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Ensure the directory exists
  await fs.ensureDir(META_DIR);
  await fs.writeJson(META_FILE, posts, { spaces: 2 });

  console.log(`✅ Generated ${posts.length} entries in ${META_FILE}`);
})();
