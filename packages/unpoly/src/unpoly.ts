import { type ServerResponse } from 'node:http'
import { type IncomingMessage } from 'node:http'
import { Fragments } from './fragments.js'
import { UnpolyContext } from './components/provider.jsx'

/**
 * TODO: _up_method
 */
export class Unpoly {
  static METHOD_COOKIE_NAME = '_up_method'

  static VERSION_HEADER = 'X-Up-Version'
  static TARGET_HEADER = 'X-Up-Target'
  static VARY_HEADER = 'Vary'

  fragments = new Fragments()

  constructor(
    public request: IncomingMessage,
    public response: ServerResponse
  ) {}

  /**
   * Returns if we are in an Unpoly request.
   */
  isSupported() {
    return Boolean(this.version() || this.target())
  }

  header(value: string) {
    return this.request.headers[value.toLowerCase()]
  }

  version() {
    return this.header(Unpoly.VERSION_HEADER) as string | undefined
  }

  target() {
    return this.header(Unpoly.TARGET_HEADER) as string | undefined
  }

  /**
   * Append a value to the `Vary` response header.
   */
  addVaryHeader(value: string) {
    this.response.appendHeader(Unpoly.VARY_HEADER, value)
  }

  static get() {
    return UnpolyContext.get()
  }

  static getOrFail() {
    return UnpolyContext.getOrFail()
  }
}
