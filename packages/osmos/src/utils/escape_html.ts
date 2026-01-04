const regex = /["'&<>]/

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * Converts `"`, `'`, `&`, `<`, and `>` to their HTML entity equivalents.
 *
 * @param value - String to escape
 * @returns Escaped string safe for HTML output
 * @example
 * ```ts
 * escapeHTML('<script>alert("XSS")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 * ```
 */
export function escapeHTML(value: string) {
  let str = '' + value
  const match = regex.exec(value)
  if (!match) return value

  let escape
  let html = ''
  let index = 0
  let lastIndex = 0

  for (index = match.index; index < value.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#39;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}
