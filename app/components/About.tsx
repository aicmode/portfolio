'use client'
import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'

const influences = [
  { label: '音楽', desc: 'トラップ・ハウス・アンビエント・ソウル' },
  { label: '映画', desc: '映像的で、静かな作品' },
  { label: '文化', desc: 'アメリカ・イギリス・日本のストリート' },
]

/* The count is read from the data, so it can never claim a number the site
   does not actually show. */
const stats = [
  { top: '約9年', bottom: '看護師として勤務' },
  { top: `${projects.length + caseStudies.length}件`, bottom: 'これまでの制作' },
  { top: '一人', bottom: '相談から公開まで' },
]

/**
 * Six strengths, not "anything you need". Each one is something a client can
 * hold me to, and each is visible in the work above.
 */
const strengths = [
  {
    title: '困りごとから考えます',
    desc: '作りたい機能より先に、何に困っているのかを整理します。目的と使う人を先に決めます。',
  },
  {
    title: 'AIの使いどころが分かります',
    desc: '仕事のどこにAIを使えば効果が出るか、逆に使わないほうがよい部分も判断できます。',
  },
  {
    title: '仕事用のアプリを作れます',
    desc: '必要な機能だけにしぼった、仕事に合うアプリを一から作ります。',
  },
  {
    title: '手作業を自動化できます',
    desc: '集める・まとめる・保存する・知らせる、を自動で回る形に組み立てます。',
  },
  {
    title: '今のサービスとつなげます',
    desc: 'Google、LINE、Slackなど、すでに使っているサービス同士を自動でつなぎます。',
  },
  {
    title: '見た目や雰囲気も作れます',
    desc: '動くだけでなく、お店やブランドの雰囲気が伝わる見せ方まで一緒に考えます。',
  },
]

function StrengthRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="flex h-full flex-col gap-2 py-5 pr-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <span className="text-[15px] font-semibold leading-7 tracking-[0.02em]" style={{ color: '#d0d0d0' }}>
        {title}
      </span>
      <span className="text-[13.5px] leading-7" style={{ color: '#8a8a8a' }}>
        {desc}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="px-5 py-20 md:px-12 md:py-44" style={{ background: '#0c0c0c' }}>
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="mb-16 flex items-center gap-6 md:mb-24 md:gap-10">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06))' }} />
            <span className="whitespace-nowrap text-[12px] tracking-[0.24em] text-zinc-400">自己紹介</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.06))' }} />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 items-start gap-12 md:gap-16 lg:grid-cols-2 lg:gap-28">
          {/* Left */}
          <AnimateIn>
            <div>
              <p className="mb-8 text-[12px] tracking-[0.24em] text-zinc-400 md:mb-10">AIC（アイシー）</p>

              <div className="relative mb-10 pl-5 md:mb-14 md:pl-6">
                <div
                  className="absolute bottom-0 left-0 top-0 w-[1px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(124,58,237,0.7) 40%, rgba(37,99,235,0.4) 70%, transparent)',
                  }}
                />
                <h2
                  className="font-black leading-[1.25] text-white"
                  style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)', letterSpacing: '-0.025em' }}
                >
                  現場で
                  <br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}>
                    使い続けられる
                    <br />
                    ものを。
                  </span>
                </h2>
              </div>

              {/* Cultural influences — the creative half of the practice. */}
              <div className="space-y-0">
                {influences.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span
                      className="flex-shrink-0 text-[12px] tracking-[0.1em]"
                      style={{ color: '#7a7a7a', width: '52px' }}
                    >
                      {label}
                    </span>
                    <span style={{ color: '#252525', fontSize: '10px' }} aria-hidden="true">
                      —
                    </span>
                    <span className="text-[12.5px] tracking-wide" style={{ color: '#8a8a8a' }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right */}
          <AnimateIn delay={200}>
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4">
                <p className="text-[15px] leading-8 md:text-[17px]" style={{ color: '#c0c0c0' }}>
                  鹿児島を拠点に、仕事の困りごとを整理して、AIや自動化、Webアプリで解決します。
                  相談から公開まで、すべて一人で担当します。
                </p>
                <p className="text-[14px] leading-8 md:text-[15px]" style={{ color: '#7a7a7a' }}>
                  看護師として約9年間、現場で働いてきました。医療・介護の分野では、
                  言葉が通じるだけでなく、実際に使う人の負担まで考えて提案できます。
                </p>
                <Link
                  href="/healthcare"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] text-[#9eddd4] underline-offset-4 transition hover:text-white hover:underline"
                >
                  医療・介護での考え方と制作物を見る
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="text-[14px] leading-8 md:text-[15px]" style={{ color: '#7a7a7a' }}>
                  音楽や映画が好きで、見せ方や雰囲気を作るのも得意です。
                  「ちゃんと動く」だけでなく「よく見える」ところまで対応します。
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

              <blockquote
                className="text-sm leading-relaxed"
                style={{
                  color: '#8a8a8a',
                  fontStyle: 'italic',
                  letterSpacing: '0.015em',
                  borderLeft: '2px solid rgba(124,58,237,0.3)',
                  paddingLeft: '16px',
                }}
              >
                「音楽と映画と、街の空気から
                <br />
                かたちを考えています。」
              </blockquote>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {stats.map(({ top, bottom }) => (
                  <div
                    key={bottom}
                    className="py-4 text-center"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="mb-1.5 font-black text-white"
                      style={{ fontSize: 'clamp(1.15rem, 2vw, 1.6rem)', letterSpacing: '-0.01em' }}
                    >
                      {top}
                    </div>
                    <div className="text-[11px] leading-5 tracking-[0.04em]" style={{ color: '#7a7a7a' }}>
                      {bottom}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['鹿児島', 'オンライン対応', '日本語 / 英語'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[12px] tracking-[0.08em]"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', color: '#8a8a8a' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Strengths — deliberately six, so this never reads as "I do anything". */}
        <div className="mt-24 md:mt-36">
          <AnimateIn>
            <div className="mb-10 md:mb-14">
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">得意なこと</p>
              <h3
                className="font-black leading-[1.2] text-white"
                style={{ fontSize: 'clamp(1.7rem, 4.2vw, 3rem)', letterSpacing: '-0.02em' }}
              >
                とくに得意な6つのこと
              </h3>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {strengths.map((strength, i) => (
              <AnimateIn key={strength.title} delay={100 + i * 70}>
                <StrengthRow {...strength} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
