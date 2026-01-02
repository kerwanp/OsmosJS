import { readdir } from 'node:fs/promises'
import { type SourceContract } from '../types.js'
import { type VFile } from 'vfile'
import { read, toVFile } from 'to-vfile'
import { pathToFileURL } from 'node:url'

export interface FSSourceOptions {
  path: string | URL
}

export class FSSource implements SourceContract {
  url: URL

  constructor(options: FSSourceOptions) {
    this.url = typeof options.path === 'string' ? pathToFileURL(options.path) : options.path
  }

  async read(file: VFile): Promise<VFile> {
    return read(file)
  }

  async list(path: string): Promise<VFile[]> {
    const paths = await readdir(new URL(path, this.url), { recursive: true })
    return paths.map((entry) =>
      toVFile({
        path: new URL(entry, this.url),
        data: {
          relativePath: entry,
        },
      })
    )
  }
}
