'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from './AnimateIn'

export default function HomeAbout() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0c0c0c] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-6 border-b border-white/[0.08] pb-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-4 text-[12px] tracking-[0.24em] text-zinc-400">自己紹介</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.2] tracking-[-0.025em] text-white">
                AIC
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-white/58 md:justify-self-end">
              現場の困りごとを整理し、使い続けられる仕組みにします。
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-8 grid gap-6 border border-white/[0.08] bg-[#090909] p-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:p-7 md:grid-cols-[14rem_minmax(0,1fr)] md:items-center lg:grid-cols-[14rem_minmax(0,1fr)_auto]">
            <div className="relative aspect-[16/9] min-h-32 overflow-hidden border border-white/10 sm:aspect-auto sm:min-h-48">
              <Image
                src="/images/profile/profile-kaito.png"
                alt="AICのプロフィール写真"
                fill
                sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 767px) 11rem, 14rem"
                className="object-contain object-center sm:object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <p className="text-[17px] font-semibold leading-7 tracking-[0.04em] text-white/90">
                  KAITO
                </p>
                <p className="text-[11px] leading-5 tracking-[0.12em] text-white/45 sm:text-[12px]">
                  AI Engineer | Automation Developer
                </p>
              </div>
              <p className="text-[15px] leading-8 text-white/72">
                看護師として約9年間勤務した経験を活かし、仕事の困りごとを整理して、AIやWebアプリで解決します。
              </p>
              <p className="text-[14px] leading-7 text-white/52">
                ご相談から制作、公開まで一人で担当します。
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-[rgba(212,175,55,0.45)] hover:text-white sm:col-start-2 md:w-auto lg:col-start-auto"
            >
              自己紹介を詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
