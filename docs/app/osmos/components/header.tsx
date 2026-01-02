import { Osmos } from '@osmosjs/osmos'
import { SearchDialog } from './search_dialog.tsx'

export function Header(this: Osmos) {
  return (
    <header
      up-fixed="top"
      className="sticky [grid-area:header] flex flex-col top-0 z-20 backdrop-blur-sm transition-colors layout:[--header-height:--spacing(14)]"
    >
      <div>
        <div className="px-[24px] h-[61px] border-b border-neutral grid grid-cols-3 items-center">
          <div className="flex justify-between pl-4">
            <a
              className="inline-flex items-center gap-3 my-2 text-foreground font-semibold"
              href="/"
            >
              <i className="hgi hgi-stroke hgi-sparkles text-xl text-yellow-300"></i>
              <span>OsmosJS</span>
            </a>
          </div>
          <SearchDialog />
          <div></div>
        </div>
      </div>
    </header>
  )
}
