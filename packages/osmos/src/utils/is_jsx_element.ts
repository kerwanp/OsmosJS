import { VNODE_SYMBOL } from '../symbols.js'

/**
 * Type guard to check if a value is a JSX element (OsmosElement).
 * Verifies that the value has the `$$typeof` symbol matching VNODE_SYMBOL.
 *
 * @param value - Value to check
 * @returns True if the value is a JSX element
 * @example
 * ```ts
 * isJSXElement(<div />) // true
 * isJSXElement('string') // false
 * isJSXElement(null) // false
 * ```
 */
export function isJSXElement(value: unknown): value is JSX.Element {
  return (
    value !== null &&
    typeof value === 'object' &&
    '$$typeof' in value &&
    typeof value.$$typeof === 'symbol' &&
    value.$$typeof === VNODE_SYMBOL
  )
}
