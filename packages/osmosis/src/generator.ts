import { type Logger } from '@adonisjs/core/logger'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface StaticSiteGeneratorOptions {
  url: URL
  routes: string[]
  logger: Logger
  output: URL
}

export class StaticSiteGenerator {
  constructor(private options: StaticSiteGeneratorOptions) {}

  async export() {
    for (const route of this.options.routes) {
      const response = await fetch(new URL(route, this.options.url))
      const text = await response.text()
      await this.writeToDisk(route, text)
      this.options.logger.info(`Generated "${route}.html"`)
    }
  }

  async writeToDisk(route: string, content: string) {
    const outputPath = join(fileURLToPath(this.options.output), `${route}.html`)
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, content)
  }
}
