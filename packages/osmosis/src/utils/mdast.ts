import type { Content, Root } from 'mdast'
import { valueToEstree } from 'estree-util-value-to-estree'
import { type Processor } from 'unified'

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

export function mdxToAst(processor: Processor, name: string, skipParagraph = false) {
  const node = processor.parse(name) as Root

  if (node.type === 'root') {
    node.children = node.children.flatMap((child) => {
      if (skipParagraph && child.type === 'paragraph') return child.children

      return child
    })
  }

  return node
}
