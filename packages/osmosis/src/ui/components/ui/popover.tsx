import { ComponentProps, createContext, mergeProps, useRender } from '@osmosjs/osmos'
import { randomUUID } from 'node:crypto'

const PopoverContext = createContext<{ popoverId: string }>()

export const Popover = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <PopoverContext.Provider
      value={{
        popoverId: randomUUID(),
      }}
    >
      <div className={['relative', className]} {...props} />
    </PopoverContext.Provider>
  )
}

export const PopoverTrigger = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<'button'>) => {
  const { popoverId } = PopoverContext.getOrFail()

  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps(
      {
        popovertarget: popoverId,
        style: {
          anchorName: '--popover-anchor',
        },
      },
      props
    ),
  })
}

export const PopoverDialog = ({ className, ...props }: ComponentProps<'div'>) => {
  const { popoverId } = PopoverContext.getOrFail()

  return (
    <div
      popover
      id={popoverId}
      className={[
        'absolute inset-0 m-0 text-secondary-foreground rounded-xl bg-popover text-sm shadow-lg border mt-2 p-1',
        'opacity-0 starting:open:opacity-0 open:opacity-100 transition-all transition-discrete',
        className,
      ]}
      style={{
        positionAnchor: '--popover-anchor',
        positionArea: 'bottom span-right',
        width: 'anchor-size(width)',
      }}
      {...props}
    />
  )
}
