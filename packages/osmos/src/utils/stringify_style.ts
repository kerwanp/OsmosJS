import type * as CSS from 'csstype'
import { camelToKebabCase } from './camel_to_kebab_case.js'

/**
 * Utility function for stringifying style attribute.
 * Object keys in camel case are converted to kebab case.
 *
 * @param style - style attribute value
 *
 * @returns the style as a string
 *
 * @example
 * stringifyStyle({ backgroundColor: 'red', width: '200px' })
 * // 'background-color: red; width: 200px;'
 */
export function stringifyStyle(style: string | CSS.Properties | Record<string, any>) {
  if (typeof style === 'string') return style

  const lines = Object.entries(style).map(([key, value]) => `${camelToKebabCase(key)}: ${value};`)
  return lines.join(' ')
}
