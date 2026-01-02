import { VNODE_SYMBOL } from '../symbols.js'
import { type ComponentProps, type ElementType, type FC, type OsmosElement } from '../types/jsx.js'
import { isJSXElement } from '../utils.js'

/**
 * Utility for creating a component.
 *
 * WARNING: This is an experimental API and is subject to changes.
 */
export function useRender(params: UseRenderParameters): JSX.Element {
  if (params.render) {
    if (isJSXElement(params.render)) {
      console.log(params.render.props, params.props)
      return {
        $$typeof: params.render.$$typeof,
        type: params.render.type,
        props: {
          ...params.props,
          ...params.render.props,
        },
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
