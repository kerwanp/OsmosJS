import { Collection } from '@adonisjs/content'
import { type ViewFn } from '@adonisjs/content/types'
import {
  DocumentationLoader,
  DocumentationSchema,
  type DocumentationLoaderOptions,
} from '../loaders/documentation_loader.js'
import vine from '@vinejs/vine'

export const RoutesSchema = vine.array(vine.string())

export type DocumentationCollectionViews = {
  routes: ViewFn<typeof DocumentationSchema, any, string[]>
}

export interface DocumentationCollectionOptions extends DocumentationLoaderOptions {
  cache: boolean
}

export class DocumentationCollection extends Collection<
  typeof DocumentationSchema,
  DocumentationCollectionViews
> {
  constructor(public options: DocumentationCollectionOptions) {
    super({
      schema: DocumentationSchema,
      loader: new DocumentationLoader(options),
      cache: options.cache,
      views: {
        routes: (documentation) => {
          const routes: string[] = []

          for (const page of documentation.pages) {
            routes.push(page.slug)
          }

          return routes
        },
      },
    })
  }
}
