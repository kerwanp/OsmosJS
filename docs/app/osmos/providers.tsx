import { AdonisContext } from '@osmosjs/adonis'
import { PropsWithChildren } from '@osmosjs/osmos'
import { UnpolyProvider } from '@osmosjs/unpoly'

export const Providers = ({ children }: PropsWithChildren) => {
  const adonis = AdonisContext.getOrFail()
  return (
    <UnpolyProvider
      request={adonis.context.request.request}
      response={adonis.context.response.response}
    >
      {children}
    </UnpolyProvider>
  )
}
