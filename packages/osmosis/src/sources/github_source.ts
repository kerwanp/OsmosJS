import { VFile } from 'vfile'
import { type SourceContract } from '../types.js'
import { Octokit } from 'octokit'
import { join, relative } from 'node:path'

export interface GithubSourceOptions {
  owner: string
  repo: string
  ref: string
  path: string
  token?: string
}

export class GithubSource implements SourceContract {
  #octokit: Octokit

  constructor(private options: GithubSourceOptions) {
    this.#octokit = new Octokit({ auth: options.token })
  }

  async list(path: string): Promise<VFile[]> {
    const response = await this.#octokit.rest.repos.getContent({
      owner: this.options.owner,
      repo: this.options.repo,
      ref: this.options.ref,
      path: join(this.options.path, path),
    })

    if (!Array.isArray(response.data)) return []

    return response.data
      .filter((file) => file.type === 'file')
      .map((file) => {
        return new VFile({
          path: relative(this.options.path, file.path),
          value: file.content,
          data: file,
        })
      })
  }

  async read(file: VFile): Promise<VFile> {
    const response = await this.#octokit.rest.repos.getContent({
      owner: this.options.owner,
      repo: this.options.repo,
      ref: this.options.ref,
      path: join(this.options.path, file.path),
      mediaType: {
        format: 'raw',
      },
    })

    file.value = response.data as unknown as string

    return file
  }
}
