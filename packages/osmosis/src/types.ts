import { type PluggableList } from 'unified'
import {
  type Documentation,
  type DocumentationPage,
  type DocumentationLoaderOptions,
} from './loaders/documentation_loader.js'
import { type LazyImport } from '@adonisjs/core/types/common'
import { type FC } from '@osmosjs/osmos'
import { type VFile } from 'vfile'

declare module 'mdast' {
  interface Data {
    /**
     * [Osmosis] Get content of unserializable element, `remarkStructure` uses it to generate search index.
     */
    _string?: string[]
  }
}

export interface OsmosisConfig {
  cache: boolean
  output: URL
  documentations: DocumentationLoaderOptions[]
  markdown: {
    remarkPlugins: PluggableList
    rehypePlugins: PluggableList
  }
  page: LazyImport<DocumentationPageComponent>
}

export interface SourceContract {
  list(path: string): Promise<VFile[]>
  read(file: VFile): Promise<VFile>
}

export type SourceFactory<Source extends SourceContract = SourceContract> = () => Promise<Source>

export type DocumentationPageComponent = FC<{
  documentation: Documentation
  documentations: Documentation[]
  page: DocumentationPage
}>
