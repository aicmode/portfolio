import type { Metadata } from 'next'
import About from '../components/About'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Skills from '../components/Skills'
import Trust from '../components/Trust'
import { openGraphImages, twitterImages } from '../shared-metadata'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

const title = 'KAITOの自己紹介・スキル｜看護師経験を活かしたAIシステム開発｜AIC'
const description =
  'AICのKAITOは、鹿児島を拠点にAIシステム開発・業務自動化・API連携を行っています。看護師として約9年間働いた経験、得意なこと、制作で大切にしていること、技術・スキルをご紹介します。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

/**
 * This page is the profile of one person, so it is a ProfilePage. The Person
 * reuses the home page's `@id`, so both pages describe the same entity; only
 * what this site already states about them is repeated here.
 */
const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/about#profile`,
  url: `${SITE_URL}/about`,
  name: title,
  description,
  inLanguage: 'ja-JP',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#aicmode`,
    name: 'AIC',
    alternateName: 'KAITO',
    url: SITE_URL,
    jobTitle: ['AI Engineer', 'Automation Developer'],
    sameAs: ['https://github.com/aicmode'],
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, '\\u003c') }}
      />
      <main id="main">
        <DetailPageHeader
          eyebrow="自己紹介・スキル"
          title="現場で使い続けられるものを作ります。"
          description="AICのKAITOです。看護師として約9年間働いた経験、得意なこと、制作で大切にしていること、これまで使ってきた技術をまとめています。"
        />
        <About />
        <Trust />
        <Skills />
      </main>
      <Footer />
    </>
  )
}
