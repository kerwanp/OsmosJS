import { createContext, PropsWithChildren } from '@osmosjs/osmos'
import { Unpoly } from '../unpoly.js'
import { IncomingMessage } from 'node:http'
import { ServerResponse } from 'node:http'

export const UnpolyContext = createContext<Unpoly>()

export function UnpolyProvider({
  request,
  response,
  children,
}: PropsWithChildren<{ request: IncomingMessage; response: ServerResponse }>) {
  const extension = new Unpoly(request, response)
  return <UnpolyContext.Provider value={extension}>{children}</UnpolyContext.Provider>
}
