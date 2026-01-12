import { PropsWithChildren } from '@osmosjs/osmos'
import { Vite } from '@osmosjs/adonis/vite'

export default function RootLayout({
  children,
  title,
  description,
}: PropsWithChildren<{ title?: string; description?: string }>) {
  return (
    <html lang="en-us" className="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ?? `OsmosJS - The light-weight JSX runtime`}</title>
        <meta
          name="description"
          content={description ?? 'OsmosJS is a light-weight and server-side JSX runtime.'}
        />
        <Vite entrypoints={['resources/css/app.css', 'resources/js/app.ts']} />
      </head>
      <body x-data className="relative bg-background text-foreground flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  )
}
