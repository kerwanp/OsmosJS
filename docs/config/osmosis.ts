import app from '@adonisjs/core/services/app'
import { defineConfig, sources } from '@osmosjs/osmosis'
import { defaultPlugins } from '@osmosjs/osmosis/plugins'

export default defineConfig({
  markdown: {
    rehypePlugins: defaultPlugins.rehypePlugins,
    remarkPlugins: defaultPlugins.remarkPlugins,
  },
  output: app.makeURL('build'),
  cache: true,
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
      prefix: '/docs/osmosis',
      githubUrl: 'https://github.com/kerwanp/OsmosJS/tree/main/packages/osmosis/docs',
      source: sources.fs({
        path: new URL('../../packages/osmosis/docs/', import.meta.url),
      }),
    },
  ],
  components: {
    Page: () => import('../app/osmos/pages/doc_page.jsx'),
    Icon: () =>
      import('../app/osmos/components/hugeicons_icon.tsx').then(({ HugeiconsIcon }) => ({
        default: HugeiconsIcon,
      })),
  },
})
