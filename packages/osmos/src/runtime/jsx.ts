import { VNODE_FRAGMENT_SYMBOL, VNODE_SYMBOL } from '../symbols.js'
import { type FC, type OsmosElement } from '../types/jsx.js'

export function jsx(tag: OsmosElement['type'], props: any, key?: string | number): OsmosElement {
  if (key !== undefined) {
    props.key = key
  }

  return {
    $$typeof: VNODE_SYMBOL,
    type: tag,
    props,
  }
}

export const Fragment = VNODE_FRAGMENT_SYMBOL as unknown as FC
