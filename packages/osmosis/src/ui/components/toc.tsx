import { TOCItemType } from '@osmosjs/osmosis/plugins'

export const TOC = ({ toc }: { toc: TOCItemType[] }) => {
  return (
    <div className="sticky border-r top-(--docs-header-height) [grid-area:toc] h-[calc(var(--docs-height)-var(--docs-header-height))] flex flex-col w-(--toc-width) pt-12 pe-4 pb-2 xl:layout:[--toc-width:268px] max-xl:hidden">
      <h3 className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground">
        <i className="hgi hgi-stroke hgi-text-align-left"></i>
        On this page
      </h3>
      <div className="relative min-h-0 text-sm ms-px overflow-auto [scrollbar-width:none] mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3">
        <nav id="toc" className="relative flex flex-col border-s border-foreground/10">
          <div
            id="toc-thumb"
            className="absolute top-(--thumb-top) h-(--thumb-height) w-0.5 rounded-e-sm bg-primary transition-[top,height] duration-250"
          />
          {toc.map((item) => (
            <a
              href={item.url}
              up-scroll-behavior="smooth"
              className="prose relative py-1.5 text-sm text-muted-foreground hover:text-accent-foreground transition-colors wrap-anywhere data-[active=true]:text-foreground"
              style={{
                paddingInlineStart: `${item.depth * 14}px`,
              }}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
