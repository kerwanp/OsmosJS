import { type ApplicationService } from '@adonisjs/core/types'
import { OsmosManager } from '../src/osmos_manager.js'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    osmos: OsmosManager
  }
}

export default class OsmosProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('osmos', async () => {
      return new OsmosManager()
    })
  }

  async boot() {}

  async ready() {}
}
