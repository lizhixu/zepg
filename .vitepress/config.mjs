import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference  /site-config
export default defineConfig({
  title: "EPG",
  titleTemplate: "知识库",
  description: "知识库",
  base: './',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/EPG.png',
    editLink: {
      pattern: 'https://github.com/lizhixu/zepg/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lizhixu/zepg' }
    ]
  }
})
