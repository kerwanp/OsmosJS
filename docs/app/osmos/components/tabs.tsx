import { ComponentProps } from '@osmosjs/osmos'

export const Tabs = ({
  className,
  defaultValue,
  ...props
}: ComponentProps<'div'> & { defaultValue?: string }) => {
  return (
    <div
      x-data={`{ tab: '${defaultValue}' }`}
      className={['flex flex-col overflow-hidden rounded-xl border bg-secondary my-4', className]}
      {...props}
    />
  )
}

export const TabsList = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      role="tablist"
      className={[
        'flex gap-3.5 text-secondary-foreground overflow-x-auto px-4 not-prose',
        className,
      ]}
      {...props}
    />
  )
}

export const TabsListTrigger = ({
  className,
  value,
  ...props
}: ComponentProps<'button'> & { value: string }) => {
  return (
    <button
      role="tab"
      className={[
        'inline-flex items-center gap-2 whitespace-nowrap text-muted-foreground border-b border-transparent py-2 text-sm font-medium transition-colors',
        '[&_svg]:size-4 hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-foreground',
        className,
      ]}
      {...{
        'x-on:click': `tab = '${value}'`,
        'x-bind:data-state': `tab === '${value}' ? 'active' : 'inactive'`,
      }}
      {...props}
    />
  )
}

export const Tab = ({ className, value, ...props }: ComponentProps<'div'> & { value: string }) => {
  return (
    <div
      className={[
        'p-4 text-[0.9375rem] bg-background rounded-xl outline-none prose-no-margin data-[state=inactive]:hidden [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none',
        className,
      ]}
      x-show={`tab === '${value}'`}
      {...props}
    />
  )
}
