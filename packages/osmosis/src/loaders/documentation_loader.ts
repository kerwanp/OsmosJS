import { type LoaderContract } from '@adonisjs/content/types'
import vine from '@vinejs/vine'
import { compile, run } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import * as runtime from '@osmosjs/osmos/jsx-runtime'
import { basename, dirname, extname, join } from 'node:path'
import { rehypeCode, remarkCodeTab, remarkHeading, remarkInstall } from '@osmosjs/osmosis/plugins'
import { type Infer } from '@vinejs/vine/types'
import { type SourceFactory, type SourceContract } from '../types.js'
import { type VFile } from 'vfile'

export const MetaFileSchema = vine.object({
  title: vine.string(),
  description: vine.string(),
  pages: vine.array(vine.string()),
  icon: vine.string().optional(),
})

export const PageFrontmatterSchema = vine.object({
  title: vine.string(),
  description: vine.string().optional(),
  icon: vine.string().optional(),
})

export const MenuPageSchema = vine.object({
  name: vine.string(),
  href: vine.string(),
  icon: vine.string().optional(),
})

export const MenuCategorySchema = vine.object({
  name: vine.string().optional(),
  items: vine.array(MenuPageSchema),
})

export const PageSchema = vine.object({
  path: vine.string(),
  title: vine.string(),
  description: vine.string().optional(),
  icon: vine.string().optional(),
  slug: vine.string(),
  githubUrl: vine.string(),

  content: vine.any(),
  toc: vine.any(),
})

export const DocumentationSchema = vine.object({
  name: vine.string(),
  description: vine.string(),
  prefix: vine.string(),
  icon: vine.string().optional(),

  pages: vine.array(PageSchema),
  menu: vine.array(MenuCategorySchema),
})

export type DocumentationMeta = Infer<typeof MetaFileSchema>
export type DocumentationPage = Infer<typeof PageSchema>
export type Documentation = Infer<typeof DocumentationSchema>
export type DocumentationMenuCategory = Infer<typeof MenuCategorySchema>
export type DocumentationMenuPage = Infer<typeof MenuPageSchema>

export interface DocumentationLoaderOptions {
  prefix: string

  /**
   * URL where documentation is located.
   * Used for generating "Edit in Github" urls.
   */
  githubUrl: string

  source: SourceFactory | SourceContract
}

export class DocumentationLoader implements LoaderContract<typeof DocumentationSchema> {
  #source?: SourceContract

  constructor(private options: DocumentationLoaderOptions) {}

  async source() {
    if (!this.#source) {
      this.#source =
        typeof this.options.source === 'function'
          ? await this.options.source()
          : this.options.source
    }

    return this.#source
  }

  async load(schema: typeof DocumentationSchema, validatorMetaData?: any): Promise<Documentation> {
    const source = await this.source()
    const files = await source.list('./')

    const meta = await this.loadMeta(files)
    const pages = await this.loadPages(files)
    const menu = await this.loadMenu(pages, meta)

    return vine.validate({
      schema,
      data: {
        name: meta.title,
        description: meta.description,
        icon: meta.icon,
        prefix: this.options.prefix,

        pages,
        menu,
      },
      meta: validatorMetaData,
    })
  }

  async loadPages(files: VFile[]) {
    const pages: DocumentationPage[] = []
    const source = await this.source()

    for (const file of files.filter((entry) => entry.extname === '.mdx')) {
      await source.read(file)

      const content = await this.compileMDX(file.value.toString())

      const result: any = await run(content, {
        ...runtime,
        baseUrl: import.meta.url,
      })

      const frontmatter = await vine.validate({
        schema: PageFrontmatterSchema,
        data: result.frontmatter,
      })

      pages.push({
        path: file.data.relativePath ?? file.path,
        slug: this.#pathToSlug(file.data.relativePath || file.path),
        githubUrl: join(this.options.githubUrl, file.data.relativePath ?? file.path),

        ...frontmatter,

        content: result.default,
        toc: content.data.toc,
      })
    }

    return pages
  }

  async loadMeta(files: VFile[]) {
    const source = await this.source()
    const file = files.find((entry) => entry.basename === 'meta.json')

    if (!file) {
      throw new Error('meta.json file not found')
    }

    await source.read(file)

    const parsed = JSON.parse(file.value.toString()) as DocumentationMeta

    return vine.validate({
      schema: MetaFileSchema,
      data: parsed,
    })
  }

  async loadMenu(
    pages: DocumentationPage[],
    meta: DocumentationMeta
  ): Promise<DocumentationMenuCategory[]> {
    const menu = this.#pagesToMenu(pages, meta.pages)
    return menu
  }

  #pagesToMenu(docs: DocumentationPage[], pages: string[]): DocumentationMenuCategory[] {
    const items: DocumentationMenuCategory[] = []

    let category: DocumentationMenuCategory | undefined

    const CATEGORY_RE = /---(.+)---/

    for (const page of pages) {
      let matches = page.match(CATEGORY_RE)
      if (matches) {
        if (category) {
          items.push(category)
        }

        const name = matches[1]
        category = {
          name,
          items: [],
        }
      } else {
        const doc = docs.find((item) => {
          return this.#normalizePath(item.path) === page
        })

        if (!doc) {
          console.warn(`Could not find entry for "${page}"`)
          continue
        }

        const item = {
          type: 'page',
          name: doc.title,
          href: doc.slug,
          icon: doc.icon || undefined,
        } as const

        if (!category) {
          category = {
            items: [],
          }
        }

        category.items.push(item)
      }
    }

    items.push(category!)

    return items
  }

  async compileMDX(value: string) {
    const file = await compile(value, {
      outputFormat: 'function-body',
      jsxImportSource: '@osmosjs/osmos',
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkHeading,
        remarkInstall,
        remarkCodeTab,
      ],
      rehypePlugins: [[rehypeCode]],
    })

    return file
  }

  #normalizePath(path: string) {
    const slug = join(dirname(path), basename(path, extname(path)))
    return slug
  }

  #pathToSlug(path: string) {
    let slug = `${this.options.prefix}/${join(dirname(path), basename(path, extname(path))).replaceAll('index', '')}`
    if (slug.endsWith('/')) {
      slug = slug.slice(0, slug.length - 1)
    }

    return slug
  }
}

declare module 'vfile' {
  export interface DataMap {
    relativePath: string
  }
}
