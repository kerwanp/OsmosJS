import app from '@adonisjs/core/services/app'
import { defineConfig, sources } from '@osmosjs/osmosis'

export default defineConfig({
  markdown: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
  output: app.makeURL('build'),
  cache: false,
  documentations: [
    {
      prefix: '/docs/osmos',
      githubUrl: 'https://github.com/kerwanp/OsmosJS/tree/main/packages/osmos/docs',
      source: sources.fs({
        path: new URL('../../packages/osmos/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/adonis',
      githubUrl: 'https://github.com/kerwanp/OsmosJS/tree/main/packages/adonis/docs',
      source: sources.fs({
        path: new URL('../../packages/adonis/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/unpoly',
      githubUrl: 'https://github.com/kerwanp/OsmosJS/tree/main/packages/unpoly/docs',
      source: sources.fs({
        path: new URL('../../packages/unpoly/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/osmosis',
      githubUrl: 'https://github.com/kerwanp/OsmosJS/tree/main/packages/unpoly/osmosis',
      source: sources.fs({
        path: new URL('../../packages/osmosis/docs/', import.meta.url),
      }),
    },
  ],
  page: () => import('../app/osmos/pages/doc_page.jsx'),
})
