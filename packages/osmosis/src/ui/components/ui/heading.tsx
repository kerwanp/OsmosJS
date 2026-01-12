import { ComponentProps } from '@osmosjs/osmos'

export const Heading = ({
  className,
  id,
  as,
  children,
  ...props
}: ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) => {
  const Comp = as ?? 'div'

  return (
    <Comp
      id={id}
      className={['flex scroll-m-28 flex-row items-center gap-2', className]}
      {...props}
    >
      <a href={`#${id}`} className="peer no-underline" up-follow>
        {children}
      </a>
      <i
        className={[
          'hgi hgi-stroke hgi-link-04',
          'text-md shrink-0 text-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100',
        ]}
      ></i>
    </Comp>
  )
}
