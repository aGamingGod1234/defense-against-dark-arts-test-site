import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

const siteUrl = 'https://les-moines-test-site-preview.vercel.app/'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Les Moines',
  description: 'A fictional premium French bakery interaction and frontend design test.',
  url: siteUrl,
  isAccessibleForFree: true,
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Les Moines | Premium French bakery concept' },
      {
        name: 'description',
        content: 'Explore Les Moines, a fictional premium French bakery concept with an interactive pastry counter, craft dial and morning-box demo.',
      },
      { property: 'og:title', content: 'Les Moines | Le matin, parfaitement feuilleté' },
      {
        property: 'og:description',
        content: 'A cool cobalt French bakery concept shaped by laminated pastry, patient hands and precise interaction.',
      },
      { property: 'og:image', content: `${siteUrl}assets/hero-croissant.png` },
      { property: 'og:url', content: siteUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#18306E' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/assets/les-moines-monogram.png' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'canonical', href: siteUrl },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
