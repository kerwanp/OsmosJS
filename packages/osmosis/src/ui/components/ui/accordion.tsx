import { ComponentProps } from '@osmosjs/osmos'

// TODO: Closing animation does not seem to work properly even with transition-discrete on details-content

export const Accordion = ({ ...props }: ComponentProps<'details'>) => {
  return (
    <details
      className={[
        'divide-y divide-border overflow-hidden rounded-lg border bg-card group',
        'details-content:transition-discrete details-content:[block-size:0] open:details-content:[block-size:auto] details-content:transition-[block-size,content-visiblity]',
      ]}
      {...props}
    />
  )
}

export const AccordionSummary = ({ children, ...props }: ComponentProps<'summary'>) => {
  return (
    <summary
      className="select-none cursor-pointer not-prose flex flex-row items-center text-card-foreground font-medium has-focus-visible:bg-accent"
      {...props}
    >
      <div
        className={[
          'group flex flex-1 items-center gap-2 px-3 py-2.5 text-start focus-visible:outline-none',
        ]}
      >
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
