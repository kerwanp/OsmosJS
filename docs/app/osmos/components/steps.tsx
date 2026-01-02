import { ComponentProps, OsmosNode } from '@osmosjs/osmos'

export const Steps = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={['border-l relative ml-4 pl-7', className]}
      style={{
        counterReset: 'step',
      }}
      {...props}
    />
  )
}

export const Step = ({ ...props }: ComponentProps<'div'>) => {
  return <div className="step" {...props} />
}
