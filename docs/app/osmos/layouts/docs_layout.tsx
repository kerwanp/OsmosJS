import { PropsWithChildren } from '@osmosjs/osmos'
import { Header } from '../components/header.tsx'
import RootLayout from './root_layout.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuContent,
  SidebarMenuLabel,
  SidebarMenuItem,
  SidebarBackdrop,
  SocialButton,
} from '@osmosjs/osmosis/ui'
import { PackagesSwitcher } from '../components/packages_switcher.tsx'
import { DocumentationMenuCategory, DocumentationMenuPage } from '@osmosjs/osmosis/loaders'
import { DocumentationContext } from '../pages/doc_page.tsx'

export default function DocsLayout({ children }: PropsWithChildren) {
  const { documentation, documentations, page } = DocumentationContext.getOrFail()

  return (
    <RootLayout title={`${documentation.name} - ${page.title}`} description={page.description}>
      <div
        className={[
          'grid docs-grid overflow-x-clip auto-cols-auto auto-rows-auto docs-grid min-h-(--docs-height)',
          '[--sidebar-width:0px] [--sidebar-col:0px] [--toc-width:0px]',
          'md:[--sidebar-width:268px] md:[--sidebar-col:268px]',
          'xl:[--toc-width:268px]',
        ]}
      >
        <Header />
        <SidebarBackdrop />
        <Sidebar>
          <SidebarHeader>
            <PackagesSwitcher documentations={documentations} documentation={documentation} />
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
        {children}
      </div>
    </RootLayout>
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

function Item({ item }: { item: DocumentationMenuPage }) {
  return (
    <SidebarMenuItem up-follow up-target="#content" up-history render={<a href={item.href} />}>
      {item.icon && <i className={`hgi hgi-stroke hgi-${item.icon} text-lg`}></i>}
      {item.name}
    </SidebarMenuItem>
  )
}
