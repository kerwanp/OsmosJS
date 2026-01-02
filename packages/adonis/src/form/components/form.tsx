import '@adonisjs/shield/shield_provider'

import { StandardSchemaV1 } from '@standard-schema/spec'
import { OsmosForm } from '../form.js'
import { CSRFInput } from './csrf_input.jsx'
import { ComponentProps, Osmos } from '@osmosjs/osmos'

export interface FormProps<Schema extends StandardSchemaV1 = any> extends ComponentProps<'form'> {
  form: OsmosForm<Schema>
}

export function Form(this: Osmos, { form, children, ...props }: FormProps) {
  return (
    <form method={form.options.method} {...props}>
      <CSRFInput />
      {children}
    </form>
  )
}
