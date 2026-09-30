import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import HealthcareAI from '../components/HealthcareAI'
import { healthcareWorks } from '../data/healthcareWorks'
import { openGraphImages, twitterImages } from '../shared-metadata'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

const title = '医療・介護の業務改善とAI活用｜看護師経験を活かしたシステム開発｜AIC'
const description =
  '看護師として約9年間働いた経験を活かし、記録・申し送り・情報共有など医療・介護現場の仕事を理解したうえで、AIやシステムによる業務改善を提案します。安全への考え方と、申し送りや看護記録を扱った制作物をご紹介します。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/healthcare' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/healthcare',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

/**
 * The page describes one service, offered by the Person the home page defines
 * (same `@id`), and the pieces it links to. Only what the page itself shows is
 * stated: no facility, client, or deployment, because there is none.
 */
const healthcareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/healthcare#webpage`,
  url: `${SITE_URL}/healthcare`,
  name: title,
  description,
  inLanguage: 'ja-JP',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'Service',
    '@id': `${SITE_URL}/healthcare#service`,
    name: '医療・介護分野の業務改善',
    serviceType: 'Healthcare and Long-term Care Workflow Improvement',
    description:
      '看護師として約9年間働いた経験を活かし、記録や申し送り、情報共有など医療・介護現場の業務を楽にする仕組みを、AIやシステムで提案・制作します。診断や治療の判断を行うものではありません。',
    provider: { '@id': `${SITE_URL}/#aicmode` },
    areaServed: 'JP',
  },
  mentions: healthcareWorks.map((work) => ({
    '@type': 'CreativeWork',
    name: work.title,
    description: work.plainSummary,
    url: `${SITE_URL}${work.detailPath}`,
    creator: { '@id': `${SITE_URL}/#aicmode` },
  })),
}

export default function HealthcarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthcareJsonLd).replace(/</g, '\\u003c') }}
      />
      <main id="main">
        <DetailPageHeader
          eyebrow="医療・介護の詳細"
          title="現場の流れと安全を理解したうえで作ります。"
          description="医療の言葉、個人情報、人による確認など、医療・介護分野で大切にしている考え方と、現場の仕事をもとに作ったツールをまとめています。"
        />
        <HealthcareAI />
      </main>
      <Footer />
    </>
  )
}
