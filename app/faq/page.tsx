import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import { faqs } from '../data/faqs'
import { openGraphImages, twitterImages } from '../shared-metadata'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

const title = 'よくある質問｜AIC'
const description =
  'AI・自動化・Webアプリ制作のご相談前によくいただく質問をまとめています。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/faq',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/faq#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <main id="main">
        <DetailPageHeader
          eyebrow="よくある質問"
          title="ご相談前の疑問にお答えします。"
          description="進め方、費用、安全面、公開後の対応など、よくいただく質問をまとめています。"
        />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
