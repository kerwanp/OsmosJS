import { type HttpContext } from '@adonisjs/core/http'
import { type NextFn } from '@adonisjs/core/types/http'
import { Readable } from 'node:stream'
import { OsmosManager } from '../osmos_manager.js'
import { renderToReadableStream } from '@osmosjs/osmos'
import { isJSXElement } from '@osmosjs/osmos/utils'
import { type Osmos } from '../osmos.js'

export default class OsmosMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const manager = await ctx.containerResolver.make(OsmosManager)
    const instance = manager.createInstance(ctx)

    ctx.osmos = instance

    await next()

    // TODO: Make it work properly
    if (ctx.response.hasContent && ctx.response.content?.length) {
      const content = ctx.response.content[0]

      if (isJSXElement(content)) {
        const stream = renderToReadableStream(content)
        ctx.response.header('Content-Type', 'text/html').stream(Readable.from(stream as any))
        ctx.response.lazyBody.content = undefined
      }
    }
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    osmos: Osmos
  }
}
