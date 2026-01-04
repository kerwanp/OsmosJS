import Alpine from 'alpinejs'
import docsearch from '@docsearch/js'

declare global {
  var up: any
  var Alpine: any
}

up.link.config.followSelectors.push('a[href]')

window.Alpine = Alpine

Alpine.start()

up.compiler('#docsearch', () => {
  // @ts-expect-error
  docsearch({
    container: '#docsearch',
    appId: '6RHBSCEI3Q',
    indexName: 'OsmosJS',
    apiKey: '399d9d1e7e6248800752e80c9e19cb46',
  })
})

up.compiler('#toc', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      const thumb = document.querySelector<HTMLDivElement>('#toc-thumb')
      const links = document.querySelectorAll('#toc a')

      const ids = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id)

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
