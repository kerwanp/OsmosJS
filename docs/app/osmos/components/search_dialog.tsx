import { ComponentProps } from '@osmosjs/osmos'

export const SearchDialog = ({ ...props }: ComponentProps<'div'>) => {
  return <div id="docsearch" {...props} />
}
