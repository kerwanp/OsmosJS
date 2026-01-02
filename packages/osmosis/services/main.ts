import app from '@adonisjs/core/services/app'
import { type Osmosis } from '../src/osmosis.js'

let osmosis: Osmosis

await app.booted(async () => {
  osmosis = await app.container.make('osmosis')
})

export { osmosis as default }
