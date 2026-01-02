import { useRender } from '@osmosjs/osmos'

export const Button = ({ render, ...props }: useRender.ComponentProps<'button'>) => {
  return useRender({
    render,
    defaultTagName: 'button',
    props: {
      className: [
        'inline-flex items-center justify-center rounded-md p-2 font-medium transition-colors duration-100 disabled:pointer-events-none',
        'disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border px-2 py-1.5 text-xs gap-2 [&_svg]:size-3.5',
        'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
      ],
      ...props,
    },
  })
}
