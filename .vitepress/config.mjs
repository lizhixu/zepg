import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference  /site-config
export default defineConfig({
    title: "ZEPG",
    titleTemplate: "知识库",
    description: "知识库",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/EPG.png',
        editLink: {
            pattern: 'https://github.com/lizhixu/zepg/edit/main/:path',
            text: 'Edit this page on GitHub'
        },
        search: {
          provider: 'local'
        },
        outline: {
            level: [2, 4]
        },
        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },
        nav: [
            {text: '首页', link: '/'},
            {text: '文档', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: '基础',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            },
            {
                text: '版本相关',
                items: [
                    {
                        text: '移动',
                        items: [
                            {text: '3.0 vue 注意事项', link: '/cmcc/3.0 vue 注意事项'},
                        ]
                    },
                ]
            },
            {
                text: 'ADB 相关',
                items: [
                    {text: '各厂家开启 ADB 的方法', link: '/adb/各厂家开启ADB的方法'},
                    {collapsed: true, text: 'ADB 操作命令详解及用法大全', link: '/adb/ADB 操作命令详解及用法大全'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/lizhixu/zepg'}
        ]
    }
})
