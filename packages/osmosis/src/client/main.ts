import 'unpoly'
import Alpine from 'alpinejs'
import docsearch from '@docsearch/js'
import type { DocSearchProps } from '@docsearch/js'

declare global {
  var up: any
  var Alpine: any
}

export interface OsmosisClientOptions {
  docsearch?: Omit<DocSearchProps, 'container'>
}

window.Alpine = Alpine

const Osmosis = {
  start(options: OsmosisClientOptions) {
    Alpine.start()

    up.link.config.followSelectors.push('a[href]')

    if (options.docsearch) {
      up.compiler('#docsearch', () => {
        // @ts-expect-error
        docsearch({
          container: '#docsearch',
          ...options.docsearch,
        })
      })
    }

    up.compiler('#toc', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          const thumb = document.querySelector<HTMLDivElement>('#toc-thumb')
          const links = document.querySelectorAll('#toc a')

          const ids = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target.id)

          if (ids.length === 0) return

          links.forEach((link) => {
            const targetId = link.getAttribute('href')?.slice(1)
            if (!targetId) return
            if (ids.includes(targetId)) {
              link.setAttribute('data-active', 'true')
            } else {
              link.removeAttribute('data-active')
            }
          })

          if (thumb) {
            const index = [...links.values()].findIndex((link) => {
              const targetId = link.getAttribute('href')?.slice(1)
              if (!targetId) return
              return ids.includes(targetId)
            })

            thumb.style.setProperty('--thumb-height', `${ids.length * 32}px`)
            thumb.style.setProperty('--thumb-top', `${index * 32}px`)
          }
        },
        { rootMargin: '0px', threshold: 0.98 }
      )

      document.querySelectorAll('article [id]').forEach((s) => observer.observe(s))
    })
  },
}

export default Osmosis
