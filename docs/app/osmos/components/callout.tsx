import { ComponentProps } from '@osmosjs/osmos'

export const Callout = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={
        'flex gap-2 my-4 rounded-xl border bg-base-300 p-3 ps-1 text-sm text-base-content shadow-md'
      }
    >
      <div role="none" className="w-0.5 bg-primary rounded-sm"></div>
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="text-neutral-content prose-no-margin empty:hidden">{children}</div>
      </div>
    </div>
  )
}
