import app from '@adonisjs/core/services/app'
import type { OsmosService } from '../src/types.js'

let osmos: OsmosService

await app.booted(async () => {
  osmos = await app.container.make('osmos')
})

export { osmos as default }
