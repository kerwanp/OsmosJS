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
        <script src="https://cdn.jsdelivr.net/npm/unpoly@3.12.1/unpoly.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/unpoly@3.12.1/unpoly.min.css" />
        <link rel="stylesheet" href="https://use.hugeicons.com/font/icons.css" />
        <Vite entrypoints={['resources/css/app.css', 'resources/js/app.ts']} />
      </head>
      <body x-data className="relative bg-background text-foreground flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  )
}
