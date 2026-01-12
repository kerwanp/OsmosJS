import { OsmosisContext } from '../../providers/osmosis_provider.jsx'
import {
  Sidebar,
  SidebarBackdrop,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuContent,
  SidebarMenuItem,
  SidebarMenuLabel,
} from '../ui/sidebar.jsx'
import { SocialButton } from '../social_button.jsx'
import { DocumentationSwitcher } from '../documentation_switcher.jsx'
import { Navbar } from '../navbar.jsx'
import {
  DocumentationMenuCategory,
  DocumentationMenuPage,
} from '../../../loaders/documentation_loader.js'
import { DocumentationArticle } from '../documentation_article.jsx'
import { TOC } from '../toc.jsx'
import { DEFAULT_MARKDOWN_COMPONENTS } from '../ui/markdown.jsx'
import { MDXComponents } from 'mdx/types.js'

export interface DocumentationLayout {
  markdown?: {
    components?: MDXComponents
  }
}

export const DocumentationLayout = async ({ markdown }: DocumentationLayout) => {
  const { documentation, page, osmosis } = OsmosisContext.getOrFail()
  const { Markdown, toc } = await page.load()

  return (
    <div
      className={[
        'grid docs-grid overflow-x-clip auto-cols-auto auto-rows-auto docs-grid min-h-(--docs-height)',
        '[--sidebar-width:0px] [--sidebar-col:0px] [--toc-width:0px]',
        'md:[--sidebar-width:268px] md:[--sidebar-col:268px]',
        'xl:[--toc-width:268px]',
      ]}
    >
      <Navbar />
      <SidebarBackdrop />
      <Sidebar>
        <SidebarHeader>
          <DocumentationSwitcher />
        </SidebarHeader>
        <SidebarContent>
          {documentation.menu.map((category) => (
            <Category category={category} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex gap-1.5">
            {documentation.socials?.github && (
              <SocialButton
                social="github"
                render={<a href={documentation.socials?.github} target="_blank" />}
              />
            )}
            {documentation.socials?.npm && (
              <SocialButton
                social="npm"
                render={<a href={documentation.socials?.npm} target="_blank" />}
              />
            )}
            {documentation.socials?.discord && (
              <SocialButton
                social="discord"
                render={<a href={documentation.socials?.discord} target="_blank" />}
              />
            )}
            {documentation.socials?.x && (
              <SocialButton
                social="x"
                render={<a href={documentation.socials?.x} target="_blank" />}
              />
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      <DocumentationArticle page={page}>
        <Markdown components={markdown?.components ?? DEFAULT_MARKDOWN_COMPONENTS} />
      </DocumentationArticle>
      {toc?.length ? <TOC toc={toc} /> : undefined}
    </div>
  )
}

const Category = ({ category }: { category: DocumentationMenuCategory }) => {
  return (
    <SidebarMenu>
      {category.name && <SidebarMenuLabel>{category.name}</SidebarMenuLabel>}
      <SidebarMenuContent>
        {category.items.map((item) => (
          <Item item={item} />
        ))}
      </SidebarMenuContent>
    </SidebarMenu>
  )
}

async function Item({ item }: { item: DocumentationMenuPage }) {
  const { osmosis } = OsmosisContext.getOrFail()
  const { default: Icon } = await osmosis.config.components.Icon()
  return (
    <SidebarMenuItem up-follow up-target="#content" up-history render={<a href={item.href} />}>
      {item.icon && <Icon name={item.icon}></Icon>}
      {item.name}
    </SidebarMenuItem>
  )
}
