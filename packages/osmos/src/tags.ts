import is from '@sindresorhus/is'
import { VNODE_HTML_TAG, VNODE_SYMBOL } from './symbols.js'
import { type OsmosNode } from './types/jsx.js'
import { escapeJSX } from './utils/escape_jsx.js'

/**
 * Tag function for rendering raw HTML, CSS, or JavaScript content.
 * Interpolated values are automatically escaped to prevent XSS attacks.
 * Exported as `html`, `js`, and `css` for IDE syntax highlighting.
 *
 * @param template - Template string or TemplateStringsArray
 * @param values - Interpolated values (automatically escaped)
 * @returns An OsmosNode that renders as raw HTML
 * @example
 * ```ts
 * html`<h1>Hello ${user}</h1>` // user is escaped
 * ```
 */
function raw(template: string | TemplateStringsArray, ...values: unknown[]): OsmosNode {
  return {
    [Symbol.toStringTag]: 'OsmosElement',
    $$typeof: VNODE_SYMBOL,
    type: VNODE_HTML_TAG,
    props: {
      innerHTML: is.string(template) ? template : String.raw(template, ...values.map(escapeJSX)),
    },
  }
}

export { raw, raw as html, raw as js, raw as css }
