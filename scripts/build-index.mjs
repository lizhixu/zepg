import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function scanMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.vitepress' && file !== '.git') {
        scanMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function extractDocInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(projectRoot, filePath).replace(/\\/g, '/');

  // Extract frontmatter or first H1
  let title = path.basename(filePath, '.md');
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    title = h1Match[1].trim();
  }

  // Clean markdown syntax for plain text search
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text
    .replace(/[#*`~_]/g, '') // markdown formats
    .replace(/\s+/g, ' ')
    .trim();

  return {
    id: relPath,
    title,
    path: relPath,
    excerpt: plainText.slice(0, 200),
    content: plainText
  };
}

export function buildDocIndex() {
  const docsDir = path.join(projectRoot, 'docs');
  const rootMds = ['index.md', 'api-examples.md', 'markdown-examples.md']
    .map(f => path.join(projectRoot, f))
    .filter(f => fs.existsSync(f));

  const allFiles = [...scanMarkdownFiles(docsDir), ...rootMds];
  const docs = allFiles.map(extractDocInfo);

  const outDir = path.join(projectRoot, 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outputPath = path.join(outDir, 'mcp-docs-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2), 'utf-8');
  console.log(`[mcp-index] Successfully indexed ${docs.length} documents -> ${outputPath}`);
  return docs;
}

if (process.argv[1] === __filename) {
  buildDocIndex();
}
