'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'

const LINE_URL = 'https://line.me/R/ti/p/@862povmk'
const X_URL = 'https://x.com/kaito_ns_ai'

export default function HomeContact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-[#080808] px-5 py-20 md:px-12 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.08), transparent 68%)' }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <AnimateIn>
          <p className="mb-5 text-[12px] tracking-[0.24em] text-zinc-400">お問い合わせ</p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black leading-[1.22] tracking-[-0.025em] text-white">
            まずは困っていることを
            <br />
            教えてください。
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-8 text-white/62 md:text-[16px]">
            何を作るか決まっていなくても大丈夫です。
            <br className="hidden sm:block" />
            今の仕事で時間がかかっていることから一緒に整理します。
          </p>
        </AnimateIn>

        <AnimateIn delay={160}>
          <div className="mt-9 flex items-center justify-center gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE公式アカウントを新しいタブで開く"
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-[#111111] text-white transition-colors duration-200 hover:border-white/40 hover:bg-[#1c1c1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-[#06C755]" aria-hidden="true">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X（@kaito_ns_ai）を新しいタブで開く"
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-[#111111] text-white transition-colors duration-200 hover:border-white/40 hover:bg-[#1c1c1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" />
              </svg>
            </a>
          </div>
          <Link href="/contact" className="mt-6 inline-block text-[12px] tracking-[0.06em] text-white/42 underline decoration-white/20 underline-offset-4 transition hover:text-white/75">
            お問い合わせについて詳しく見る
          </Link>
        </AnimateIn>
      </div>
    </section>
  )
}
