import type { Metadata } from 'next'
import Link from 'next/link'
import DetailPageHeader from '../components/DetailPageHeader'
import Footer from '../components/Footer'
import Services from '../components/Services'
import { openGraphImages, twitterImages } from '../shared-metadata'

const title = 'できること｜AIシステム開発・業務自動化・API連携｜AIC'
const description =
  '業務の自動化、AIを使ったツール、Google・LINE・SlackなどとつなぐAPI連携、仕事用Webアプリなど、鹿児島を拠点に活動するAICがお手伝いできることをご紹介します。医療・介護分野のご相談にも対応します。'

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
        {/* Kept out of #services so that section still holds only the three entrances. */}
        <section
          aria-labelledby="services-next-title"
          className="border-t border-white/[0.07] bg-[#0a0a0a] px-5 py-16 md:px-12 md:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <h2 id="services-next-title" className="text-xl font-semibold leading-[1.5] text-white md:text-2xl">
                実際に作ったものも、ご覧いただけます。
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-8 text-white/58 md:text-[15px]">
                鹿児島を拠点に、オンラインでもご相談を受けています。AI・業務自動化の制作実績や、看護師としての経験を活かした医療・介護分野での取り組みもあわせてご覧ください。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#works"
                className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/70 transition hover:border-white/32 hover:text-white sm:w-auto"
              >
                制作実績を見る
              </Link>
              <Link
                href="/healthcare"
                className="inline-flex min-h-12 w-full items-center justify-center border border-[#74cfc2]/30 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-[#9eddd4] transition hover:border-[#74cfc2]/60 hover:text-white sm:w-auto"
              >
                医療・介護について見る
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
