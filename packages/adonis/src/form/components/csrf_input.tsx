import { AdonisContext } from '../../components/provider.jsx'

export function CSRFInput() {
  const adonis = AdonisContext.getOrFail()
  return <input type="hidden" name="_csrf" value={adonis.context.request.csrfToken} />
}
