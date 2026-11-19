'use client'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" />
    </svg>
  )
}

type ContactChannel = {
  href: string
  icon: ReactNode
  /** Small eyebrow: the platform. */
  label: string
  /** The line a visitor actually reads first. */
  title: string
  desc: string
  /** Brand colour, used for the icon and border on hover only. */
  accent: string
  glow: string
  border: string
  /** Full sentence for screen readers — the card opens a new tab. */
  ariaLabel: string
}

/** Main contact route. */
const threads: ContactChannel = {
  href: 'https://www.threads.com/@kaito.aic?igshid=NTc4MTIwNjQ2YQ==',
  icon: <ThreadsIcon />,
  label: 'Threads',
  title: 'Threadsでお問い合わせ',
  desc: 'ご相談、お見積もり、「こんなことできますか？」の確認まで、お気軽にどうぞ。',
  accent: '#ffffff',
  glow: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.12)',
  ariaLabel: 'Threads（@kaito.aic）を新しいタブで開く',
}

/** Secondary contact route. */
const x: ContactChannel = {
  href: 'https://x.com/kaito_ns_ai?s=11',
  icon: <XIcon />,
  label: 'X',
  title: 'Xでお問い合わせ',
  desc: 'Xからのご相談も受け付けています。普段お使いの方はこちらからどうぞ。',
  accent: '#ffffff',
  glow: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.12)',
  ariaLabel: 'X（@kaito_ns_ai）を新しいタブで開く',
}

/** Display order: Threads (main) first, then X (secondary). */
const contactChannels: ContactChannel[] = [threads, x]

const disciplines = ['作業の自動化', 'AIを使ったツール', '仕事用のWebアプリ', '医療・介護の業務改善']

/**
 * What to include in a first message. Removes the "I don't know what to write"
 * barrier, which is the most common reason an enquiry never gets sent.
 * Everything is optional on purpose — the note under the list says so.
 */
const inquiryChecklist = [
  { label: '現在困っていること', hint: '手作業になっている業務、対応が追いつかない場面など' },
  { label: '利用する人', hint: '社内スタッフ / 顧客 / 自分だけ、想定人数' },
  { label: 'やりたいこと', hint: '決まっていなければ「こうなったら助かる」だけで構いません' },
  { label: '希望時期', hint: '公開したい時期、動かしたいタイミング' },
  { label: '予算の目安', hint: '範囲でも構いません。範囲に合わせて構成を調整します' },
  { label: '参考にしたいもの', hint: '似ていると感じたサイトやアプリがあればURLを' },
]

const inquiries = [
  {
    title: 'AIに任せたい',
    text: '問い合わせ対応や文章作成が追いつかない仕事を、AIに任せられる形にします。',
  },
  {
    title: '手作業をなくしたい',
    text: '毎日の集計・お知らせ・共有を、自動で回る仕組みに変えます。',
  },
  {
    title: '同じ入力を何度もしている',
    text: 'サービス同士をつないで、二度入力する手間をなくします。',
  },
  {
    title: '今のソフトが合わない',
    text: '仕事のやり方に合わない部分を、専用のアプリで埋めます。',
  },
  {
    title: 'サイトから問い合わせが来ない',
    text: '来ない原因を整理したうえで、伝わるサイトに作り直します。',
  },
  {
    title: '見せ方から相談したい',
    text: '何を、誰に、どう見せるか。方向性から一緒に決めます。',
  },
]

function ContactCard({
  href,
  icon,
  label,
  title,
  desc,
  accent,
  glow,
  border,
  ariaLabel,
}: ContactChannel) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group flex w-full flex-col items-center gap-4 px-6 py-9 text-center"
      style={{
        border: `1px solid rgba(255,255,255,0.07)`,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
        // Read back by the icon and title on hover, so the brand colour lives
        // in the data rather than in a class name per channel.
        '--contact-accent': accent,
      } as CSSProperties}
      whileHover={{
        borderColor: border,
        y: -6,
        boxShadow: `0 0 40px ${glow}, 0 12px 40px rgba(0,0,0,0.5)`,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ borderColor: 'rgba(255,255,255,0.07)', boxShadow: 'none', y: 0 }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8a8a8a', transition: 'color 0.3s ease, border-color 0.3s ease' }}
      >
        <span
          className="group-hover:text-[var(--contact-accent)]"
          style={{ color: 'inherit', transition: 'color 0.3s ease' }}
        >
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] tracking-[0.24em]" style={{ color: '#7a7a7a' }}>
          {label}
        </p>
        <p className="mb-1.5 text-[15px] font-semibold tracking-wide text-white">
          {title}
        </p>
        <p className="text-[12.5px] leading-6 tracking-wide" style={{ color: '#7a7a7a' }}>
          {desc}
        </p>
      </div>
      <svg
        className="h-3.5 w-3.5 flex-shrink-0 opacity-20 transition-all duration-[350ms] group-hover:-translate-y-0.5 group-hover:opacity-60"
        style={{ color: '#888' }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7l-10 10M17 7H7m10 0v10" />
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-44 px-5 md:px-12 relative overflow-hidden"
      style={{ background: '#0c0c0c' }}
    >
      {/* Ambient glow bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Available badge ── */}
        <AnimateIn delay={0}>
          <div className="mb-10 md:mb-14 flex items-center gap-3">
            <span
              className="flex items-center gap-2 text-[12px] tracking-[0.06em] px-3.5 py-1.5"
              style={{
                border: '1px solid rgba(109,217,109,0.25)',
                color: '#6bcb6b',
                background: 'rgba(109,217,109,0.04)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-available flex-shrink-0"
                style={{ background: '#6bcb6b', boxShadow: '0 0 8px rgba(107,203,107,0.6)' }}
              />
              お仕事のご相談を受け付けています
            </span>
          </div>
        </AnimateIn>

        {/* ── Headline ── */}
        <AnimateIn delay={80}>
          <div className="mb-6 md:mb-8">
            <p className="text-[12px] tracking-[0.24em] text-zinc-400 mb-5">お問い合わせ</p>
            <h2
              className="font-black text-white leading-[1.25]"
              style={{ fontSize: 'clamp(2rem, 5.2vw, 4rem)', letterSpacing: '-0.025em' }}
            >
              相談から、使える<br />
              <span style={{
                background: 'linear-gradient(120deg, #ffffff 0%, rgba(200,180,255,0.85) 60%, rgba(100,160,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                仕組みへ。
              </span>
            </h2>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2.5">
              {disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="border border-white/12 px-3 py-1.5 text-[12px] tracking-[0.04em] text-white/70"
                >
                  {discipline}
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        {/* ── Copy ── */}
        <AnimateIn delay={160}>
          <div className="mb-10 max-w-3xl md:mb-16">
            <p className="mb-5 text-[15px] leading-8 text-white/58 md:text-[17px]">
              何を作るか決まっていなくても大丈夫です。今困っていること、手作業になっている仕事、
              「こうなったら助かる」というイメージをお聞かせください。
            </p>
            <p className="text-[14px] leading-8" style={{ color: '#8a8a8a' }}>
              内容を整理して、いちばん合う方法をご提案します。
            </p>
          </div>
        </AnimateIn>

        {/* ── Project inquiry ── */}
        <AnimateIn delay={240}>
          <div className="mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-between gap-6">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-white/70">こんなご相談が多いです</p>
              <div className="h-px flex-1 bg-gradient-to-l from-white/[0.07] to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {inquiries.map((item) => (
                <motion.div
                  key={item.title}
                  className="border border-white/[0.08] bg-white/[0.018] px-5 py-6 backdrop-blur-xl"
                  whileHover={{
                    y: -5,
                    borderColor: 'rgba(212,175,55,0.22)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.42), 0 0 44px rgba(212,175,55,0.055)',
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <p className="mb-3 text-[15px] font-semibold leading-7 tracking-[0.02em] text-white/85">
                    {item.title}
                  </p>
                  <p className="text-[14px] leading-7 text-white/58">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── What to send ── */}
        <AnimateIn delay={280}>
          <div className="mb-12 md:mb-16">
            <div className="mb-6 flex items-center justify-between gap-6">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-white/70">お伝えいただきたいこと</p>
              <div className="h-px flex-1 bg-gradient-to-l from-white/[0.07] to-transparent" />
            </div>
            <p className="mb-7 max-w-3xl text-[15px] leading-8 text-white/58">
              最初のご連絡では、分かる範囲だけで大丈夫です。足りない部分は、こちらから順番にお尋ねします。
            </p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
              {inquiryChecklist.map((item, index) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1.5 py-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[9px] tracking-[0.2em]"
                      style={{ color: 'rgba(212,175,55,0.8)' }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-semibold tracking-[0.04em] text-white/80">
                      {item.label}
                    </span>
                  </span>
                  <span className="pl-[1.7rem] text-[13px] leading-6 text-white/56">{item.hint}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href={threads.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-[#080808]"
                style={{
                  borderColor: 'rgba(212,175,55,0.5)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(212,175,55,0.82))',
                  boxShadow: '0 0 44px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 0 72px rgba(212,175,55,0.22), 0 0 110px rgba(109,40,217,0.10)',
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                Threadsで相談する
                <span className="sr-only">（Threadsを新しいタブで開きます）</span>
              </motion.a>
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/14 px-7 py-4 text-[13px] font-semibold tracking-[0.08em] text-white/70 transition duration-500 hover:border-white/32 hover:text-white"
              >
                Xで相談する
                <span className="sr-only">（Xを新しいタブで開きます）</span>
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* ── Divider ── */}
        <AnimateIn delay={360}>
          <div className="mb-8 md:mb-10 flex items-center gap-6">
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            <span className="whitespace-nowrap text-[12px] tracking-[0.16em] text-zinc-400">連絡先</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, rgba(255,255,255,0.06), transparent)' }} />
          </div>
        </AnimateIn>

        {/* ── Contact cards ── */}
        <AnimateIn delay={420}>
          <div className="mx-auto grid w-full max-w-lg auto-rows-fr gap-4">
            {contactChannels.map((channel) => (
              <ContactCard key={channel.label} {...channel} />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
