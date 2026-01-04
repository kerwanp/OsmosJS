import { VNODE_SYMBOL } from '../symbols.js'
import { type ComponentProps, type ElementType, type FC, type OsmosElement } from '../types/jsx.js'
import { isJSXElement } from './is_jsx_element.js'
import { mergeProps } from './merge.js'

/**
 * Utility for creating polymorphic components that can render as different elements.
 * If a `render` prop is provided, it merges props and renders that element.
 * Otherwise, falls back to the `defaultTagName` with the provided props.
 *
 * This API is inspired by BaseUI's polymorphic component pattern.
 *
 * WARNING: This is an experimental API and is subject to changes.
 *
 * @param params - Configuration object with render, props, and defaultTagName
 * @returns A JSX element based on the render prop or default tag
 * @example
 * ```tsx
 * function Button({ render, ...props }) {
 *   return useRender({ render, props, defaultTagName: 'button' })
 * }
 * // Can be used as: <Button render={<a href="/">Link</a>} /> or <Button>Button</Button>
 * ```
 */
export function useRender(params: UseRenderParameters): JSX.Element {
  if (params.render) {
    if (isJSXElement(params.render)) {
      return {
        $$typeof: params.render.$$typeof,
        type: params.render.type,
        props: mergeProps(params.props, params.render.props),
      }
    }
  }

  return {
    $$typeof: VNODE_SYMBOL,
    type: params.defaultTagName,
    props: params.props,
  }
}

export type UseRenderRenderProps = OsmosElement | FC

export type UseRenderComponentProps<Element extends ElementType> = ComponentProps<Element> & {
  render?: UseRenderRenderProps
}

export interface UseRenderParameters {
  render?: UseRenderRenderProps
  props?: Record<string, unknown>
  defaultTagName: keyof JSX.IntrinsicElements
}

export namespace useRender {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  export type ComponentProps<Element extends ElementType> = UseRenderComponentProps<Element>
}
