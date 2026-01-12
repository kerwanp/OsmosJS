import { ComponentProps } from '@osmosjs/osmos'

const variants = {
  info: {
    color: 'var(--color-info)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  warning: {
    color: 'var(--color-warning)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  warn: {
    color: 'var(--color-warning)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  important: {
    color: 'var(--color-warning)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  caution: {
    color: 'var(--color-error)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  success: {
    color: 'var(--color-success)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  idea: {
    color: 'var(--color-warning)',
    icon: <i className="hgi hgi-stroke hgi-idea" />,
  },
  note: {
    color: 'var(--color-info)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
  tip: {
    color: 'var(--color-info)',
    icon: <i className="hgi hgi-stroke hgi-alert-circle" />,
  },
}

export const Callout = ({
  className,
  children,
  variant = 'info',
  ...props
}: ComponentProps<'div'> & { variant?: keyof typeof variants }) => {
  return (
    <div
      className={[
        'flex gap-2 my-4 rounded-xl border bg-card p-3 ps-1 text-sm text-card-foreground shadow-md',
        className,
      ]}
      style={{
        '--callout-color': variants[variant].color,
      }}
      {...props}
    >
      <div role="none" className="w-0.5 bg-(--callout-color)/50 rounded-sm" />
      <div className="text-lg -me-0. text-(--callout-color)">{variants[variant].icon}</div>
      {children}
    </div>
  )
}

export const CalloutContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={['flex flex-col gap-2 min-w-0 flex-1', className]} {...props} />
}

export const CalloutTitle = ({ className, ...props }: ComponentProps<'p'>) => {
  return <p className={['font-medium my-0!', className]} {...props} />
}

export const CalloutDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <div className={['text-muted-foreground prose-no-margin empty:hidden', className]} {...props} />
  )
}
