import { test } from '@japa/runner'
import { type OsmosNode } from '../../src/types/jsx.js'
import { OsmosRenderer } from '../../src/render/renderer.js'
import JSXRenderError from '../../src/errors/jsx_render_error.js'
import { Fragment, jsx } from '../../modules/jsx_runtime.js'
import { html } from '../../src/tags.js'

async function testRender(node: OsmosNode) {
  let output = ''

  const renderer = new OsmosRenderer({
    onWrite(chunk) {
      output += chunk
    },
    onError(error) {
      throw error
    },
  })

  await renderer.render(node)
  return output
}

test.group('LiteralRenderer', () => {
  test('`{0}` should render "{1}"')
    .with([
      // Nullish
      [null, ''],
      [undefined, ''],

      // Booleans
      [true, ''],
      [false, ''],

      // Strings
      ['hello', 'hello'],
      ['', ''],
      [' ', ' '],
      ['<div>', '&lt;div&gt;'],
      ['&', '&amp;'],
      ['"', '&quot;'],
      ["'", '&#39;'],
      ['<>&"\'', '&lt;&gt;&amp;&quot;&#39;'],
      ['こんにちは', 'こんにちは'], // unicode
      ['😀😉🎄', '😀😉🎄'], // emojis

      // Numbers
      [0, '0'],
      [-1, '-1'],
      [42, '42'],
      [3.14, '3.14'],
      [1e3, '1000'],
      [1e6, '1000000'],
      [1.23e5, '123000'],
      [-4.56e2, '-456'],
      [Number.NaN, 'NaN'],
      [Number.POSITIVE_INFINITY, 'Infinity'],
      [Number.NEGATIVE_INFINITY, '-Infinity'],

      // Bigint
      [BigInt(15_000), '15000'],
      [BigInt(-42), '-42'],
      [BigInt('9'.repeat(100)), '9'.repeat(100)], // extremely large bigint
      [BigInt('-' + '9'.repeat(100)), '-' + '9'.repeat(100)], // extermely large negative bigint
      [
        2n ** 256n,
        '115792089237316195423570985008687907853269984665640564039457584007913129639936',
      ], // power-of-two boundary (often broken by Number casts)
      [10n ** 100n, '1' + '0'.repeat(100)], // power of ten
      [12345678901234567890n * 98765432109876543210n, '1219326311370217952237463801111263526900'],

      // Iterators
      [[], ''],
      [['Hello', 123, ' from', ' ', 'osmos'], 'Hello123 from osmos'],
      [[undefined, null, false, true], ''],
      [
        (function* () {
          yield 'Generator'
          yield ' functions '
          yield false
          yield 123
        })(),
        'Generator functions 123',
      ],
      [
        (async function* () {
          yield 'AsyncGenerator'
          yield false
          yield ' functions '
          yield 123
        })(),
        'AsyncGenerator functions 123',
      ],

      // Promise
      [Promise.resolve('Hello world'), 'Hello world'],
    ])
    .run(async ({ expect }, [value, expected]) => {
      const output = await testRender(value)
      expect(output).toBe(expected)
    })

  test('should error when not handled', async ({ expect }) => {
    await expect(() => testRender({} as any)).rejects.toThrow(JSXRenderError)
  })
})

test.group('JSXRenderer', () => {
  test('`{0}` should render "{1}"')
    .with([
      // HTML Elements
      [jsx('div', {}), '<div></div>'], // Basic
      [jsx('p', { children: 'Hello' }), '<p>Hello</p>'], // Attributes
      [jsx('html', {}), '<!DOCTYPE html><html></html>'], // Special doctype with <html>
      [jsx(Fragment, { children: 'Hello' }), 'Hello'], // Fragment

      // Function
      [
        jsx(() => jsx('div', { children: 'FunctionComponent' }), {}),
        '<div>FunctionComponent</div>',
      ],

      // Tags
      [html`<div>Html tag</div>`, '<div>Html tag</div>'],
    ])
    .run(async ({ expect }, [value, expected]) => {
      const output = await testRender(value)
      expect(output).toBe(expected)
    })
})
