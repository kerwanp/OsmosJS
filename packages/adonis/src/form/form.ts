import { RuntimeException } from '@adonisjs/core/exceptions'
import { type HttpContext } from '@adonisjs/core/http'
import { type StandardSchemaV1 } from '@standard-schema/spec'
import { type Get, type Paths } from 'type-fest'
import get from 'lodash.get'
import { type ComponentProps } from '@osmosjs/osmos'

export interface OsmosFormOptions {
  method?: 'GET' | 'POST'
}

export class OsmosForm<Schema extends StandardSchemaV1> {
  isSubmitted = false
  isValid = false

  data?: StandardSchemaV1.InferOutput<Schema>
  raw?: StandardSchemaV1.InferInput<Schema>

  errors?: readonly any[]

  schema: Schema
  options: OsmosFormOptions

  constructor(schema: Schema, options: OsmosFormOptions = { method: 'POST' }) {
    this.schema = schema
    this.options = options
  }

  get parsed() {
    if (!this.isValid || !this.data) {
      throw new RuntimeException(`Tried to retrieve "parsed" value on an invalid form`)
    }

    return this.data
  }

  value<Path extends Paths<StandardSchemaV1.InferInput<Schema>>>(
    path: Paths<StandardSchemaV1.InferInput<Schema>>
  ): Get<StandardSchemaV1.InferInput<Schema>, Path extends string ? Path : string> {
    return get(this.raw, path)
  }

  /**
   * Returns common HTML input attributes.
   *
   * @example
   *
   * <input {...form.field('fullName')} />
   */
  field(path: Paths<StandardSchemaV1.InferInput<Schema>>): ComponentProps<'input'> {
    const value = this.value(path)
    return {
      value: value === null ? '' : (value as any),
      name: path as string,
    }
  }

  async validate(payload: StandardSchemaV1.InferInput<Schema>) {
    this.raw = payload
    const result = await this.schema['~standard'].validate(payload)

    if (result.issues) {
      this.isValid = false
      this.errors = result.issues
    } else {
      this.isValid = true
      this.data = result.value
    }

    return result
  }

  async handleRequest(ctx: HttpContext) {
    if (ctx.request.method() !== this.options.method) {
      return
    }

    this.isSubmitted = true
    const payload = ctx.request.all()
    await this.validate(payload)
  }
}
