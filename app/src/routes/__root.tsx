import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

const siteUrl = 'https://defense-against-dark-arts.vercel.app/'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Defense Against the Dark Arts',
  description: 'An original fictional dark-fantasy action game and interactive website concept.',
  url: siteUrl,
  applicationCategory: 'Game',
  isAccessibleForFree: true,
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'Defense Against the Dark Arts | Original game concept' },
      {
        name: 'description',
        content: 'Enter Vesper Collegium, study three defensive disciplines, and confront the shapes hidden inside the Black Archive.',
      },
      { property: 'og:title', content: 'Defense Against the Dark Arts' },
      {
        property: 'og:description',
        content: 'Read the curse. Break its shape. Guard the last light.',
      },
      { property: 'og:image', content: `${siteUrl}assets/hero.webp` },
      { property: 'og:url', content: siteUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#070A09' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/assets/favicon.png' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'canonical', href: siteUrl },
      { rel: 'preload', as: 'image', href: '/assets/hero.webp', fetchPriority: 'high' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
