import { OsmosNode } from '@osmosjs/osmos'
import { SidebarToggle } from '@osmosjs/osmosis/ui'
import { DocsearchInput } from './docsearch_input.jsx'

export interface NavbarProps {
  components?: {
    logo?: OsmosNode
    search?: OsmosNode
  }
}

const DEFAULT_COMPONENTS: NavbarProps['components'] = {
  logo: (
    <a className="inline-flex items-center gap-3 my-2 text-foreground font-semibold" href="/">
      <i className="hgi hgi-stroke hgi-sparkles text-xl text-yellow-300"></i>
      <span>OsmosJS</span>
    </a>
  ),
  search: <DocsearchInput />,
}

export const Navbar = ({ components }: NavbarProps) => {
  return (
    <header
      up-fixed="top"
      className="sticky [grid-area:header] flex flex-col top-0 z-20 backdrop-blur-sm transition-colors layout:[--header-height:--spacing(14)]"
    >
      <div>
        <div className="px-[24px] h-[61px] border-b border-neutral grid grid-cols-3 items-center">
          <div className="flex justify-between md:pl-4">
            {components?.logo ?? DEFAULT_COMPONENTS.logo}
          </div>
          <div>
            <div className="max-md:hidden">{components?.search ?? DEFAULT_COMPONENTS.search}</div>
          </div>
          <div className="md:hidden flex justify-end items-center">
            <SidebarToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
