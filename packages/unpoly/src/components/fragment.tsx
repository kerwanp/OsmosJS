import { OsmosNode, VNODE_SYMBOL } from '@osmosjs/osmos'
import { VNODE_UNPOLY_FRAGMENT } from '../symbols.js'
import { Unpoly } from '../unpoly.js'
import { UnpolyContext } from './provider.jsx'

export function Fragment(props: { id: string; children: OsmosNode }) {
  const unpoly = UnpolyContext.getOrFail()
  const target = unpoly.target()

  if (target === `#${props.id}`) {
    unpoly.addVaryHeader(Unpoly.TARGET_HEADER)

    return (
      <up-fragment style="display: contents;" id={props.id}>
        {props.children}
      </up-fragment>
    )
  }

  return {
    $$typeof: VNODE_SYMBOL,
    type: VNODE_UNPOLY_FRAGMENT,
    props,
  }
}

export function Slot({ fragmentId }: { fragmentId: string }) {
  const unpoly = UnpolyContext.getOrFail()
  const fragment = unpoly.fragments.get(fragmentId)

  return (
    <up-fragment style="display: contents;" id={fragmentId}>
      {fragment}
    </up-fragment>
  )
}
