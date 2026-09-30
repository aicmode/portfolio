import type { Metadata } from 'next'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import WorksArchive from '../components/WorksArchive'
import { webProjectCount } from '../data/projects'
import { openGraphImages, twitterImages } from '../shared-metadata'

const title = 'Web制作実績｜AIC'
// Counted from the data, so the copy can never fall behind the gallery.
const description =
  `これまでに制作したホームページ・1ページの紹介サイト・ネットショップなど、Web制作実績${webProjectCount}件をご覧いただけます。`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/works' },
  // Declared per page: metadata merges shallowly, so a page without its own
  // openGraph / twitter would share the home page's title and og:url.
  openGraph: {
    type: 'website',
    url: '/works',
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
    ...openGraphImages,
  },
  twitter: { card: 'summary_large_image', title, description, ...twitterImages },
}

/**
 * The Web production gallery.
 *
 * AI・業務自動化 is the top page's job — this page exists so the web work has
 * somewhere to be read on its own terms, without a visitor having to filter
 * past a domain they did not come for.
 */
export default function WorksPage() {
  return (
    <>
      <main id="main">
        <DetailPageHeader
          eyebrow="Web制作実績"
          title="作ったWebサイトを、すべてご覧いただけます。"
          description="これまでに制作したホームページ・1ページの紹介サイト・ネットショップなどを掲載しています。AI・業務自動化の制作実績は、トップページの「実際に作ったもの」からご覧いただけます。"
        />
        <WorksArchive defaultExpanded />
      </main>
      <Footer />
    </>
  )
}
