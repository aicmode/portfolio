'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'

export default function HomeHealthcare() {
  return (
    <section
      id="healthcare"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.07] bg-[#080a0a] px-5 py-14 md:px-12 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[-14rem] h-[32rem] w-[32rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(95,210,194,0.08) 0%, transparent 68%)' }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
        <AnimateIn>
          <div>
            <p className="mb-3 text-[12px] tracking-[0.24em] text-[#74cfc2]">医療・介護</p>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-[1.25] tracking-[-0.025em] text-white">
              現場を知っているから、
              <br />
              話が早く進みます。
            </h2>
          </div>
        </AnimateIn>
        <AnimateIn delay={140}>
          <div>
            <p className="text-[14px] leading-7 text-white/68 md:text-[15px] md:leading-8">
              看護師として約9年間働いた経験を活かし、現場の仕事を理解したうえで、業務をラクにする仕組みを提案します。
            </p>
            <Link
              href="/healthcare"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center border border-[#74cfc2]/30 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-[#9eddd4] transition hover:border-[#74cfc2]/60 hover:text-white sm:w-auto"
            >
              医療・介護について詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
