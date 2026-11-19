import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from './AnimateIn'
import WorksDisclosure from './WorksDisclosure'
import { caseStudies } from '../data/caseStudies'
import { LIVE_LINK_PAUSED, aiProjects, projects, webProjectCount } from '../data/projects'
import {
  CATEGORY_LABEL,
  PROJECT_TYPE_LABEL,
  STATUS_LABEL,
  type CaseStudy,
  type Project,
  type ProjectStatus,
  type ProjectType,
} from '../types/project'

const nurseFukugyoLab = projects.find((project) => project.id === 'nurse-fukugyo-lab')!

type FeaturedWork = {
  id: string
  title: string
  label: string
  description: string
  accent: string
  projectType: ProjectType | 'Client Work'
  status: ProjectStatus | 'delivered'
  scope?: readonly string[]
  image?: string
  imageAlt?: string
  liveUrl?: string
  githubUrl?: string
  /** Route of the work's own page on this site, when it has one. */
  detailPath?: string
  /** `YYYY-MM-DD` the piece was added. Sorts this section, newest first. */
  addedOn?: string
  /** An illustration shown inside the card body (client work with no screenshot). */
  figure?: { src: string; alt: string; width: number; height: number; caption: string }
}

/**
 * Card copy written for one specific piece, where the product name or a
 * sharper one-line read is worth having. Anything absent falls back to the
 * work's own title, category label and plain summary, so a newly added piece
 * is never blank — it just reads in the site's default voice until someone
 * writes it a line here.
 */
const AI_CARD_COPY: Record<string, { title?: string; label?: string; description?: string }> = {
  'ai-food-inventory-manager': {
    label: '食品・小売 × AI × 在庫・発注支援',
  },
  'enterprise-rag-knowledge-ai': {
    label: 'RAG × AI × 業務支援',
  },
  'ai-construction-estimate': {
    label: '建設・リフォーム × AI × 業務支援',
  },
  'medibrief-ai': {
    title: 'MediBrief',
    label: '医療 × AI',
    description: '話したいことを、診察で伝えやすいメモに自動で整理します。',
  },
  'ai-line-inquiry-assistant': {
    label: 'LINE × 業務自動化',
  },
  'ai-real-estate-matcher': {
    label: '不動産 × AI × 業務支援',
  },
  'medichart-lite': {
    label: '医療向けWebアプリ',
    description: '患者さんの情報や記録を、一つの画面で確認しやすくします。',
  },
  'handover-maker': {
    label: '介護・医療 × 業務効率化',
    description: '申し送り、記録、予定、検索、印刷を一つにまとめた完全オフライン対応ツールです。',
  },
  'meta-ad-library-monitor': {
    label: '広告リサーチ × 自動化',
    description: '登録した広告主の広告をまとめて取得し、前回から増えた分だけを見つけ出します。',
  },
}

function fromProject(project: Project): FeaturedWork {
  const copy = AI_CARD_COPY[project.id]
  return {
    id: project.id,
    title: copy?.title ?? project.title,
    label: copy?.label ?? CATEGORY_LABEL[project.group],
    description: copy?.description ?? project.plainSummary,
    image: project.image,
    imageAlt: project.imageAlt,
    accent: project.accent,
    projectType: project.projectType,
    status: project.status,
    liveUrl: LIVE_LINK_PAUSED.has(project.id) ? undefined : project.liveUrl,
    githubUrl: project.githubUrl,
    detailPath: project.detailPath,
    addedOn: project.addedOn,
  }
}

function fromCaseStudy(study: CaseStudy): FeaturedWork {
  const copy = AI_CARD_COPY[study.id]
  return {
    id: study.id,
    title: copy?.title ?? study.title,
    label: copy?.label ?? CATEGORY_LABEL[study.group],
    description: copy?.description ?? study.plainSummary,
    image: study.screenshot,
    imageAlt: study.screenshotAlt,
    accent: study.accent,
    projectType: study.projectType,
    status: study.status,
    liveUrl: study.liveUrl,
    githubUrl: study.githubUrl,
    detailPath: study.detailPath,
    addedOn: study.addedOn,
  }
}

/**
 * MAIN: every AI / automation piece the portfolio holds, from both data files,
 * newest first.
 *
 * What this studio is, in the order it should be read: AI and automation first
 * and at length, web production second and briefly. The two groups are the
 * whole of that hierarchy — nothing here is colour-coded or restyled to make
 * the point, the heading order and the group sizes make it.
 *
 * A case study and a project can describe the same build, so the id decides:
 * the case study is the fuller record and wins, and the project entry for it is
 * dropped rather than shown twice.
 *
 * The sort is the whole of the curation: `addedOn` descending, with no lead
 * list to keep by hand and nothing pinned to the front, so the newest piece is
 * always the first card, top-left. Adding a new AI tool, automation, agent or
 * API integration means adding it to `projects.ts` (or `caseStudies.ts`) with
 * an AI-domain `group` and today's `addedOn` — it then opens this section on
 * its own, and every older piece keeps its place with no edit here. A piece
 * with no date sorts after the dated ones rather than jumping the queue.
 */
const aiWorks: readonly FeaturedWork[] = (() => {
  const caseStudyIds = new Set(caseStudies.map((study) => study.id))
  const all = [
    ...caseStudies.map(fromCaseStudy),
    ...aiProjects.filter((project) => !caseStudyIds.has(project.id)).map(fromProject),
  ]

  return all.slice().sort((a, b) => (b.addedOn ?? '').localeCompare(a.addedOn ?? ''))
})()

/**
 * SUB — web production: a second skill, shown so a visitor knows it is
 * available, not a second headline act. The top page keeps one representative
 * piece and sends the rest to `/works`, which is the web gallery in full.
 */
const webWorks: readonly FeaturedWork[] = [
  {
    id: nurseFukugyoLab.id,
    title: nurseFukugyoLab.title,
    label: '看護師向けWebメディア',
    description: nurseFukugyoLab.plainSummary,
    image: nurseFukugyoLab.image,
    imageAlt: nurseFukugyoLab.imageAlt,
    accent: nurseFukugyoLab.accent,
    projectType: nurseFukugyoLab.projectType,
    status: nurseFukugyoLab.status,
    liveUrl: nurseFukugyoLab.liveUrl,
    githubUrl: nurseFukugyoLab.githubUrl,
  },
] as const

/**
 * CLIENT WORK — paid, delivered pieces. A new one is added to this list and
 * the group, the summary count and the folded total all follow from it.
 */
const clientWorks: readonly FeaturedWork[] = [
  {
    id: 'spreadsheet-automation',
    title: 'Googleスプレッドシート連携 業務自動化ツール',
    label: '業務自動化 × Google Spreadsheet',
    description: 'Googleスプレッドシートを活用した業務自動化ツールを設計・開発。要件整理から自動送信フローの構築、設計資料作成まで対応し、実際の業務で利用するツールとして納品しました。',
    accent: '#d4af37',
    projectType: 'Client Work',
    status: 'delivered',
    scope: ['要件整理', '業務フロー設計', 'Googleスプレッドシート連携', '自動送信フロー構築', '設計資料作成', '納品'],
    figure: {
      src: '/works/images/spreadsheet-automation-client-work.webp',
      alt: 'Googleスプレッドシート連携業務自動化ツールのイメージ。表形式データから自動処理、送信完了へ進む架空UI',
      width: 1536,
      height: 864,
      caption: 'CONCEPT IMAGE · 制作した仕組みを表現した架空のイメージです。',
    },
  },
]

/** One featured card. Identical treatment in every group: the hierarchy is
    carried by the headings and the order, never by the card design. Every
    group sits under its own h3, so every card title is an h4. */
function WorkCard({ work, delay }: { work: FeaturedWork; delay: number }) {
  const isClientWork = work.projectType === 'Client Work'
  return (
    <AnimateIn delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden border border-white/[0.09] bg-white/[0.018]">
        {work.image ? (
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08] bg-[#080808]">
            <Image
              src={work.image}
              alt={work.imageAlt ?? `${work.title}の画面`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
            />
          </div>
        ) : isClientWork ? null : (
          /* No capture exists for this one. The frame keeps the grid even and
             names the work rather than standing in for a screenshot it does
             not have. */
          <div
            className="flex aspect-[16/10] items-center justify-center border-b border-white/[0.08] px-7"
            style={{ background: `radial-gradient(circle at 50% 20%, ${work.accent}22, transparent 65%), #070707` }}
            aria-hidden="true"
          >
            <span
              className="border px-4 py-3 text-center text-[11px] font-semibold tracking-[0.08em]"
              style={{ borderColor: `${work.accent}55`, color: work.accent }}
            >
              {work.title}
            </span>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col p-6">
          <p className="text-[10px] font-semibold tracking-[0.14em]" style={{ color: work.accent }}>
            {work.label}
          </p>
          <h4 className="mt-3 text-xl font-semibold leading-7 text-white">{work.title}</h4>
          <p className="mt-4 text-[14px] leading-7 text-white/60">{work.description}</p>
          <p className="mt-4 text-[10px] leading-5 tracking-[0.08em] text-white/38">
            {work.projectType === 'Client Work' ? 'Client Work ・ 有償案件' : PROJECT_TYPE_LABEL[work.projectType]} ・ {work.status === 'delivered' ? '納品済み' : STATUS_LABEL[work.status]}
          </p>
          {work.figure ? (
            <figure className="mt-6 min-w-0">
              <div className="overflow-hidden border border-white/[0.08] bg-[#080808]">
                <Image
                  src={work.figure.src}
                  alt={work.figure.alt}
                  width={work.figure.width}
                  height={work.figure.height}
                  sizes="(min-width: 1376px) 1232px, (min-width: 768px) calc(100vw - 144px), calc(100vw - 88px)"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-[10px] leading-5 tracking-[0.08em] text-white/40">
                {work.figure.caption}
              </figcaption>
            </figure>
          ) : null}
          {work.scope ? (
            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-white/60">対応内容</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[12px] leading-6 text-white/55">
                {work.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
          <div className={isClientWork ? 'hidden' : 'mt-auto flex flex-wrap gap-2 pt-6'}>
            {/* A work with no reachable deployment still has somewhere
                to send a visitor when it has its own page: the page,
                in this tab. Nothing here ever stands in for a demo
                that does not exist. */}
            {work.detailPath ? (
              <Link
                href={work.detailPath}
                className="inline-flex min-h-11 items-center justify-center border border-white/16 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/76 transition hover:border-white/35 hover:text-white"
              >
                詳細を見る
              </Link>
            ) : null}
            {work.liveUrl ? (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-white/16 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/76 transition hover:border-white/35 hover:text-white"
              >
                実際に見る<span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
            {work.githubUrl ? (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-white/10 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/50 transition hover:border-white/28 hover:text-white"
              >
                GitHubで見る<span className="sr-only">（新しいタブで開きます）</span>
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </AnimateIn>
  )
}

/**
 * A group heading. `rank` is the only thing that separates the groups, and it
 * changes one small label — no second palette, no second card style. Client
 * work, the paid and delivered piece, reads at MAIN weight.
 */
function GroupHeading({
  rank,
  title,
  description,
}: {
  rank: 'CLIENT WORK' | 'MAIN' | 'SUB'
  title: string
  description: string
}) {
  const isMain = rank !== 'SUB'
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`px-2 py-1 font-mono text-[9px] tracking-[0.24em] ${
            isMain
              ? 'border border-[rgba(212,175,55,0.38)] text-[rgba(232,204,113,0.88)]'
              : 'border border-white/12 text-white/42'
          }`}
        >
          {rank}
        </span>
        <h3
          className={`font-bold tracking-[-0.015em] text-white ${
            isMain ? 'text-[clamp(1.35rem,3vw,2rem)]' : 'text-[clamp(1.15rem,2.4vw,1.55rem)]'
          }`}
        >
          {title}
        </h3>
      </div>
      <p className="max-w-lg text-[13px] leading-6 text-white/55 md:text-right">{description}</p>
    </div>
  )
}

/** How many cards the folded list holds, from the same arrays it renders. */
const totalWorkCount = clientWorks.length + aiWorks.length + webWorks.length

/** Anchors of the groups inside the folded list. */
const CLIENT_WORK_ID = 'client-work'
const AI_WORKS_ID = 'ai-works'

/**
 * What the folded section says before it is opened: what exists, and how much
 * — and each one is a way in. The in-page anchors are opened and scrolled to by
 * `WorksDisclosure`; the web count goes to the full gallery at `/works`.
 */
const workSummary = [
  {
    label: '受託実績',
    count: clientWorks.length,
    href: `#${CLIENT_WORK_ID}`,
    destination: '作品一覧の受託実績へ移動',
  },
  {
    label: 'AI・業務自動化',
    count: aiWorks.length,
    href: `#${AI_WORKS_ID}`,
    destination: '作品一覧のAI・業務自動化へ移動',
  },
  {
    label: 'Web制作',
    count: webProjectCount,
    href: '/works#archive',
    destination: 'Web制作実績ページを開く',
  },
] as const

/**
 * The top page's works, folded.
 *
 * Closed, the section is a heading, one line, the counts and two ways on: the
 * button that opens the full list here, and the web gallery at `/works`.
 * Opened, it is the same list as before — the client work first, then every
 * AI / automation piece newest first, then the web group — rendered from the
 * same data in the same order, so nothing is dropped by folding it.
 */
export default function FeaturedWorks() {
  return (
    <section id="works" aria-labelledby="works-heading" className="relative scroll-mt-20 overflow-hidden bg-[#010101] px-5 py-14 md:px-12 md:py-20">
      <div className="editorial-page-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="mb-3 text-[12px] tracking-[0.24em] text-zinc-400">制作実績</p>
              <h2 id="works-heading" className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-[1.25] tracking-[-0.025em] text-white">
                実際に作ったもの
              </h2>
            </div>
            <p className="max-w-lg text-[14px] leading-7 text-white/58 md:text-right">
              AI・業務自動化を中心に開発しています。Web制作にも対応しています。
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {workSummary.map((item) => {
              const isPage = item.href.startsWith('/')
              /* One link per card, stretched over the whole card so all of it
                 is the tap target, while the dt/dd pairing stays valid. */
              const linkClassName = 'absolute inset-0'
              const linkLabel = (
                <span className="sr-only">
                  {item.label} {item.count}件 — {item.destination}
                </span>
              )
              return (
                <div
                  key={item.label}
                  className="group/summary relative flex flex-col-reverse justify-end gap-1 border border-white/[0.08] bg-white/[0.018] px-3 py-3.5 transition-colors duration-300 hover:border-[rgba(212,175,55,0.38)] hover:bg-[rgba(212,175,55,0.045)] has-[a:focus-visible]:border-[rgba(212,175,55,0.38)] motion-reduce:transition-none sm:px-5 sm:py-4"
                >
                  <dt className="break-keep text-[11px] leading-5 tracking-[0.06em] text-white/55 transition-colors duration-300 group-hover/summary:text-white/75 motion-reduce:transition-none sm:text-[12px]">{item.label}</dt>
                  <dd className="text-[1.5rem] font-bold leading-none tracking-[-0.02em] text-white sm:text-[1.9rem]">
                    {item.count}
                    <span className="ml-1 text-[12px] font-medium tracking-normal text-white/50">件</span>
                    {isPage ? (
                      <Link href={item.href} className={linkClassName}>{linkLabel}</Link>
                    ) : (
                      <a href={item.href} className={linkClassName}>{linkLabel}</a>
                    )}
                  </dd>
                  {/* Down for a group further down this page, across for another page. */}
                  <svg
                    className={`pointer-events-none absolute right-2 top-2 h-3 w-3 text-white/25 transition-colors duration-300 group-hover/summary:text-[rgba(232,204,113,0.9)] motion-reduce:transition-none sm:right-3 sm:top-3 ${isPage ? '-rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )
            })}
          </dl>
        </AnimateIn>

        <AnimateIn delay={160}>
          <div className="mt-6">
            <WorksDisclosure
              count={totalWorkCount}
              aside={
                <Link
                  href="/works#archive"
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-[12px] tracking-[0.06em] text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-white"
                >
                  Web制作実績ページへ
                </Link>
              }
            >
              {/* CLIENT WORK. The one paid, delivered piece, read first. */}
              <div id={CLIENT_WORK_ID} tabIndex={-1} className="scroll-mt-24 pt-10 outline-none">
                <GroupHeading
                  rank="CLIENT WORK"
                  title="受託実績"
                  description="実際にご依頼いただき、設計・開発・納品まで対応した案件です。"
                />
                <div className="mt-7 grid grid-cols-1 gap-4">
                  {clientWorks.map((work, index) => (
                    <WorkCard key={work.id} work={work} delay={index * 80} />
                  ))}
                </div>
              </div>

              {/* MAIN. The larger group, because that is what this portfolio is for. */}
              <div id={AI_WORKS_ID} tabIndex={-1} className="mt-14 scroll-mt-24 border-t border-white/[0.07] pt-10 outline-none md:mt-16 md:pt-12">
                <GroupHeading
                  rank="MAIN"
                  title="AI・業務自動化"
                  description="AI・業務自動化を中心に、実際に設計・開発した制作実績です。"
                />
                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {aiWorks.map((work, index) => (
                    <WorkCard key={work.id} work={work} delay={(index % 3) * 80} />
                  ))}
                </div>
              </div>

              {/* SUB. Separated by space and by its own heading, not by a different
                  look — same cards, read second. */}
              <div className="mt-14 border-t border-white/[0.07] pt-10 md:mt-16 md:pt-12">
                <GroupHeading
                  rank="SUB"
                  title="Web制作"
                  description="Webサイト・LP・情報発信サイトなどの制作にも対応しています。"
                />
                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {webWorks.map((work, index) => (
                    <WorkCard key={work.id} work={work} delay={index * 80} />
                  ))}
                  {/* Keeps the row from reading as a half-empty shelf, and says where
                      the remaining web work actually is instead of listing it here. */}
                  <AnimateIn className="lg:col-span-2" delay={webWorks.length * 80}>
                    <div className="flex h-full flex-col justify-center gap-4 border border-dashed border-white/[0.09] bg-white/[0.012] p-7">
                      <p className="text-[13px] leading-7 text-white/55">
                        ホームページ、1ページの紹介サイト、ネットショップなどのWeb制作は、「Web制作実績」ページでまとめてご覧いただけます。
                      </p>
                      <Link
                        href="/works#archive"
                        className="inline-flex min-h-11 w-full items-center justify-center border border-white/14 px-4 text-[11px] font-semibold tracking-[0.06em] text-white/70 transition hover:border-white/35 hover:text-white sm:w-auto sm:self-start sm:px-6"
                      >
                        Web制作の実績を見る（{webProjectCount}件）
                      </Link>
                    </div>
                  </AnimateIn>
                </div>
              </div>
            </WorksDisclosure>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
