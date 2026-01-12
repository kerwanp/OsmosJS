import Osmosis from '@osmosjs/osmosis/client'
import { createIcons, icons } from 'lucide'

Osmosis.start({
  docsearch: {
    appId: '6RHBSCEI3Q',
    indexName: 'OsmosJS',
    apiKey: '399d9d1e7e6248800752e80c9e19cb46',
  },
})

up.compiler('i[data-lucide]', { batch: true }, () => {
  createIcons({ icons })
})
