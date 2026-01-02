import { type HttpContext } from '@adonisjs/core/http'
import { type StandardSchemaV1 } from '@standard-schema/spec'

export type OsmosFormResult<Schema extends StandardSchemaV1> = {
  data: StandardSchemaV1.InferInput<Schema>
  errors: OsmosFormErrorsResult
}

export async function OsmosForm<Schema extends StandardSchemaV1>(
  ctx: HttpContext,
  schema: Schema
): Promise<OsmosFormResult<Schema>> {
  const payload = ctx.request.all()
  const result = await schema['~standard'].validate(payload)

  return {
    data: payload,
    errors: OsmosFormErrors(result.issues ?? []),
  }
}

export type OsmosFormErrorsResult = ReturnType<typeof OsmosFormErrors>

export function OsmosFormErrors(_issues: readonly StandardSchemaV1.Issue[]) {
  function has(_path: string) {}

  function get(_path: string) {}

  function message(_path: string) {}

  return { has, get, message }
}
