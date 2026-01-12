import { ComponentProps, OsmosNode } from '@osmosjs/osmos'

export function Cards({ className, ...props }: ComponentProps<'div'>) {
  return <div className={['grid grid-cols-2 gap-3 @container', className]} {...props} />
}

export type CardProps = Omit<ComponentProps<'div'>, 'title'> & {
  icon?: OsmosNode
  title: OsmosNode
  description?: OsmosNode

  href?: string
  external?: boolean
}

export function Card({ icon, title, description, ...props }: CardProps) {
  const E = props.href ? 'a' : 'div'

  return (
    <E
      {...props}
      data-card
      className={[
        'block not-prose rounded-xl border bg-card p-4 text-card-foreground transition-colors @max-lg:col-span-full',
        props.href && 'hover:bg-accent/80',
        props.className,
      ]}
    >
      {icon ? (
        <div className="not-prose mb-2 w-fit shadow-md rounded-lg border bg-muted p-1.5 text-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? <p className="my-0! text-sm text-muted-foreground">{description}</p> : null}
      <div className="text-sm text-muted-foreground prose-no-margin empty:hidden">
        {props.children}
      </div>
    </E>
  )
}
