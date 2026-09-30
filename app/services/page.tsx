import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Services from '../components/Services'
import { openGraphImages, twitterImages } from '../shared-metadata'

const title = 'できること｜AIC'
const description =
  '業務の自動化、AIを使ったツール、仕事用Webアプリなど、AICがお手伝いできることをご紹介します。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/services',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

export default function ServicesPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="できること詳細"
          title="困りごとから、必要な仕組みを考えます。"
          description="トップでは省いた「お困りごとから探す」と、お渡しできるものの一覧をこちらでご覧いただけます。"
        />
        <Services />
      </main>
      <Footer />
    </>
  )
}
