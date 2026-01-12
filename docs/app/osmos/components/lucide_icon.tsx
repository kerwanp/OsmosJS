import { ComponentProps } from '@osmosjs/osmos'
import { IconComponent } from '@osmosjs/osmosis'
import stringHelpers from '@adonisjs/core/helpers/string'

export const LucideIcon = ({ name }: ComponentProps<IconComponent>) => {
  const lucideName = stringHelpers.dashCase(name)
  return <i data-lucide={lucideName} className="size-4 text-sm" />
}
