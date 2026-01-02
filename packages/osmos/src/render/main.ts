import { type OsmosNode } from '../types/jsx.js'
import { OsmosRenderer } from './renderer.js'

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
export function renderToReadableStream(node: OsmosNode) {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const renderer = new OsmosRenderer({
        onWrite(chunk) {
          controller.enqueue(encoder.encode(chunk))
        },
        onError(error) {
          console.error(error)
        },
      })

      await renderer.render(node)

      controller.close()
    },
  })

  return stream
}
