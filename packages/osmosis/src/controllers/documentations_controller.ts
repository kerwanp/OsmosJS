import { type HttpContext } from '@adonisjs/core/http'
import osmosis from '../../services/main.js'
import { OsmosisContext } from '../ui/providers/osmosis_provider.jsx'

export default class DocumentationsController {
  async handle({ request, response, osmos }: HttpContext) {
    const { default: Page } = await osmosis.config.components.Page()

    const url = request.url()
    const documentations = await osmosis.loadDocumentations()
    const documentation = documentations.toReversed().find((entry) => url.startsWith(entry.prefix))

    if (!documentation) {
      return response.notFound()
    }

    const page = documentation.pages.find((entry) => entry.slug === url)

    if (!page) {
      return response.notFound()
    }

    return OsmosisContext.storage.run({ documentations, documentation, page, osmosis }, () => {
      return osmos.render(Page, {
        documentations,
        documentation,
        page,
      })
    })
  }
}
