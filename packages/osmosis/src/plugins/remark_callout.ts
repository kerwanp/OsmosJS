import type { Processor, Transformer } from 'unified'
import type { BlockContent, HTML, Root } from 'mdast'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx'
import { mdxToAst } from '../utils/mdast.js'

export type Options = {
  /**
   * The root node of the callout.
   *
   * @default
   * (callout) => ({
   *   name: "Callout",
   *   attributes: [
   *     { type: "mdxJsxAttribute", name: "variant", value: callout.type },
   *     ...(callout.isFoldable ? [{ type: "mdxJsxAttribute", name: "defaultOpen", value: callout.defaultFolded === undefined ? false : !callout.defaultFolded }] : []),
   *   ],
   * })
   */
  root?: NodeOptions | ((callout: Callout) => NodeOptions)

  /**
   * The title node of the callout.
   *
   * @default
   * () => ({
   *   name: "CalloutTitle",
   *   attributes: [],
   * })
   */
  title?: NodeOptions | ((callout: Callout) => NodeOptions)

  /**
   * The inner title node of the callout.
   *
   * This node is used to wrap the text content of the title.
   *
   * - If `undefined`, title text is not wrapped.
   *
   * @default
   * (callout, options) =>
   *   options.icon(callout) == null && options.foldIcon(callout) == null
   *     ? undefined
   *     : {
   *         name: "CalloutTitleInner",
   *         attributes: [],
   *       },
   */
  titleInner?:
    | NodeOptions
    | undefined
    | ((callout: Callout, options: Required<Callable<Options>>) => NodeOptions | undefined)

  /**
   * The body node of the callout.
   *
   * @default
   * () => ({
   *   name: "CalloutBody",
   *   attributes: [],
   * })
   */
  body?: NodeOptions | ((callout: Callout) => NodeOptions)

  /**
   * The icon node of the callout.
   *
   * The icon node is added in the title node before the title text.
   *
   * - If `undefined`, no icon is added.
   * - If a `string`, the string is added as raw HTML in the title node before the title text.
   * - If a `object`, the object is added as a node before the title text.
   *
   * @default
   * () => undefined
   */
  icon?:
    | NodeOptionsWithChildren
    | string
    | undefined
    | ((callout: Callout) => NodeOptionsWithChildren | string | undefined)

  /**
   * The fold icon node of the callout.
   *
   * The fold icon node is added in the title node after the title text.
   *
   * - If `undefined`, no fold icon is added.
   * - If a `string`, the string is added as raw HTML in the title node after the title text.
   * - If a `object`, the object is added as a node after the title text.
   *
   * @default
   * () => undefined
   */
  foldIcon?:
    | NodeOptionsWithChildren
    | string
    | undefined
    | ((callout: Callout) => NodeOptionsWithChildren | string | undefined)

  /**
   * A list of callout types that are supported.
   * - If `undefined`, all callout types are supported. This means that this plugin will not check if the given callout type is in `callouts` and never call `onUnknownCallout`.
   * - If a list, only the callout types in the list are supported. This means that if the given callout type is not in `callouts`, this plugin will call `onUnknownCallout`.
   * @example ["info", "warning", "danger"]
   * @default undefined
   */
  callouts?: string[] | null

  /**
   * A function that is called when the given callout type is not in `callouts`.
   *
   * - If the function returns `undefined`, the callout is ignored. This means that the callout is rendered as a normal blockquote.
   * - If the function returns a `Callout`, the callout is replaced with the returned `Callout`.
   */
  onUnknownCallout?: (callout: Callout, file: VFile) => Callout | undefined
}

export type NodeOptions = {
  /**
   * The JSX element name of the node.
   */
  name: string | null

  /**
   * The JSX attributes of the node.
   */
  attributes: MdxJsxAttribute[]
}

export type NodeOptionsWithChildren = NodeOptions & {
  /**
   * The children of the node.
   *
   * - If a `string`, the string is added as raw HTML in the node.
   * - If a `mdast.BlockContent[]`, the array is added as children.
   */
  children: BlockContent[] | string
}

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if T is a function
export type ExtractFunction<T> = Extract<T, (...args: any) => any>

export type Callable<T> = {
  [P in keyof T]: ExtractFunction<T[P]> extends never ? T[P] : ExtractFunction<T[P]>
}

/**
 * A remark plugin to parse callout syntax.
 */
export function remarkCallout(this: Processor): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      const paragraphNode = node.children.at(0)

      if (!paragraphNode || paragraphNode.type !== 'paragraph') return

      const calloutTypeTextNode = paragraphNode.children.at(0)
      if (!calloutTypeTextNode || calloutTypeTextNode.type !== 'text') {
        return
      }

      // Parse callout syntax
      // e.g. "[!note] title"
      const [calloutTypeText, ...calloutBodyText] = calloutTypeTextNode.value.split('\n')
      const calloutData = parseCallout(calloutTypeText)
      if (!calloutData) return

      // Generate callout root node
      const rootNode: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'Callout',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'variant',
            value: formatForAttribute(calloutData.type),
          },
        ],
        children: [],
      }

      const contentNode: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'CalloutContent',
        attributes: [],
        children: [],
      }

      // Generate callout title node
      if (calloutData.title) {
        contentNode.children.push({
          type: 'mdxJsxFlowElement',
          name: 'CalloutTitle',
          attributes: [],
          children: [mdxToAst(this, calloutData.title, true) as any],
        })
      }

      contentNode.children.push({
        type: 'mdxJsxFlowElement',
        name: 'CalloutDescription',
        attributes: [],
        children: [
          {
            type: 'text',
            value: calloutBodyText,
          } as any,
          ...paragraphNode.children.slice(1),
        ],
      })

      // Add CalloutContent to root node
      rootNode.children.push(contentNode)

      // Replace the blockquote with the MDX JSX element
      if (parent && typeof index === 'number') {
        parent.children[index] = rootNode as any
      }
    })
  }
}

export type Callout = {
  /**
   * The type of the callout.
   */
  type: string

  /**
   * Whether the callout is foldable.
   */
  isFoldable: boolean

  /**
   * Whether the callout is folded by default.
   */
  defaultFolded?: boolean

  /**
   * The title of the callout.
   */
  title?: string
}

/**
 * @example
 * ```
 * const callout = parseCallout("[!info]");  // { type: "info", isFoldable: false, title: undefined }
 * const callout = parseCallout("[!info");   // undefined
 * ```
 */
export const parseCallout = (text: string | null | undefined): Callout | undefined => {
  if (!text) return

  const match = text.match(/^\[!(?<type>[^\]]+)?\](?<isFoldable>[+-])?(?: (?<title>.*))?$/)
  if (!match?.groups?.type) return undefined

  const callout: Callout = {
    type: match.groups.type.toLowerCase(),
    isFoldable: Boolean(match.groups.isFoldable),
  }

  if (match.groups.isFoldable) {
    callout.defaultFolded = match.groups.isFoldable === '-'
  }

  if (match.groups.title) {
    callout.title = match.groups.title
  }

  return callout
}

export const toMdxNode = (from: NodeOptionsWithChildren | string): MdxJsxFlowElement | HTML => {
  if (typeof from === 'string') {
    return {
      type: 'html',
      value: from,
    }
  }

  if (typeof from.children === 'string') {
    return {
      type: 'mdxJsxFlowElement',
      name: from.name,
      attributes: from.attributes,
      children: [
        {
          type: 'html',
          value: from.children,
        },
      ],
    }
  }

  return {
    type: 'mdxJsxFlowElement',
    name: from.name,
    attributes: from.attributes,
    children: from.children as any,
  }
}

export function formatForAttribute(rawString: string) {
  return rawString.replace(/\s+/g, '-').toLowerCase()
}
