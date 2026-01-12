import { PropsWithChildren } from '@osmosjs/osmos'
import { DocumentationPage } from '../../loaders/documentation_loader.js'
import { Button } from './ui/button.jsx'

export const DocumentationArticle = async ({
  children,
  page,
}: PropsWithChildren<{ page: DocumentationPage }>) => {
  return (
    <>
      <article
        id="page"
        className="relative flex flex-col [grid-area:main] px-0 py-6 gap-4 md:px-9 md:pt-8 xl:px-14 xl:pt-14 *:max-w-225"
      >
        <div className="border-b pb-4 space-y-4">
          <h1 className="text-[1.75em] font-semibold">{page.title}</h1>
          <p className="empty:hidden text-lg text-muted-foreground">{page.description}</p>
          <Button size="sm" render={<a href={page.githubUrl} target="_blank" />}>
            <i className="hgi hgi-stroke hgi-github text-base"></i>
            Edit on Github
          </Button>
        </div>
        <div className="prose prose-invert">{children}</div>
      </article>
    </>
  )
}
