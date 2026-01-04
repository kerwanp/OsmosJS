import { ComponentProps, html, OsmosNode } from '@osmosjs/osmos'

export const CodeBlock = ({
  className,
  icon,
  title,
  tabIndex,
  children,
  ...props
}: ComponentProps<'pre'> & { icon?: string; title?: OsmosNode }) => {
  return (
    <figure
      tabIndex={-1}
      className={[
        'my-4 bg-card rounded-xl relative border shadow-sm not-prose overflow-hidden text-sm',
        className,
      ]}
      {...props}
    >
      {title && (
        <div className="flex text-muted-foreground items-center gap-2 h-9.5 border-b px-4">
          {icon && <div className="[&_svg]:size-3.5">{html(icon)}</div>}
          <figcaption className="flex-1 truncate">{title}</figcaption>
        </div>
      )}
      <div
        role="region"
        tabIndex={0}
        className={[
          'text-[0.8125rem] py-3.5 overflow-auto max-h-[600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        ]}
      >
        <pre className={['min-w-full w-max *:flex *:flex-col']}>{children}</pre>
      </div>
    </figure>
  )
}
