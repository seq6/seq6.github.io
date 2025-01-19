import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  lang: 'zh-Hans',
  title: 'Seq6-技术笔记',
  description: "A VitePress Site",

  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: 'https://api.iconify.design/emojione:notebook-with-decorative-cover.svg' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'VitePress', link: 'https://vitepress.dev/zh/' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      },
      {
        text: '后端-Backend',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      },
      {
        text: '前端-Fronend',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      },
      {
        text: '工具-Toolbox',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      },
      {
        text: '数学-Math',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      },
      {
        text: '其它-Others',
        items: [
          { text: '常用站点', link: '/others/my-favorites' },
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/seq6/seq6.github.io' }
    ]
  }
})
