import { defineDocsConfig } from '@wrikka/docs/config'

export default defineDocsConfig({
  title: 'My Custom WDocs Site',
  description: 'A site built with the wdocs Nuxt module.',

  nav: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/introduction' }
  ],

  sidebar: {
    '/guide/': [
      {
        text: 'Introduction',
        items: [
          { text: 'What is WDocs?', link: '/guide/introduction' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ]
  }
})
