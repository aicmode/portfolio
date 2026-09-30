import type { Metadata } from 'next'
import Contact from '../components/Contact'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Process from '../components/Process'
import { openGraphImages, twitterImages } from '../shared-metadata'

const title = 'お問い合わせ｜AIC'
const description =
  'ご相談から公開までの流れ、ご相談例、最初のご連絡でお伝えいただきたいことをご案内します。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/contact',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="お問い合わせ詳細"
          title="決まっていないことも、一緒に整理します。"
          description="よくあるご相談例と、最初のメッセージで分かる範囲だけ教えていただきたい内容をまとめています。"
        />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
