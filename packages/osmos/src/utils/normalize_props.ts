import { mergeClassNames } from './merge.js'
import { stringifyStyle } from './stringify_style.js'

/**
 * Normalizes JSX props to HTML attributes.
 * Converts `className` to `class`, stringifies `style` objects,
 * and filters out undefined values.
 *
 * @param props - JSX props object to normalize
 * @returns Normalized props object with HTML-compatible attribute names
 * @example
 * ```ts
 * normalizeProps({ className: 'btn', style: { color: 'red' }, id: 'button' })
 * // Returns: { class: 'btn', style: 'color: red;', id: 'button' }
 * ```
 */
export function normalizeProps(props: Record<string, any>) {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue

    if (key === 'className') {
      result['class'] = mergeClassNames(value)
      continue
    }

    if (key === 'style') {
      result['style'] = typeof value === 'object' ? stringifyStyle(value) : value
      continue
    }

    result[key] = value
  }

  return result
}
