const regex = new RegExp(/[A-Z]/, 'g')

/**
 * Transforms camel case to kebab case.
 *
 * @param value - a camel case string
 *
 * @returns the value in kebab case
 *
 * @example
 * camelToKebabCase('backgroundColor') // 'background-color'
 */
export function camelToKebabCase(value: string) {
  if (!value.match(regex)) return value
  return value.replace(regex, (match) => `-${match.toLowerCase()}`)
}
