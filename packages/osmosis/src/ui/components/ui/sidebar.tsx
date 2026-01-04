import { ComponentProps, mergeProps, useRender } from '@osmosjs/osmos'

export const Sidebar = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <>
      <nav
        id="sidebar"
        role="navigation"
        className={[
          'z-10 text-sidebar-foreground pointer-events-none *:pointer-events-auto top-(--docs-header-height) h-[calc(var(--docs-height)-var(--docs-header-height))]',
          'md:[grid-area:sidebar] w-auto md:sticky md:layout:[--sidebar-width:268px] md:bg-transparent',
          'fixed max-md:right-0 max-md:translate-x-full max-md:w-full max-md:max-w-95 bg-sidebar transition-transform',
          className,
        ]}
        {...props}
      >
        <aside
          className={[
            'absolute flex flex-col w-full start-0 inset-y-0 text-sm duration-250 md:*:w-(--sidebar-width)',
            'md:items-end md:pr-0',
            'pr-4',
          ]}
        >
          <div className="h-full border-l flex flex-col">{children}</div>
        </aside>
      </nav>
    </>
  )
}

export const SidebarBackdrop = () => {
  return (
    <label
      id="sidebar-backdrop"
      for="sidebar-toggle"
      className={[
        'fixed cursor-pointer z-9 md:hidden! top-(--docs-header-height) w-full h-[calc(var(--docs-height)-var(--docs-header-height))] bg-black/50',
        'hidden',
      ]}
    />
  )
}

export const SidebarHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['flex flex-col gap-3 py-4 pb-2 empty:hidden', className]} {...props} />
}

export const SidebarContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={['flex-1 rounded-[inherit] py-4 overscroll-contain space-y-8', className]}
      {...props}
    />
  )
}

export const SidebarFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['flex flex-col gap-3 p-4 empty:hidden', className]} {...props} />
}

export const SidebarMenu = ({ className, ...props }: ComponentProps<'div'>) => {
  return <ul className={['', className]} {...props} />
}

export const SidebarMenuLabel = ({ className, ...props }: ComponentProps<'h2'>) => {
  return (
    <div
      className={['pl-4 border-l border-transparent text-muted-foreground text-xs mb-2', className]}
      {...props}
    />
  )
}

export const SidebarMenuContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['space-y-2', className]} {...props} />
}

export const SidebarMenuItem = ({ render, ...props }: useRender.ComponentProps<'button'>) => {
  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps(
      {
        'up-scroll': 'top',
        'className': [
          'pl-4 py-0.5 flex items-center gap-2 border-l font-medium border-transparent transition-all duration-100',
          'aria-[current=page]:border-primary aria-[current=page]:text-foreground',
          'hover:text-foreground',
        ],
      },
      props
    ),
  })
}

export const SidebarToggle = () => {
  return (
    <label aria-label="Toggle sidebar" className="cursor-pointer text-xl flex items-center">
      <input className="hidden peer" id="sidebar-toggle" type="checkbox" />
      <i role="button" className="hgi hgi-stroke hgi-panel-right peer-checked:hidden!"></i>
      <i
        role="button"
        className="hgi hgi-stroke hgi-cancel-01 hidden! peer-checked:inline-block!"
      ></i>
    </label>
  )
}
