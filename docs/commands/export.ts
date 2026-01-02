import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { Osmosis } from '@osmosjs/osmosis'
import { createServer } from 'node:http'

export default class Export extends BaseCommand {
  static commandName = 'export'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    this.logger.info('Exporting HTML files')

    await this.#startHTTPServer()

    const router = await this.app.container.make('router')
    router.commit()

    const osmosis = await this.app.container.make(Osmosis)
    await osmosis.export()
  }

  async #startHTTPServer() {
    this.logger.info('Starting HTTP server')

    const server = await this.app.container.make('server')
    const http = createServer(server.handle.bind(server))
    server.setNodeServer(http)

    await server.boot()

    const host = process.env.HOST || '0.0.0.0'
    const port = Number(process.env.PORT || '3333')

    http.listen(port, host)

    this.app.terminating(async () => {
      await new Promise((res) => http.close(res))
    })

    return new Promise((res, rej) => {
      http.on('listening', res)
      http.on('error', rej)
    })
  }
}
