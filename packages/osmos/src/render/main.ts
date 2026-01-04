import { type OsmosNode } from '../types/jsx.js'
import { OsmosRenderer } from './renderer.js'

/**
 * Renders an OsmosNode to a string by accumulating all rendered chunks
 * into a buffer and returning the complete result.
 *
 * This function is useful when you need the entire rendered output as a
 * single string, such as for static site generation or server-side rendering
 * where the full content is needed before sending a response.
 *
 * @param node - The OsmosNode (JSX element, string, number, or other renderable value) to render
 * @returns A promise that resolves to the complete rendered HTML string
 *
 * @example
 * ```ts
 * const html = await renderToString(<div>Hello World</div>)
 * // Returns: '<div>Hello World</div>'
 * ```
 */
export async function renderToString(node: OsmosNode) {
  let buffer = ''

  const renderer = new OsmosRenderer({
    onWrite(chunk) {
      buffer += chunk
    },
    onError(error) {
      console.warn(error)
    },
  })

  await renderer.render(node)

  return buffer
}

const encoder = new TextEncoder()

/**
 * Renders an OsmosNode to a ReadableStream, enabling streaming of the
 * rendered output as it becomes available.
 *
 * This function is ideal for server-side rendering scenarios where you want
 * to start sending content to the client as soon as it's rendered, rather
 * than waiting for the entire render to complete. The stream emits Uint8Array
 * chunks encoded as UTF-8, making it suitable for HTTP responses.
 *
 * @param node - The OsmosNode (JSX element, string, number, or other renderable value) to render
 * @returns A ReadableStream that emits Uint8Array chunks of the rendered HTML
 * @example
 * ```ts
 * const stream = renderToReadableStream(<div>Hello World</div>)
 * // Can be used with Response or other streaming APIs
 * return new Response(stream, { headers: { 'Content-Type': 'text/html' } })
 * ```
 */
export function renderToReadableStream(node: OsmosNode) {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const renderer = new OsmosRenderer({
        onWrite(chunk) {
          controller.enqueue(encoder.encode(chunk))
        },
        onError(error) {
          controller.error(error)
        },
      })

      await renderer.render(node)

      controller.close()
    },
  })

  return stream
}
