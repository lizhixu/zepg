import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadDocIndex() {
  const possiblePaths = [
    path.join(projectRoot, 'public/mcp-docs-index.json'),
    path.join(projectRoot, '.vitepress/dist/mcp-docs-index.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
      } catch (err) {
        console.error('Failed to parse index at:', p, err);
      }
    }
  }
  return [];
}

function createServer() {
  const server = new McpServer({
    name: 'zepg-docs-mcp',
    version: '1.0.0'
  });

  // Tool 1: 关键词搜索文档
  server.tool(
    'search_docs',
    '在 ZEPG 知识库中根据关键词搜索相关的文档章节与摘要',
    {
      keyword: z.string().describe('搜索关键词，例如 ADB, Git, XEpg, 语音控制 等')
    },
    async ({ keyword }) => {
      const docs = loadDocIndex();
      const kw = keyword.toLowerCase().trim();

      const matched = docs
        .map(doc => {
          let score = 0;
          if (doc.title.toLowerCase().includes(kw)) score += 10;
          if (doc.path.toLowerCase().includes(kw)) score += 5;
          if (doc.content.toLowerCase().includes(kw)) score += 2;

          return { ...doc, score };
        })
        .filter(doc => doc.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ id, title, path, excerpt }) => ({ id, title, path, excerpt }));

      return {
        content: [
          {
            type: 'text',
            text: matched.length > 0
              ? JSON.stringify(matched, null, 2)
              : `未找到与 "${keyword}" 相关的文档内容。`
          }
        ]
      };
    }
  );

  // Tool 2: 获取单篇文档完整内容（仅从已索引的内存缓存中读取，杜绝文件系统路径穿越）
  server.tool(
    'read_doc',
    '获取指定路径的文档详细内容',
    {
      path: z.string().describe('文档相对路径，如 docs/adb/各厂家开启ADB的方法.md')
    },
    async ({ path: docPath }) => {
      const docs = loadDocIndex();
      // 只从预构建的索引中精确匹配，不执行任何动态路径文件读取
      const doc = docs.find(d => d.path === docPath || d.id === docPath);
      if (doc) {
        return {
          content: [
            {
              type: 'text',
              text: `# ${doc.title}\n文件路径: ${doc.path}\n\n${doc.content}`
            }
          ]
        };
      }

      return {
        content: [{ type: 'text', text: `未找到文档: ${docPath}` }]
      };
    }
  );

  return server;
}

export default async function handler(req, res) {
  // CORS 限制为可信域名
  const allowedOrigins = [
    'https://zepg.dev.tc',
    'https://zepg.vercel.app'
  ];
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, mcp-session-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET 请求返回 MCP 服务元信息
  if (req.method === 'GET') {
    const docs = loadDocIndex();
    return res.status(200).json({
      name: 'zepg-docs-mcp',
      status: 'ready',
      indexed_docs_count: docs.length,
      tools: ['search_docs', 'read_doc'],
      transport: 'StreamableHTTP',
      endpoint: '/api/mcp'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const mcpServer = createServer();
    const transport = new StreamableHTTPServerTransport();
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('MCP handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: error.message || 'Internal error' },
        id: null
      });
    }
  }
}
