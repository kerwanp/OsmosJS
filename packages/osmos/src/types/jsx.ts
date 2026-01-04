import type { HTML } from './html.js'

type JSXElementConstructor<P> = (props: P) => OsmosNode

export type OsmosElement<
  P = {},
  T extends string | JSXElementConstructor<P> | symbol =
    | string
    | JSXElementConstructor<any>
    | symbol,
> = {
  [Symbol.toStringTag]?: 'OsmosElement'
  $$typeof: symbol
  type: T
  props: P
  hash?: string
}

export type AwaitedOsmosNode =
  | OsmosElement
  | string
  | number
  | bigint
  | Iterable<OsmosNode>
  | boolean
  | null
  | undefined

export type OsmosNode =
  | OsmosElement
  | string
  | number
  | bigint
  | Iterable<OsmosNode>
  | AsyncIterable<OsmosNode>
  | boolean
  | null
  | undefined
  | Promise<AwaitedOsmosNode>

export interface FunctionComponent<P = {}> {
  (props: P): OsmosNode
}

export type FC<P = {}> = FunctionComponent<P>

export type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  T extends JSXElementConstructor<infer Props>
    ? Props
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {}

export type ElementType = keyof JSX.IntrinsicElements | JSXElementConstructor<any>

export type PropsWithChildren<P = {}> = { children?: OsmosNode } & P

declare global {
  namespace JSX {
    type ElementType<P = any> = string | JSXElementConstructor<any>

    interface Element extends OsmosElement<any, any> {}

    interface ElementAttributesProperty {
      $props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    interface IntrinsicAttributes {}
    interface IntrinsicElements extends HTML.Elements, HTML.SVGElements {}
  }
}
