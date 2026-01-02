import { ComponentProps } from '@osmosjs/osmos'

export const Accordion = ({ ...props }: ComponentProps<'details'>) => {
  return (
    <details
      className="divide-y divide-border overflow-hidden rounded-lg border bg-card"
      {...props}
    />
  )
}

export const AccordionSummary = ({ children, ...props }: ComponentProps<'summary'>) => {
  return (
    <summary
      className="cursor-pointer not-prose flex flex-row items-center text-card-foreground font-medium has-focus-visible:bg-accent"
      {...props}
    >
      <div className="group flex flex-1 items-center gap-2 px-3 py-2.5 text-start focus-visible:outline-none">
        <i className="hgi hgi-stroke hgi-arrow-right-01 text-muted-foreground"></i>
        {children}
      </div>
    </summary>
  )
}

export const AccordionContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={['overflow-hidden px-4 pb-2 text-[0.9375em] prose-no-margin', className]}
      {...props}
    />
  )
}
