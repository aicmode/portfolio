'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from './AnimateIn'

export default function HomeAbout() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0c0c0c] px-5 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="mb-3 text-[12px] tracking-[0.24em] text-zinc-400">自己紹介</p>
              <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-[1.25] tracking-[-0.025em] text-white">
                AIC
              </h2>
            </div>
            <p className="max-w-xl text-[14px] leading-7 text-white/58 md:text-right md:text-[15px]">
              現場の困りごとを整理し、使い続けられる仕組みにします。
            </p>
          </div>
        </AnimateIn>

        {/* One profile card. On a phone the photo sits beside the name and the
            text runs full width beneath; from sm up the photo takes a column. */}
        <AnimateIn delay={120}>
          <div className="mt-6 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 border border-white/[0.08] bg-[#090909] p-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6 sm:p-6 lg:grid-cols-[8.5rem_minmax(0,1fr)_auto] lg:gap-x-8">
            <div className="relative aspect-square w-full self-start overflow-hidden border border-white/10 sm:row-span-2">
              <Image
                src="/images/profile/profile-kaito.png"
                alt="AICのプロフィール写真"
                fill
                sizes="(max-width: 639px) 4.5rem, (max-width: 1023px) 8rem, 8.5rem"
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-1 self-center sm:self-end">
              <p className="text-[17px] font-semibold leading-7 tracking-[0.04em] text-white/90">
                KAITO
              </p>
              <p className="text-[11px] leading-5 tracking-[0.12em] text-white/45 sm:text-[12px]">
                AI Engineer | Automation Developer
              </p>
            </div>
            <div className="col-span-2 space-y-2 sm:col-span-1 sm:col-start-2">
              <p className="text-[14px] leading-7 text-white/72 md:text-[15px]">
                看護師として約9年間勤務した経験を活かし、仕事の困りごとを整理して、AIやWebアプリで解決します。
              </p>
              <p className="text-[14px] leading-7 text-white/52">
                鹿児島を拠点に、ご相談から制作、公開まで一人で担当します。オンラインでも対応できます。
              </p>
            </div>
            <Link
              href="/about"
              className="col-span-2 inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-[rgba(212,175,55,0.45)] hover:text-white sm:col-span-1 sm:col-start-2 sm:w-auto sm:justify-self-start lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center"
            >
              自己紹介を詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
