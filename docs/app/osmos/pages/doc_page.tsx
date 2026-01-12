import { ComponentProps } from '@osmosjs/osmos'
import { DocumentationPageComponent } from '@osmosjs/osmosis'
import { DEFAULT_MARKDOWN_COMPONENTS, DocumentationLayout } from '@osmosjs/osmosis/ui'
import RootLayout from '../layouts/root_layout.tsx'
import { ConfigurationSteps } from '../components/configuration_steps.tsx'
import { Providers } from '../providers.tsx'

export default function Page({ documentation, page }: ComponentProps<DocumentationPageComponent>) {
  return (
    <RootLayout title={`${documentation.name} - ${page.title}`} description={page.description}>
      <Providers>
        <DocumentationLayout
          markdown={{
            components: {
              ...DEFAULT_MARKDOWN_COMPONENTS,
              ConfigurationSteps,
            },
          }}
        />
      </Providers>
    </RootLayout>
  )
}
