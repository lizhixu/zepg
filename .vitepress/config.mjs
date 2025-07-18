import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference  /site-config
export default defineConfig({
    title: "ZEPG",
    titleTemplate: "知识库",
    description: "知识库",
    sitemap: {
        hostname: 'https://zepg.dev.tc'
    },
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
            level: [2, 4],
            label: '页面导航'
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

        sidebar: {
            '/docs/': [
                {
                    text: '基础',
                    items: [
                        {text: '快速开始', link: '/docs/basis/快速开始'},
                        {text: 'Sepg 框架说明', link: 'https://wangcb.surge.sh/'},
                        {text: 'XEpg 速查表', link: '/docs/basis/XEpg 速查表'},
                        {text: 'XEpg 框架详细使用说明', link: '/docs/basis/XEpg 框架详细使用说明'},
                    ]
                },
                {
                    text: '版本相关',
                    items: [
                        {
                            text: '移动',
                            items: [
                                {text: '3.0 vue 注意事项', link: '/docs/cmcc/3.0 vue 注意事项'},
                                {text: '中兴 3.0 图片属性对照表', link: '/docs/cmcc/中兴 3.0 图片属性对照表'},
                                {text: '华为 3.0 图片属性对照表', link: '/docs/cmcc/华为 3.0 图片属性对照表'},
                            ]
                        },
                    ]
                },
                {
                    text: 'ADB 相关',
                    items: [
                        {text: '各厂家开启 ADB 的方法', link: '/docs/adb/各厂家开启ADB的方法'},
                        {
                            collapsed: true,
                            text: 'ADB 操作命令详解及用法大全',
                            link: '/docs/adb/ADB 操作命令详解及用法大全'
                        },
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/lizhixu/zepg'}
        ]
    }
})
