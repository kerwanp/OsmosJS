import is from '@sindresorhus/is'
import { VNODE_HTML_TAG } from './symbols.js'
import { type OsmosNode } from './types/jsx.js'
import { escapeJSX } from './utils.js'

function html(template: string | TemplateStringsArray, ...values: unknown[]): OsmosNode {
  return {
    $$typeof: VNODE_HTML_TAG,
    type: VNODE_HTML_TAG,
    props: {
      innerHTML: is.string(template) ? template : String.raw(template, ...values.map(escapeJSX)),
    },
  }
}

export { html, html as js, html as css }
