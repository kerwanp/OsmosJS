import DocsLayout from '../layouts/docs_layout.tsx'
import { MARKDOWN_COMPONENTS } from '../components/markdown.tsx'
import { TOC } from '../components/toc.tsx'
import { ComponentProps, createContext } from '@osmosjs/osmos'
import { Documentation, DocumentationPage } from '@osmosjs/osmosis/loaders'
import { DocumentationPageComponent } from '@osmosjs/osmosis'
import { Providers } from '../providers.tsx'
import { Button } from '@osmosjs/osmosis/ui'

export const DocumentationContext = createContext<{
  documentations: Documentation[]
  documentation: Documentation
  page: DocumentationPage
}>()

export default async function DocPage(props: ComponentProps<DocumentationPageComponent>) {
  const { Markdown, toc } = await props.page.load()

  return (
    <Providers>
      <DocumentationContext.Provider value={props}>
        <DocsLayout>
          <article
            id="page"
            className="relative flex flex-col [grid-area:main] px-0 py-6 gap-4 md:px-9 md:pt-8 xl:px-14 xl:pt-14 *:max-w-225"
          >
            <div className="border-b pb-4 space-y-4">
              <h1 className="text-[1.75em] font-semibold">{props.page.title}</h1>
              <p className="empty:hidden text-lg text-muted-foreground">{props.page.description}</p>
              <Button size="sm" render={<a href={props.page.githubUrl} target="_blank" />}>
                <i className="hgi hgi-stroke hgi-github text-base"></i>
                Edit on Github
              </Button>
            </div>
            <div className="prose prose-invert">
              <Markdown components={MARKDOWN_COMPONENTS}>{props.page.value}</Markdown>
            </div>
          </article>
          <TOC toc={toc ?? []} />
        </DocsLayout>
      </DocumentationContext.Provider>
    </Providers>
  )
}
