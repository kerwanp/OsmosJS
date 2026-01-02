import { OsmosRenderer } from '@osmosjs/osmos/render'
import { isJSXElement } from '@osmosjs/osmos/utils'
import { VNODE_UNPOLY_FRAGMENT, VNODE_UNPOLY_SLOT } from './symbols.js'
import { UnpolyContext } from './components/provider.jsx'

OsmosRenderer.register({
  name: 'unpoly',
  async render(node, renderer) {
    if (!isJSXElement(node)) return false

    const unpoly = UnpolyContext.getOrFail()

    if (node.type === VNODE_UNPOLY_FRAGMENT) {
      unpoly.fragments.register(node.props.id, node.props.children)
      return true
    }

    if (node.type === VNODE_UNPOLY_SLOT) {
      const fragment = unpoly.fragments.get(node.props.fragmentId)

      await renderer.render(fragment)
      return true
    }

    return true
  },
})
