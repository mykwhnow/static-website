# Static Website for MyKWHNow

This repository contains the source code and assets for the static website of MyKWHNow.com. It includes content, scripts, and workflows to automate metadata generation for blog posts.

## Features

- **Static Content**: Markdown-based blog posts stored in `content/posts/`.
- **Automated Metadata Generation**: A GitHub Actions workflow (`generate-meta.yml`) automatically generates metadata for blog posts and commits the changes to the repository.
- **Node.js Scripts**: Custom scripts for processing content and generating metadata.

## Repository Structure

- `content/posts/`: Markdown files for blog posts.
- `scripts/`: Custom Node.js scripts, including `generateMeta.js` for metadata generation.
- `data/posts-meta.json`: Auto-generated metadata file for blog posts.
- `.github/workflows/generate-meta.yml`: GitHub Actions workflow for automating metadata generation.


## Publishing a New Post

To publish a new blog post, follow these steps:

1. **Create a New Markdown File**:
   - Add a new `.md` file in the `content/posts/` directory.
   - Use the following structure for the frontmatter at the top of the file:
     ```yaml
     ---
     title: "Your Post Title"
     date: "YYYY-MM-DD"
     author: "Your Name"
     tags: ["tag1", "tag2"]
     ---
     ```
   - Write the content of your post below the frontmatter.

1. **Commit and Push Changes**:
   - Save the new Markdown file and commit it to the repository:
     ```bash
     git add content/posts/your-new-post.md
     git commit -m "Add new post: Your Post Title"
     git push
     ```

1. **Trigger Metadata Generation**:
   - The `generate-meta.yml` GitHub Actions workflow will automatically run when you push the new post to the `main` branch.
   - This workflow will update the [posts-meta.json](http://_vscodecontentref_/1) file with metadata for the new post.


By following these steps, your new post will be published and included in the website's metadata automatically.