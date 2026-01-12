import { compile, run } from '@mdx-js/mdx'
import { PluggableList } from 'unified'
import * as runtime from '@osmosjs/osmos/jsx-runtime'
import { MDXComponents, MDXContent } from 'mdx/types.js'
import { ComponentProps } from '@osmosjs/osmos'
import { CodeBlock } from './code_block.jsx'
import { Callout, CalloutContent, CalloutDescription, CalloutTitle } from './callout.jsx'
import { Tabs, Tab, TabsList, TabsListTrigger } from './tabs.jsx'
import { Heading } from './heading.jsx'
import { Card, Cards } from '../card.jsx'
import { Accordion, Accordions } from './accordion.jsx'
import { Step, Steps } from './steps.jsx'

export interface MarkdownOptions {
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
}

export const DEFAULT_MARKDOWN_COMPONENTS: MDXComponents = {
  h2: (props: ComponentProps<'h2'>) => <Heading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <Heading as="h3" {...props} />,

  pre: CodeBlock,

  Accordions,
  Accordion,
  Cards,
  Card,
  Callout,
  CalloutContent,
  CalloutTitle,
  CalloutDescription,
  CodeBlockTabs: Tabs,
  CodeBlockTab: (props: ComponentProps<typeof Tab>) => <Tab className="py-0" {...props} />,
  CodeBlockTabsList: TabsList,
  CodeBlockTabsTrigger: TabsListTrigger,
  Tabs,
  Tab,
  Steps,
  Step,
}

export const Markdown = async ({
  children,
  options,
  components,
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

  return <Content components={components ?? DEFAULT_MARKDOWN_COMPONENTS} {...props} />
}
