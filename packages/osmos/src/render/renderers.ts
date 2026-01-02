import { type RendererFn } from './renderer.js'
import { escapeHTML, isJSXElement } from '../utils.js'
import is from '@sindresorhus/is'
import { type OsmosNode } from '../types/jsx.js'
import { renderHTMLElement } from './html.js'
import { VNODE_CONTEXT_SYMBOL, VNODE_FRAGMENT_SYMBOL, VNODE_HTML_TAG } from '../symbols.js'
import { type AsyncLocalStorage } from 'node:async_hooks'

export const LiteralsRenderer: RendererFn = {
  name: 'osmos.literals',
  async render(node, renderer) {
    // Null or undefined values should render nothing
    if (node === null || node === undefined) {
      return true
    }

    // Boolean values should render nothing to allow ternaries
    if (typeof node === 'boolean') {
      return true
    }

    // Other literals are rendered as string and escape
    if (typeof node === 'string' || typeof node === 'bigint' || typeof node === 'number') {
      return renderer.write(escapeHTML(node.toString()))
    }

    return false
  },
}

export const IterableRenderer: RendererFn = {
  name: 'osmos.iterable',
  async render(node, renderer) {
    if (is.iterable(node)) {
      for (const child of node) {
        await renderer.render(child)
      }

      return true
    }

    return false
  },
}

export const AsyncRenderer: RendererFn = {
  name: 'osmos.async',
  async render(node, renderer) {
    if (is.promise(node)) {
      return renderer.render(await node)
    }

    if (is.asyncGenerator(node)) {
      for await (const child of node) {
        return renderer.render(child as OsmosNode)
      }
    }

    return false
  },
}

export const JSXRenderer: RendererFn = {
  name: 'osmos.jsx',
  async render(node, renderer) {
    if (!isJSXElement(node)) return false

    if (typeof node.type === 'string') {
      return renderHTMLElement(node.type, node.props, renderer)
    }

    if (is.symbol(node.type)) {
      if (node.type === VNODE_HTML_TAG) {
        if (!('innerHTML' in node.props) || typeof node.props.innerHTML !== 'string') {
          return true
        }

        return renderer.write(node.props.innerHTML)
      }

      if (node.type === VNODE_FRAGMENT_SYMBOL) {
        if (!('children' in node.props)) {
          return true
        }

        return renderer.render(node.props.children as OsmosNode)
      }

      if (node.type === VNODE_CONTEXT_SYMBOL) {
        if (!('children' in node.props)) {
          return true
        }

        if (!(VNODE_CONTEXT_SYMBOL in node.props) || !('value' in node.props)) {
          return true
        }

        const storage = node.props[VNODE_CONTEXT_SYMBOL] as AsyncLocalStorage<unknown>

        return storage.run(node.props.value, () => {
          if (!('children' in node.props)) {
            return true
          }

          return renderer.render(node.props.children as OsmosNode)
        })
      }

      return false
    }

    if (is.function(node.type)) {
      const result = node.type.call(renderer.options.osmos, node.props)
      return renderer.render(result)
    }

    return false
  },
}
