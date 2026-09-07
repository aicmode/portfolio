import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimateIn from '../../components/AnimateIn'
import Footer from '../../components/Footer'
import { projects } from '../../data/projects'
import { PROJECT_TYPE_LABEL, STATUS_LABEL } from '../../types/project'

const PROJECT_ID = 'ai-construction-estimate'
const SITE_URL = 'https://aicmode-portfolio.vercel.app'
const PATH = '/works/ai-construction-estimate'

const project = projects.find((entry) => entry.id === PROJECT_ID)

const title = 'AI工事・リフォーム見積管理システム｜見積・原価・粗利を一元管理する業務システム — AIC'
const description =
  '顧客・工事案件・見積を一元管理し、明細から税抜／税込・原価・粗利益・粗利率を自動計算。AIとルールによる見積チェックと日本語の見積書PDF発行まで行える、建設・リフォーム業向けの見積管理システムです。登録不要で閲覧できる読み取り専用の公開デモを用意しています。'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}${PATH}`,
    siteName: 'AIC',
    locale: 'ja_JP',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

function SectionHeading({ no, ja, accent }: { no: string; ja: string; accent: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-white/[0.08] pb-4">
      <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.2em]" style={{ color: accent, opacity: 0.75 }}>
        {no}
      </span>
      <h2 className="text-[16px] font-semibold tracking-[0.1em] text-white/85 sm:text-[18px]">{ja}</h2>
    </div>
  )
}

function Bullets({ items, accent }: { items: readonly string[]; accent: string }) {
  return (
    <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-[13.5px] leading-7 text-white/60">
          <span
            aria-hidden="true"
            className="mt-[11px] h-[3px] w-[3px] flex-shrink-0"
            style={{ background: accent, opacity: 0.75 }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
    </svg>
  )
}

export default function AiConstructionEstimatePage() {
  if (!project) notFound()

  const { accent, detailSections, gallery, outcome, role, safety, statusNote } = project
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    headline: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    url: `${SITE_URL}${PATH}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'ja-JP',
    creator: { '@id': `${SITE_URL}/#aicmode` },
    keywords: project.stack.join(', '),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <main id="main" className="relative overflow-x-hidden bg-[#050506]">
        <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.11]" />

        <div className="relative mx-auto max-w-[1100px] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pb-36 md:pt-36">
          <AnimateIn>
            <Link
              href="/#works"
              className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.08em] text-white/50 transition-colors duration-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              制作実績にもどる
            </Link>

            <div className="mt-9 flex flex-wrap items-center gap-2">
              <span
                className="border px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em]"
                style={{ borderColor: `${accent}66`, background: `${accent}14`, color: accent }}
              >
                {project.category}
              </span>
              <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white/58">
                {PROJECT_TYPE_LABEL[project.projectType]}
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white/58">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.7)' }}
                />
                {STATUS_LABEL[project.status]}
              </span>
              <span className="border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-white/58">
                登録不要・読み取り専用の公開デモ
              </span>
            </div>

            <p className="mt-7 text-[13px] tracking-[0.14em]" style={{ color: accent, opacity: 0.85 }}>
              {project.subtitle}
            </p>
            <h1 className="mt-4 text-[clamp(1.7rem,5.2vw,3.4rem)] font-black leading-[1.14] tracking-[-0.02em] text-white">
              AI工事・リフォーム見積管理システム
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/72">{project.plainSummary}</p>
            <p className="mt-4 max-w-2xl text-[14px] leading-8 text-white/55">{project.summary}</p>

            {statusNote ? (
              <p className="mt-6 max-w-2xl border-l border-white/12 pl-5 text-[12.5px] leading-7 text-white/52">
                {statusNote}
              </p>
            ) : null}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 border border-white/16 px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/78 transition duration-500 hover:border-white/38 hover:text-white sm:w-auto"
                >
                  実際に見る
                  <span className="sr-only">（新しいタブで開きます）</span>
                  <ExternalArrow />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 border border-white/16 px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/78 transition duration-500 hover:border-white/38 hover:text-white sm:w-auto"
                >
                  GitHubで見る
                  <span className="sr-only">（新しいタブで開きます）</span>
                  <ExternalArrow />
                </a>
              ) : null}
              <Link
                href="/#contact"
                className="inline-flex w-full items-center justify-center border border-[rgba(212,175,55,0.4)] px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-[rgba(212,175,55,0.9)] transition duration-500 hover:border-[rgba(212,175,55,0.7)] hover:text-white sm:w-auto"
              >
                似たものを相談する
              </Link>
            </div>
          </AnimateIn>

          {gallery ? (
            <AnimateIn delay={80}>
              <section className="mt-20 md:mt-28">
                <SectionHeading no="01" ja="画面" accent={accent} />
                {project.galleryNote ? (
                  <p className="mt-6 max-w-2xl text-[13px] leading-7 text-white/55">{project.galleryNote}</p>
                ) : null}
                <ol className="mt-8 grid gap-y-10">
                  {gallery.map((shot, index) => (
                    <li key={shot.src}>
                      <div
                        className="relative w-full overflow-hidden rounded-[10px] border border-white/10 bg-black"
                        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1100px) 1020px, 92vw"
                          className="object-contain"
                          preload={index === 0}
                        />
                      </div>
                      <p className="mt-3.5 flex gap-2.5 text-[12px] leading-6 text-white/58">
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] leading-6"
                          style={{ color: accent, opacity: 0.75 }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {shot.caption}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </AnimateIn>
          ) : null}

          {project.overview ? (
            <AnimateIn delay={80}>
              <section className="mt-20 md:mt-28">
                <SectionHeading no="02" ja="概要" accent={accent} />
                <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{project.overview}</p>
              </section>
            </AnimateIn>
          ) : null}

          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="03" ja="課題" accent={accent} />
              <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{project.problem}</p>
            </section>
          </AnimateIn>

          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="04" ja="解決" accent={accent} />
              <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{project.solution}</p>
            </section>
          </AnimateIn>

          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="05" ja="特徴" accent={accent} />
              <Bullets items={project.features} accent={accent} />
            </section>
          </AnimateIn>

          {detailSections ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="06" ja="技術的ポイント" accent={accent} />
                <div className="mt-8 grid gap-x-10 gap-y-10 lg:grid-cols-2">
                  {detailSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-[13px] font-semibold tracking-[0.08em] text-white/78">{section.title}</h3>
                      {section.body ? (
                        <p className="mt-3.5 text-[13.5px] leading-8 text-white/55">{section.body}</p>
                      ) : null}
                      {section.items ? (
                        <ol className="mt-3.5 space-y-2.5">
                          {section.items.map((item, index) => (
                            <li key={item} className="flex gap-3.5 text-[13px] leading-7 text-white/55">
                              <span className="font-mono text-[10px]" style={{ color: accent }} aria-hidden="true">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            </AnimateIn>
          ) : null}

          {role ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="07" ja="担当した範囲" accent={accent} />
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {role.map((item) => (
                    <li
                      key={item}
                      className="border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-[12px] font-semibold tracking-[0.06em] text-white/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </AnimateIn>
          ) : null}

          <AnimateIn delay={80}>
            <section className="mt-16 md:mt-20">
              <SectionHeading no="08" ja="使った技術" accent={accent} />
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="border px-3.5 py-2.5 text-[12px] font-semibold tracking-[0.06em]"
                    style={{ borderColor: `${accent}3d`, background: `${accent}0f`, color: accent }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </AnimateIn>

          {outcome ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="09" ja="確認できたこと" accent={accent} />
                <Bullets items={outcome} accent={accent} />
              </section>
            </AnimateIn>
          ) : null}

          {safety ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="10" ja="ご注意ください" accent={accent} />
                <div className="mt-6 border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.04)] p-6 sm:p-8">
                  <p className="text-[14px] font-semibold tracking-[0.1em] text-[rgba(212,175,55,0.85)]">
                    公開しているデモについて
                  </p>
                  <p className="mt-4 text-[13.5px] leading-8 text-white/64">{safety}</p>
                </div>
              </section>
            </AnimateIn>
          ) : null}

          <AnimateIn delay={80}>
            <div className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-8 md:mt-28 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-[11.5px] leading-6 tracking-[0.04em] text-white/55">
                自分で企画・制作した業務システムです。公開しているのは登録不要で閲覧できる読み取り専用のデモ環境で、掲載データはすべて架空です。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 border border-white/14 px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
                  >
                    実際に見る
                    <span className="sr-only">（新しいタブで開きます）</span>
                    <ExternalArrow />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 border border-white/14 px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
                  >
                    GitHubで見る
                    <span className="sr-only">（新しいタブで開きます）</span>
                    <ExternalArrow />
                  </a>
                ) : null}
                <Link
                  href="/#works"
                  className="inline-flex w-full items-center justify-center border border-white/14 px-6 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white sm:w-auto"
                >
                  制作実績にもどる
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
