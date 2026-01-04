import { escapeHTML } from '../utils/escape_html.js'
import { normalizeProps } from '../utils/normalize_props.js'
import { type OsmosRenderer } from './renderer.js'

const selfClosingTags = new Set(
  'area,base,br,col,embed,hr,img,input,keygen,link,meta,param,source,track,wbr'.split(',')
)

/**
 * Renders an HTMLElement.
 *
 * @example
 * renderHTMLElementToString('div') === '<div></div>'
 */
export async function renderHTMLElement(
  tag: string,
  props: any = {},
  context: OsmosRenderer
): Promise<boolean> {
  const { children, ...attributes } = normalizeProps(props)

  if (tag === 'html') {
    context.write('<!DOCTYPE html>')
  }

  let buffer = `<${tag}`

  for (let [key, value] of Object.entries(attributes)) {
    if (value === undefined) continue

    if (typeof value === 'boolean' && value) {
      buffer += ` ${key}`
    } else {
      buffer += ` ${escapeHTML(key)}="${value}"`
    }
  }

  if (children || !selfClosingTags.has(tag)) {
    buffer += `>`

    context.write(buffer)

    if (children) {
      await context.render(children)
    }

    context.write(`</${tag}>`)
  } else {
    buffer += ` />`
    context.write(buffer)
  }

  return true
}
