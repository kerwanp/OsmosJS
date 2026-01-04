import { test } from '@japa/runner'
import { stringifyStyle } from '../../src/utils/stringify_style.js'

test.group('stringifyStyle', () => {
  test('should stringify {0}')
    .with([
      ['string', 'color: red; background-color: blue;', 'color: red; background-color: blue;'],
      ['empty object', {}, ''],
      ['simple properties', { color: 'red', width: '200px' }, `color: red; width: 200px;`],
      [
        'with camel case',
        { color: 'red', backgroundColor: 'blue', minWidth: '200px' },
        `color: red; background-color: blue; min-width: 200px;`,
      ],
      [
        'with camel case',
        { color: 'red', backgroundColor: 'blue', borderBlockColor: 'yellow' },
        `color: red; background-color: blue; border-block-color: yellow;`,
      ],
      [
        'with css properties',
        { '--anchor-name': 'anchor', '--menu-color': 'blue' },
        `--anchor-name: anchor; --menu-color: blue;`,
      ],
    ])
    .run(({ expect }, [_, value, expected]) => {
      expect(stringifyStyle(value)).toBe(expected)
    })
})
