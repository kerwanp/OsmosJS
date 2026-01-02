import type { Content } from 'mdast'
import { valueToEstree } from 'estree-util-value-to-estree'

export function flattenNode(node: Content): string {
  if ('children' in node) return node.children.map((child) => flattenNode(child)).join('')

  if ('value' in node && typeof node.value === 'string') return node.value

  return ''
}

export function toMdxExport(name: string, value: unknown): Content {
  return {
    type: 'mdxjsEsm' as any,
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            attributes: [],
            specifiers: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name,
                  },
                  init: valueToEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  }
}
