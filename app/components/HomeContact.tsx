'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'

// Threads is the main contact route, X the secondary one — rendered in that order.
const THREADS_URL = 'https://www.threads.com/@kaito.aic?igshid=NTc4MTIwNjQ2YQ=='
const X_URL = 'https://x.com/kaito_ns_ai?s=11'

const iconButtonClass =
  'inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-[#111111] text-white transition-colors duration-200 hover:border-white/40 hover:bg-[#1c1c1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export default function HomeContact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-[#080808] px-5 pb-14 pt-4 md:px-12 md:pb-20 md:pt-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.08), transparent 68%)' }}
      />
      <AnimateIn>
        <div className="relative mx-auto grid max-w-5xl gap-7 border border-white/[0.09] bg-white/[0.018] px-5 py-8 text-center sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 md:px-10 md:py-10 md:text-left">
          <div>
            <p className="mb-3 text-[12px] tracking-[0.24em] text-zinc-400">お問い合わせ</p>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.3rem)] font-black leading-[1.3] tracking-[-0.02em] text-white">
              まずは困っていることを
              <br />
              教えてください。
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/62 md:mx-0 md:text-[15px]">
              何を作るか決まっていなくても大丈夫です。
              <br className="hidden sm:block" />
              今の仕事で時間がかかっていることから一緒に整理します。
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <a
                href={THREADS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads（@kaito.aic）を新しいタブで開く"
                className={iconButtonClass}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
                </svg>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X（@kaito_ns_ai）を新しいタブで開く"
                className={iconButtonClass}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" />
                </svg>
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-3 inline-flex min-h-11 items-center text-[12px] tracking-[0.06em] text-white/50 underline decoration-white/20 underline-offset-4 transition hover:text-white/80"
            >
              お問い合わせについて詳しく見る
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
