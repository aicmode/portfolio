import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import HealthcareAI from '../components/HealthcareAI'
import { openGraphImages, twitterImages } from '../shared-metadata'

const title = '医療・介護｜AIC'
const description =
  '看護師として約9年間働いた経験を活かした、医療・介護分野の業務改善と安全への考え方をご紹介します。'

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

export default function HealthcarePage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="医療・介護の詳細"
          title="現場の流れと安全を理解したうえで作ります。"
          description="医療の言葉、個人情報、人による確認など、医療・介護分野で大切にしている考え方をまとめています。"
        />
        <HealthcareAI />
      </main>
      <Footer />
    </>
  )
}
