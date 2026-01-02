import { type Router } from '@adonisjs/core/http'
import { type Logger } from '@adonisjs/core/logger'
import { DocumentationCollection } from './collections/documentation_collection.js'

import { StaticSiteGenerator } from './generator.js'
import { type OsmosisConfig } from './types.js'

export class Osmosis {
  config: OsmosisConfig

  #logger: Logger
  #router: Router

  collections: DocumentationCollection[]

  constructor(config: OsmosisConfig, router: Router, logger: Logger) {
    this.config = config
    this.#router = router
    this.#logger = logger

    this.collections = config.documentations.map(
      (options) =>
        new DocumentationCollection({
          ...options,
          cache: config.cache,
        })
    )
  }

  async boot() {
    for (const collection of this.collections) {
      const Controller = () => import('./controllers/documentations_controller.js')

      this.#router
        .group(() => {
          this.#router.get('/', [Controller, 'handle'])
          this.#router.get('/*', [Controller, 'handle'])
        })
        .prefix(collection.options.prefix)
    }
  }

  loadDocumentations() {
    return Promise.all(
      this.collections.map(async (collection) => {
        const query = await collection.load()
        return query.all()
      })
    )
  }

  async export() {
    const documentations = await this.loadDocumentations()

    const routes = documentations.flatMap((documentation) =>
      documentation.pages.map((page) => page.slug)
    )

    const generator = new StaticSiteGenerator({
      url: new URL('http://localhost:3333'),
      output: this.config.output,
      routes,
      logger: this.#logger,
    })

    await generator.export()
  }
}
