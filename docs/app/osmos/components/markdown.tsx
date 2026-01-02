import { ComponentProps } from '@osmosjs/osmos'
import { CodeBlock } from './code_block.tsx'
import { Callout } from './callout.tsx'
import { ConfigurationSteps } from './configuration_steps.tsx'
import { Tab, Tabs, TabsList, TabsListTrigger } from './tabs.tsx'

const Heading = ({
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
    <Comp id={id} className={['flex scroll-m-28 flex-row items-center gap-2', className]}>
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

export const MARKDOWN_COMPONENTS = {
  h2: (props: ComponentProps<'h2'>) => <Heading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <Heading as="h3" {...props} />,

  pre: CodeBlock,

  Callout,
  ConfigurationSteps,
  CodeBlockTabs: Tabs,
  CodeBlockTab: (props: ComponentProps<typeof Tab>) => <Tab className="py-0" {...props} />,
  CodeBlockTabsList: TabsList,
  CodeBlockTabsTrigger: TabsListTrigger,
  Tabs,
  Tab,
}
