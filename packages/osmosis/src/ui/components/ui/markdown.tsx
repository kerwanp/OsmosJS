import { compile, run } from '@mdx-js/mdx'
import { PluggableList } from 'unified'
import * as runtime from '@osmosjs/osmos/jsx-runtime'
import { MDXContent } from 'mdx/types.js'
import { ComponentProps } from '@osmosjs/osmos'

export interface MarkdownOptions {
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export const Markdown = async ({
  children,
  options,
  ...props
}: {
  children: string
  options?: MarkdownOptions
} & ComponentProps<MDXContent>) => {
  // TODO: Use it properly and make it acessible
  const { default: osmosis } = await import('../../../../services/main.js')

  const file = await compile(children, {
    outputFormat: 'function-body',
    jsxImportSource: '@osmosjs/osmos',
    remarkPlugins: osmosis.config.markdown.remarkPlugins,
    rehypePlugins: osmosis.config.markdown.rehypePlugins,
  })

  const { default: Content } = await run(file, {
    ...runtime,
    baseUrl: import.meta.url,
  })

  return <Content {...props} />
}
