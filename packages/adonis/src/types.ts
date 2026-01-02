import { type ContainerBindings } from '@adonisjs/core/types'
import { type OsmosManager } from './osmos_manager.js'

export interface OsmosService extends OsmosManager {}

export type ResolvedContainerBindings<Bindings extends (keyof ContainerBindings)[]> = {
  [K in keyof Bindings]: ContainerBindings[Bindings[K]]
}
