import { Documentation } from '@osmosjs/osmosis/loaders'
import { Popover, PopoverDialog, PopoverTrigger } from '@osmosjs/osmosis/ui'

export async function PackagesSwitcher({
  documentations,
  documentation,
}: {
  documentation: Documentation
  documentations: Documentation[]
}) {
  return (
    <Popover className="relative pl-4">
      <PopoverTrigger
        render={
          <button className="relative cursor-pointer flex w-full items-center gap-2 rounded-lg p-2 border bg-secondary/50 text-start text-secondary-foreground transition-colors hover:bg-accent" />
        }
      >
        {documentation.icon && (
          <div className="size-6 border rounded-sm flex items-center justify-center shrink-0">
            <i className={documentation.icon} />
          </div>
        )}
        {documentation.name}
        <i className="ml-auto hgi hgi-stroke hgi-unfold-more"></i>
      </PopoverTrigger>
      <PopoverDialog>
        {documentations.map((documentation) => (
          <Item documentation={documentation} />
        ))}
      </PopoverDialog>
    </Popover>
  )
}

const Item = ({ documentation }: { documentation: Documentation }) => {
  return (
    <a
      className="flex items-start gap-2 rounded-lg p-1.5 hover:bg-accent hover:text-accent-foreground"
      href={documentation.prefix}
    >
      {documentation.icon && (
        <div className="size-6 border rounded-sm flex items-center justify-center shrink-0 mt-1">
          <i className={documentation.icon} />
        </div>
      )}
      <div>
        <p className="text-sm font-medium">{documentation.name}</p>
        <p className="text-[0.8125rem] text-muted-foreground empty:hidden">
          {documentation.description}
        </p>
      </div>
    </a>
  )
}
