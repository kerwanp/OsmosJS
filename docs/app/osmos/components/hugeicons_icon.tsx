import { ComponentProps } from '@osmosjs/osmos'
import { IconComponent } from '@osmosjs/osmosis'

export const HugeiconsIcon = ({ name }: ComponentProps<IconComponent>) => {
  return <i className={['size-4 text-sm', name]} />
}
