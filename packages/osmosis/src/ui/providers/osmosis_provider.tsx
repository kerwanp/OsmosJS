import { createContext, PropsWithChildren } from '@osmosjs/osmos'
import { Documentation, DocumentationPage } from '../../loaders/documentation_loader.js'
import { UnpolyProvider } from './unpoly_provider.jsx'
import { Osmosis } from '../../osmosis.js'

export interface OsmosisState {
  documentations: Documentation[]
  documentation: Documentation
  page: DocumentationPage
  osmosis: Osmosis
}

export const OsmosisContext = createContext<OsmosisState>()

export const OsmosisProvider = ({ children, ...props }: PropsWithChildren<OsmosisState>) => {
  return (
    <UnpolyProvider>
      <OsmosisContext.Provider value={props}>{children}</OsmosisContext.Provider>
    </UnpolyProvider>
  )
}
