import { escapeHTML } from './escape_html.js'

/**
 * Escapes JSX content by converting values to strings and escaping HTML.
 * Numbers and bigints are converted to strings, strings are HTML-escaped,
 * and other types return an empty string.
 *
 * @param value - Value to escape (string, number, bigint, or other)
 * @returns Escaped string safe for JSX output
 * @example
 * ```ts
 * escapeJSX('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
 * escapeJSX(42) // '42'
 * escapeJSX(null) // ''
 * ```
 */
export function escapeJSX(value: unknown): string {
  if (typeof value === 'bigint' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'string') {
    return escapeHTML(value)
  }

  return ''
}
