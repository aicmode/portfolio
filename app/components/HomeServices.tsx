'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { serviceEntrances } from '../data/services'

export default function HomeServices() {
  return (
    <section id="services" className="scroll-mt-20 bg-[#0a0a0a] px-5 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-4 border-b border-white/[0.08] pb-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
            <div>
              <p className="mb-3 text-[12px] tracking-[0.24em] text-zinc-400">できること</p>
              <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-[1.25] tracking-[-0.025em] text-white">
                仕事の負担を、
                <br className="md:hidden" />
                仕組みで軽くします。
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-7 text-white/58 md:justify-self-end md:text-right">
              何を作るか決まっていなくても大丈夫です。今、時間がかかっている仕事から整理します。
            </p>
          </div>
        </AnimateIn>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {serviceEntrances.map((service, index) => (
            <AnimateIn key={service.no} delay={100 + index * 80}>
              <article className="flex h-full flex-col border border-white/[0.08] bg-white/[0.018] p-5 md:p-6">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[rgba(212,175,55,0.78)]">
                  {service.no}
                </p>
                <h3 className="mt-2.5 text-lg font-semibold leading-[1.45] text-white">{service.title}</h3>
                <p className="mt-2.5 text-[14px] leading-7 text-white/60">{service.body}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={320}>
          <div className="mt-6 flex justify-end">
            <Link
              href="/services"
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/14 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/68 transition hover:border-[rgba(212,175,55,0.45)] hover:text-white sm:w-auto"
            >
              できることを詳しく見る
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
