import { type SourceFactory, type OsmosisConfig } from './types.js'
import { type GithubSourceOptions, type GithubSource } from './sources/github_source.js'
import { type FSSource, type FSSourceOptions } from './sources/fs_source.js'

export function defineConfig(options: OsmosisConfig) {
  return options
}

export const sources: {
  fs: (options: FSSourceOptions) => SourceFactory<FSSource>
  github: (options: GithubSourceOptions) => SourceFactory<GithubSource>
} = {
  fs(options) {
    return async () => {
      const { FSSource } = await import('../src/sources/fs_source.js')
      return new FSSource(options)
    }
  },
  github(options) {
    return async () => {
      const { GithubSource } = await import('../src/sources/github_source.js')
      return new GithubSource(options)
    }
  },
}
