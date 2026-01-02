import clsx, { type ClassValue } from 'clsx'
import baseEscapeHTML from 'escape-html'
import styleToCss from 'style-object-to-css-string'
import { twMerge } from 'tailwind-merge'

export function isJSXElement(value: unknown): value is JSX.Element {
  return (
    value !== null &&
    typeof value === 'object' &&
    '$$typeof' in value &&
    typeof value.$$typeof === 'symbol'
  )
}

export function escapeHTML(value: string) {
  return baseEscapeHTML(value)
}

export function escapeJSX(value: unknown): string {
  if (typeof value === 'bigint' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'string') {
    return escapeHTML(value)
  }

  return ''
}

export function stringifyStyle(style: Record<string, any>) {
  return (styleToCss as any)(style)
}

export function normalizeAttributes(attributes: Record<string, any>) {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined) continue

    if (key === 'className') {
      result['class'] = className(value)
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

export function className(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
