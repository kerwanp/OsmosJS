import { AdonisContext } from '@osmosjs/adonis'
import { PropsWithChildren } from '@osmosjs/osmos'
import { UnpolyProvider as BaseUnpolyProvider } from '@osmosjs/unpoly'

export const UnpolyProvider = ({ children }: PropsWithChildren) => {
  const adonis = AdonisContext.getOrFail()
  return (
    <BaseUnpolyProvider
      request={adonis.context.request.request}
      response={adonis.context.response.response}
    >
      {children}
    </BaseUnpolyProvider>
  )
}
