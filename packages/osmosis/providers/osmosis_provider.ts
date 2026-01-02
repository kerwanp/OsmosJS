import { type ApplicationService } from '@adonisjs/core/types'
import { Osmosis } from '../src/osmosis.js'
import { type OsmosisConfig } from '../src/types.js'

export default class OsmosisProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(Osmosis, async (resolver) => {
      const logger = await resolver.make('logger')
      const router = await resolver.make('router')
      const config = this.app.config.get<OsmosisConfig>('osmosis')

      return new Osmosis(
        config,
        router,
        logger.child({
          service: 'osmosis',
        })
      )
    })

    this.app.container.alias('osmosis', Osmosis)
  }

  async boot() {
    const osmosis = await this.app.container.make(Osmosis)
    await osmosis.boot()
  }
}

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    osmosis: Osmosis
  }
}
