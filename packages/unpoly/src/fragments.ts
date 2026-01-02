import { type OsmosNode } from '@osmosjs/osmos'

/**
 * Wrapper class for managing Unpoly fragments.
 */
export class Fragments {
  #fragments = new Map<string, OsmosNode>()

  register(id: string, node: OsmosNode) {
    if (this.#fragments.has(id)) {
      console.warn(`<Up.Fragment id="${id}"> is rendered multiple times.`)
    }

    this.#fragments.set(id, node)
  }

  get(id: string) {
    return this.#fragments.get(id)
  }
}
