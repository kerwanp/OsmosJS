import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type HTML } from '../types/html.js'
import { stringifyStyle } from './stringify_style.js'

/**
 * Merges class names using clsx and tailwind-merge.
 * Combines multiple class name inputs and resolves conflicts using Tailwind's merge logic.
 *
 * @param inputs - Variable number of class name values (strings, objects, arrays)
 * @returns Merged class name string
 * @example
 * ```ts
 * mergeClassNames('btn', 'btn-primary', { 'btn-disabled': true })
 * // Returns: 'btn btn-primary btn-disabled'
 * ```
 */
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Merges two style values by concatenating them as strings.
 * Converts style objects to strings before concatenation.
 *
 * @param a - First style value (string or CSS properties object)
 * @param b - Second style value (string or CSS properties object)
 * @returns Concatenated style string
 * @example
 * ```ts
 * mergeStyles('color: red;', { backgroundColor: 'blue' })
 * // Returns: 'color: red; background-color: blue;'
 * ```
 */
export function mergeStyles(a: string | HTML.CSSProperties, b: string | HTML.CSSProperties) {
  const stringA = typeof a === 'object' ? stringifyStyle(a) : a
  const stringB = typeof b === 'object' ? stringifyStyle(b) : b

  return `${stringA}${stringB}`
}

/**
 * Merges multiple props objects together, with special handling for `style` and `className`.
 * Later props override earlier ones, except `style` and `className` which are intelligently merged.
 *
 * @param props - Variable number of props objects to merge
 * @returns A merged props object
 * @example
 * ```ts
 * mergeProps({ className: 'a', id: '1' }, { className: 'b', id: '2' })
 * // Returns: { className: 'a b', id: '2' }
 * ```
 */
export function mergeProps(...props: any[]) {
  if (props.length === 0) return {}
  if (props.length === 1) return props[0]

  let merged = props[0]

  for (let i = 1; i < props.length; i++) {
    merged = mergeOne(merged, props[i])
  }

  return merged
}

/**
 * Merges two props objects, with special handling for `style` and `className`.
 * Other properties from `b` override properties in `a`.
 *
 * @param a - First props object
 * @param b - Second props object (takes precedence for non-special properties)
 * @returns Merged props object
 */
export function mergeOne(a: any, b: any) {
  for (const name in b) {
    if (name === 'style') {
      a[name] = mergeStyles(a[name], b[name])
      continue
    }

    if (name === 'className') {
      a[name] = mergeClassNames(a[name], b[name])
      continue
    }

    a[name] = b[name]
  }

  return a
}

/**
 * Merges two objects, handling undefined values gracefully.
 * Returns the first object if the second is undefined, the second if the first is undefined,
 * or a merged object if both exist. Returns undefined if both are undefined.
 *
 * @param a - First object (may be undefined)
 * @param b - Second object (may be undefined)
 * @returns Merged object or undefined
 * @example
 * ```ts
 * mergeObjects({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
 * mergeObjects({ a: 1 }, undefined) // { a: 1 }
 * mergeObjects(undefined, undefined) // undefined
 * ```
 */
export function mergeObjects<A extends object | undefined, B extends object | undefined>(
  a: A,
  b: B
) {
  if (a && !b) {
    return a
  }
  if (!a && b) {
    return b
  }
  if (a || b) {
    return { ...a, ...b }
  }
  return undefined
}
