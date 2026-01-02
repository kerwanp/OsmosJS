import { type HttpContext } from '@adonisjs/core/http'
import { renderToString, type FC } from '@osmosjs/osmos'
import { jsx } from '@osmosjs/osmos/jsx-runtime'
import { AdonisContext } from './components/provider.jsx'
import { Adonis } from './adonis.js'

export class Osmos {
  context: HttpContext

  constructor(context: HttpContext) {
    this.context = context
  }

  /**
   * Renders the component and pipe the result to the response.
   *
   * TODO: Handle streaming once we have better error handling
   */
  async render<P = {}>(element: FC<P>, props?: P): Promise<void> {
    const result = jsx(element, props)
    const extension = new Adonis(this.context)

    const html = await AdonisContext.storage.run(extension, () => {
      return renderToString(result)
    })

    return this.context.response.header('Content-Type', 'text/html').send(html) // TODO: Find why type is broken
  }
}
