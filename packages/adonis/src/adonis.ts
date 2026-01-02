import { type HttpContext } from '@adonisjs/core/http'
import {
  type GetRoutesForMethod,
  type LookupList,
  type RouteBuilderArguments,
  type RoutesList,
  type URLOptions,
} from '@adonisjs/core/types/http'
import { type ResolvedContainerBindings } from './types.js'
import { type ContainerBindings } from '@adonisjs/core/types'
import { type ContainerResolver } from '@adonisjs/core/container'
import { type StandardSchemaV1 } from '@standard-schema/spec'
import { OsmosForm, type OsmosFormOptions } from './form/form.js'
import { AdonisContext } from './components/provider.jsx'

/**
 * Class used for providing context to Osmos components.
 * Allowing them to access the current HttpContext.
 */
export class Adonis {
  context: HttpContext

  constructor(context: HttpContext) {
    this.context = context
  }

  /**
   * Redirects to a route.
   * Shortcut for `this.ctx.response.redirect().toRoute()`
   *
   * @example
   * this.redirect('home')
   */
  redirect<Identifier extends keyof GetRoutesForMethod<RoutesList, 'GET'> & string>(
    ...args: RoutesList extends LookupList
      ? RouteBuilderArguments<Identifier, RoutesList['GET'][Identifier], URLOptions>
      : []
  ): void {
    return this.context.response.redirect().toRoute(...args)
  }

  /**
   * Resolves services from request container.
   *
   * @example
   * const [encryption] = await this.resolve('encryption')
   * const [stripe, encryption] = await this.resolve(StripeService, 'encryption')
   */
  async resolve<Binding extends keyof ContainerBindings>(
    binding: Binding
  ): Promise<ContainerBindings[Binding]>
  async resolve<Bindings extends (keyof ContainerBindings)[]>(
    bindings: Bindings
  ): Promise<ResolvedContainerBindings<Bindings>>
  async resolve<Bindings extends keyof ContainerBindings>(
    bindings: Bindings | Bindings[]
  ): Promise<ContainerBindings[Bindings][] | ContainerBindings[Bindings]> {
    const resolver = this.context.containerResolver as ContainerResolver<ContainerBindings>

    if (Array.isArray(bindings)) {
      const services = await Promise.all(bindings.map((binding) => resolver.make(binding)))
      return services as any
    }

    return resolver.make(bindings) as any
  }

  async form<Schema extends StandardSchemaV1>(
    schema: Schema,
    options?: OsmosFormOptions
  ): Promise<OsmosForm<Schema>> {
    const form = new OsmosForm(schema, options)
    await form.handleRequest(this.context)
    return form
  }

  /**
   * Retrieves the Adonis extension from the context.
   * Throws an error if the context is not provided.
   */
  static get() {
    return AdonisContext.getOrFail()
  }
}
