import { type HttpContext } from '@adonisjs/core/http'
import { Osmos } from './osmos.js'

export class OsmosManager {
  createInstance(ctx: HttpContext) {
    const osmos = new Osmos(ctx)
    return osmos
  }
}
