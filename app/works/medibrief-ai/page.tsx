import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimateIn from '../../components/AnimateIn'
import Footer from '../../components/Footer'
import { caseStudies } from '../../data/caseStudies'
import { CATEGORY_LABEL, PROJECT_TYPE_LABEL, STATUS_LABEL } from '../../types/project'
import type { ProjectDetailSection } from '../../types/project'

/**
 * MediBrief, at full length.
 *
 * MediBrief lives in `caseStudies` rather than `projects`, so the shared facts
 * (title, status, problem, solution, stack, role, URLs, screenshot) are read from
 * that entry, and the page lays them out with the same sections as the other
 * work pages. The longer copy below is kept on this page instead of being added
 * to the `CaseStudy` type: it describes the current v2 build and is written from
 * the repository's README and source (`app/api/organize/route.ts`,
 * `lib/organizer/*`, `lib/limits.ts`, `lib/storage.ts`, `lib/speech.ts`).
 */

const PROJECT_ID = 'medibrief-ai'
const SITE_URL = 'https://aicmode-portfolio.vercel.app'
const PATH = '/works/medibrief-ai'

const project = caseStudies.find((entry) => entry.id === PROJECT_ID)

const title = 'MediBrief｜体調メモを診察で伝えやすい7項目に整理する受診メモ作成ツール — AIC'
const description =
  '話し言葉で書いた体調や困りごとを、診察で伝えやすい7項目の受診メモに整理するWebアプリです。AI整理とこの端末内で完結するローカル整理を選べ、編集・不足情報チェック・症状経過タイムライン・音声入力・ローカル履歴・印刷に対応します。病名・薬・緊急度の判断は行いません。'

const overview =
  'MediBriefは、受診前に「何を、どの順番で伝えるか」を整理するためのWebアプリです。体調や困っていることを話し言葉のまま書くと、診察で伝えやすい7項目の受診メモにまとめます。STEP 1（入力）→ STEP 2（整理のしかたを選んで作成）→ STEP 3（確認・編集）→ STEP 4（医師に見せる・コピー・印刷・保存）の流れを1ページで進められます。病名・薬・緊急度の判断は一切行わず、整理だけに機能を限定しています。'

const statusNote =
  'Vercelで公開中です。「AIで整理」はサーバーにAPIキーが設定されている環境でのみ選択でき、未設定の環境では入力を外部に送信しない「この端末で整理」だけが使えます。'

const features = [
  '話し言葉の自由記述を、主な困りごと・いつから・症状の変化・関係ありそうなこと・服薬／持病／アレルギー・医師に聞きたいこと・伝え忘れ防止メモの7項目に整理',
  '「AIで整理」と「この端末で整理」を画面で選択。AI整理に失敗した場合はローカル整理へ自動で切り替え',
  '整理結果の各項目を書き換え・追加・削除・並び替えできる編集機能',
  'まだ書かれていない項目を挙げ、その場で書き足して整理し直せる不足情報チェック',
  '入力に書かれた時期の表現だけを、書かれた順に並べる症状経過タイムライン',
  '対応ブラウザでの音声入力（Web Speech API）',
  '作成した受診メモを最大20件までこの端末に保存するローカル履歴',
  '操作ボタンを消し、大きな文字で内容だけを表示する「医師に見せるモード」',
  '編集後の内容とタイムラインを反映したコピー／印刷・PDF保存',
] as const

const detailSections: readonly ProjectDetailSection[] = [
  {
    title: '想定している使い方',
    items: [
      '受診の前に、待合室などでスマホから伝えたいことをまとめる',
      'うまく言葉にできないときに、画面を医師に見せて説明の助けにする',
      '家族の受診に付き添い、本人の言葉を整理して持って行く',
      '通院ごとのメモをこの端末に残し、次回に見返す',
    ],
  },
  {
    title: 'AIの役割と制限',
    body:
      'AI整理を選んだときだけ、入力をサーバー側のRoute Handler経由でOpenAI APIへ送信します（既定モデルはgpt-4o-mini）。システムプロンプトでAIの役割を言い換え・7項目への振り分け・時系列の構造化・医師への質問文の組み立てに限定し、病名や原因の推測、薬や治療の提案、緊急度の判定、入力にない事実の補完を禁止しています。APIキーはサーバー側の環境変数だけで読み込み、クライアントには渡しません。',
  },
  {
    title: 'AIの応答を検証するしくみ',
    items: [
      '知らない項目IDは捨て、必ず7項目の形に整える',
      '文字列でない値・空文字・重複を除き、文字数と件数に上限をかける',
      '入力に含まれない時期表現のタイムライン行は、行ごと削除する（AIが日付を作ることへの対策）',
      'APIキーがない・呼び出しに失敗した・応答の形が壊れていた場合はルールベース整理に切り替え、どちらで整理したかを結果の上に表示',
    ],
  },
  {
    title: 'ルールベース整理',
    body:
      '既定の整理ロジックは依存ライブラリを使わないルールベースです。入力を短い文に分け、症状の言葉を言い換え、「昨日の夜から」などの時期表現を同じ文の症状と組にし、残りの文を手がかり語で振り分けます。「吐いてはいない」のような否定表現は症状として拾わず、どこにも入らなかった文も必ずどこかに残すため、入力した内容が消えることはありません。',
  },
  {
    title: '保存とプライバシー',
    items: [
      'クラウドDBを使わず、保存先はブラウザのlocalStorageのみ',
      '保存は最大20件。1件削除・全件削除はどちらも確認をはさむ',
      'ローカル整理の間は入力を外部に送信せず、その旨を画面のフッターに常時表示',
      '入力は2,000文字まで。APIも超過時は413で拒否',
    ],
  },
  {
    title: 'テスト',
    body:
      'Vitestで、7項目への振り分け・言い換え・否定表現、タイムライン抽出、不足情報の判定、AI応答と保存データの検証、コピー用テキスト、編集操作、localStorageの保存・復元、音声入力の対応判定、/api/organizeの入力検証を確認するテストを用意しています。',
  },
]

const safety =
  'MediBriefは医療診断AIではありません。病名の断定、薬の提案、緊急度の判定、治療アドバイス、診療科の決定は行いません。整理結果は下書きとして扱い、強い痛みや息苦しさなど心配な症状があるときは、メモを作るより先に医療機関へ相談してください。'

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

export default function MediBriefPage() {
  if (!project) notFound()

  const { accent, role } = project
  const stack = [...project.stack, 'Vitest', 'Web Speech API', 'localStorage']
  const gallery = project.screenshot
    ? [
        {
          src: project.screenshot,
          alt:
            'MediBriefの画面。「昨日の夜から喉が痛くて、今朝から少し熱っぽい」という入力から、主な困りごと・いつから・症状の変化・関係ありそうなこと・服薬などの受診メモが作成されている',
          caption: '話し言葉の入力例から、7項目の受診メモに整理した結果を表示する',
          width: 2160,
          height: 1350,
        },
      ]
    : null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.subtitle,
    headline: `${project.subtitle} — ${project.title}`,
    description: overview,
    url: `${SITE_URL}${PATH}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'ja-JP',
    creator: { '@id': `${SITE_URL}/#aicmode` },
    keywords: stack.join(', '),
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
                {CATEGORY_LABEL[project.group]}
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
                診断ではなく、伝えたいことの整理ツール
              </span>
            </div>

            <p className="mt-7 text-[13px] tracking-[0.14em]" style={{ color: accent, opacity: 0.85 }}>
              {project.title}
            </p>
            <h1 className="mt-4 text-[clamp(2rem,6.4vw,4.4rem)] font-black leading-[0.94] tracking-[-0.02em] text-white">
              MediBrief
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/72">{project.plainSummary}</p>
            <p className="mt-4 max-w-2xl text-[14px] leading-8 text-white/55">{overview}</p>

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

          <AnimateIn delay={80}>
            <section className="mt-20 md:mt-28">
              <SectionHeading no="02" ja="概要" accent={accent} />
              <p className="mt-6 max-w-3xl text-[14px] leading-8 text-white/60">{overview}</p>
            </section>
          </AnimateIn>

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
              <Bullets items={features} accent={accent} />
            </section>
          </AnimateIn>

          {detailSections.length > 0 ? (
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
                {stack.map((item) => (
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

          {safety ? (
            <AnimateIn delay={80}>
              <section className="mt-16 md:mt-20">
                <SectionHeading no="10" ja="ご注意ください" accent={accent} />
                <div className="mt-6 border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.04)] p-6 sm:p-8">
                  <p className="text-[14px] font-semibold tracking-[0.1em] text-[rgba(212,175,55,0.85)]">
                    ご利用上の注意
                  </p>
                  <p className="mt-4 text-[13.5px] leading-8 text-white/64">{safety}</p>
                </div>
              </section>
            </AnimateIn>
          ) : null}

          <AnimateIn delay={80}>
            <div className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-8 md:mt-28 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-[11.5px] leading-6 tracking-[0.04em] text-white/55">
                自分で企画・制作したツールです。医療機関や企業から依頼を受けて作ったものではなく、診断や医療判断を行うものではありません。
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
