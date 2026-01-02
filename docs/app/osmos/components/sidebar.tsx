import { ComponentProps } from '@osmosjs/osmos'

export const Sidebar = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <nav
      className={[
        'sticky z-10 text-sidebar-foreground [grid-area:sidebar] pointer-events-none *:pointer-events-auto top-(--docs-header-height) h-[calc(var(--docs-height)-var(--docs-header-height))]',
        className,
      ]}
      {...props}
    >
      <aside className="absolute flex flex-col w-full start-0 inset-y-0 items-end text-sm duration-250 *:w-(--sidebar-width)">
        <div className="h-full border-l flex flex-col">{children}</div>
      </aside>
    </nav>
  )
}

export const SidebarHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['flex flex-col gap-3 py-4 pb-2 empty:hidden']} {...props} />
}

export const SidebarContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={['flex-1 rounded-[inherit] py-4 overscroll-contain space-y-8']} {...props} />
  )
}

export const SidebarFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['flex flex-col gap-3 p-4 empty:hidden']} {...props} />
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

export const SidebarMenuLink = ({ className, ...props }: ComponentProps<'a'>) => {
  return (
    <a
      up-scroll="top"
      className={[
        'pl-4 py-0.5 flex items-center gap-2 border-l font-medium border-transparent transition-all duration-100',
        'aria-[current=page]:border-primary aria-[current=page]:text-foreground',
        'hover:text-foreground',
        className,
      ]}
      {...props}
    />
  )
}
