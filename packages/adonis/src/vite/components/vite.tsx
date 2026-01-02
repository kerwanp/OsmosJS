import { AdonisContext } from '../../components/provider.jsx'

export interface ViteProps extends Record<string, any> {
  entrypoints: string[] | string
}

export async function Vite({ entrypoints, ...props }: ViteProps) {
  const adonis = AdonisContext.getOrFail()
  const vite = await adonis.resolve('vite')
  const elements = await vite.generateEntryPointsTags(entrypoints, props)

  return elements.map((element) => {
    const Tag = element.tag
    return <Tag {...element.attributes} />
  })
}
