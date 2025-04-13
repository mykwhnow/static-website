const fs = require('fs-extra');
const matter = require('gray-matter');
const path = require('path');
const { execSync } = require('child_process');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const META_DIR = path.join(__dirname, '../data');
const META_FILE = path.join(META_DIR, 'posts-meta.json');

const isMarkdown = (filename) => filename.endsWith('.md');

// Recursively collect all markdown files in a directory
const getMarkdownFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getMarkdownFiles(fullPath) : fullPath;
    })
  );
  return files.flat().filter((file) => isMarkdown(file));
};

(async () => {
  const files = await getMarkdownFiles(POSTS_DIR);
  const posts = [];

  for (const file of files) {
    const slug = path.relative(POSTS_DIR, file).replace(/\.md$/, '');
    const content = await fs.readFile(file, 'utf-8');
    const { data } = matter(content);

    // Get the most recent commit date for the file
    let modified_date = null;
    try {
      modified_date = execSync(`git log -1 --format=%ci ${file}`, { encoding: 'utf-8' }).trim();
    } catch (error) {
      console.warn(`⚠️ Could not fetch modified_date for ${file}:`, error.message);
    }

    posts.push({
      slug,
      ...data,
      modified_date,
    });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Ensure the directory exists
  await fs.ensureDir(META_DIR);
  await fs.writeJson(META_FILE, posts, { spaces: 2 });

  console.log(`✅ Generated ${posts.length} entries in ${META_FILE}`);
})();
