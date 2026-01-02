import { type HttpContext } from '@adonisjs/core/http'
import { createContext, PropsWithChildren } from '@osmosjs/osmos'
import { Adonis } from '../adonis.js'

export const AdonisContext = createContext<Adonis>()

export function AdonisProvider({ context, children }: PropsWithChildren<{ context: HttpContext }>) {
  const extension = new Adonis(context)
  return <AdonisContext.Provider value={extension}>{children}</AdonisContext.Provider>
}
