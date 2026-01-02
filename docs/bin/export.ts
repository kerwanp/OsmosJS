import { Ignitor } from '@adonisjs/core'
import 'reflect-metadata'

const APP_ROOT = new URL('../', import.meta.url)

const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

const application = new Ignitor(APP_ROOT, { importer: IMPORTER }).tap((app) => {}).createApp('web')

await application.init()
await application.boot()
await application.start(() => {
  console.log('start')
})
