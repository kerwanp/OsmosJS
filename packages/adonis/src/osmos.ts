import { type HttpContext } from '@adonisjs/core/http'
import { renderToReadableStream, renderToString, type FC } from '@osmosjs/osmos'
import { jsx } from '@osmosjs/osmos/jsx-runtime'
import { AdonisContext } from './components/provider.jsx'
import { Adonis } from './adonis.js'
import { Readable } from 'node:stream'

/**
 * Utility class for rendering Osmos with Adonis context.
 */
export class Osmos {
  context: HttpContext

  constructor(context: HttpContext) {
    this.context = context
  }

  /**
   * Renders a component to string and send the result.
   *
   * @param element - the component to render
   * @param props - the props of the component
   */
  async render<P = {}>(element: FC<P>, props?: P): Promise<void> {
    const result = jsx(element, props)
    const extension = new Adonis(this.context)

    const html = await AdonisContext.storage.run(extension, () => {
      return renderToString(result)
    })

    return this.context.response.header('Content-Type', 'text/html; charset=utf-8').send(html)
  }

  /**
   * Stream a component to the HttpResponse.
   *
   * WARNING: This is an experimental feature.
   * If a component throws an error during rendering an empty 200 page is rendered.
   *
   *
   * @param element - the component to render
   * @param props - the props of the component
   */
  async stream<P = {}>(element: FC<P>, props?: P): Promise<void> {
    const result = jsx(element, props)
    const extension = new Adonis(this.context)

    const stream = AdonisContext.storage.run(extension, () => {
      return renderToReadableStream(result)
    })

    this.context.response
      .header('Transfer-Encoding', 'chunked')
      .header('Content-Type', 'text/html; charset=utf-8')

    return this.context.response.stream(Readable.fromWeb(stream as any))
  }
}
