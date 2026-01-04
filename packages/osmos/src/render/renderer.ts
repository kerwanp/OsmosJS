import { inspect } from 'node:util'
import JSXRenderError from '../errors/jsx_render_error.js'
import { type OsmosNode } from '../types/jsx.js'
import { JSXRenderer, LiteralsRenderer } from './renderers.js'

export interface OsmosRendererOptions {
  /**
   * Callback function when chunk value
   * is written during render process.
   */
  onWrite(chunk: string): void

  /**
   * Callback function when an error occured
   * during render process.
   */
  onError(error: Error): void
}

export class OsmosRenderer {
  static renderers = new Map<string, RendererFn>()

  protected renderers = new Map<string, RendererFn>()

  constructor(public options: OsmosRendererOptions) {
    this.renderers = new Map([
      [LiteralsRenderer.name, LiteralsRenderer],
      [JSXRenderer.name, JSXRenderer],
      ...OsmosRenderer.renderers,
    ])
  }

  static register<I extends JSX.Element>(renderer: RendererFn<I>) {
    if (this.renderers.has(renderer.name)) {
      console.warn(`Could not register renderer "${renderer.name}" has it already exist`)
    }

    this.renderers.set(renderer.name, renderer as any)
  }

  async render(node: OsmosNode) {
    for (const [, renderer] of this.renderers.entries()) {
      const rendered = await renderer.render(node, this)
      if (rendered) return true
    }

    this.error(
      new JSXRenderError(`Could not render "${inspect(node)}" as not renderer could handle it.`)
    )

    return false
  }

  /**
   * Write chunk value to the output.
   */
  write(chunk: string) {
    this.options.onWrite(chunk)
    return true
  }

  /**
   * Emit rendering error
   */
  error(error: Error) {
    this.options.onError(error)
  }
}

export type RendererFn<I extends OsmosNode = OsmosNode> = {
  name: string
  render: (node: I, renderer: OsmosRenderer) => Promise<boolean>
}
