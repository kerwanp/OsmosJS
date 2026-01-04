import { ComponentProps } from '@osmosjs/osmos'
import { CodeBlock } from './ui/code_block.jsx'
import { highlight } from '../../highlight/shiki.js'

export const DynamicCodeBlock = async ({
  code,
  lang,
  ...props
}: Omit<ComponentProps<typeof CodeBlock>, 'children'> & {
  code: string
}) => {
  const highlighted = await highlight(code, {
    lang: lang ?? 'text',
  })

  return <CodeBlock {...props}>{highlighted}</CodeBlock>
}
