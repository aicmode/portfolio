'use client'

import Link from 'next/link'
import AnimateIn from './AnimateIn'
import { healthcareWorks } from '../data/healthcareWorks'

const healthcarePoints = [
  {
    no: '01',
    title: '現場の流れが分かります',
    description: '記録、申し送り、患者さんへの対応など、実際の一日の流れを前提に考えます。',
  },
  {
    no: '02',
    title: '医療の言葉が分かります',
    description: '専門用語のまま話していただいて大丈夫です。言い換えの説明は必要ありません。',
  },
  {
    no: '03',
    title: '安全を最優先にします',
    description: 'AIの答えを診断としては扱いません。人が確認する手順と注意書きを必ず入れます。',
  },
  {
    no: '04',
    title: '先に確認してから作ります',
    description: '個人情報の扱い、誰が使うか、責任の範囲を確認したうえで、作る範囲を決めます。',
  },
] as const

export default function HealthcareAI() {
  return (
    <section
      id="healthcare"
      className="relative overflow-hidden border-t border-white/[0.07] bg-[#080a0a] px-5 py-24 md:px-12 md:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-[-15%] h-[34rem] w-[34rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(95,210,194,0.07) 0%, transparent 68%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="grid gap-10 border-b border-white/[0.08] pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:pb-16">
            <div>
              <p className="mb-5 text-[12px] tracking-[0.24em] text-[#74cfc2]">医療・介護</p>
              <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-black leading-[1.25] tracking-[-0.025em] text-white">
                <span className="block">医療・介護にも</span>
                <span
                  className="block"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.24)',
                  }}
                >
                  対応できます。
                </span>
              </h2>
            </div>

            <div className="space-y-5 self-end text-[15px] leading-8 text-white/68 md:text-[16px]">
              <p>
                看護師として約9年間働いてきた経験を活かし、記録や申し送り、情報共有など現場の仕事を理解したうえで、
                忙しいときでも迷わず使える画面と、業務を楽にする仕組みを提案します。
              </p>
              <p className="text-white/55">
                「AIを入れること」自体は目的にしません。安全に使えるか、個人情報は大丈夫か、
                現場の負担が増えないかを確認してから作ります。
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {healthcarePoints.map((point, index) => (
            <AnimateIn key={point.no} delay={100 + index * 80}>
              <article className="h-full border-t border-white/[0.09] py-6">
                <p className="font-mono text-[9px] tracking-[0.3em] text-[#74cfc2]/80">{point.no}</p>
                <h3 className="mt-4 text-[15px] font-semibold leading-7 tracking-[0.02em] text-white/85">
                  {point.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-7 text-white/58">{point.description}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={360}>
          <p className="mt-8 max-w-3xl border-l border-[#74cfc2]/30 pl-4 text-[12.5px] leading-7 text-white/50">
            診断や治療を行うものではありません。人による確認、注意書きの表示、見られる人の制限などを、
            作りはじめる前に一緒に決めます。
          </p>
        </AnimateIn>

        <div className="mt-20 md:mt-28">
          <AnimateIn>
            <p className="mb-5 text-[12px] tracking-[0.24em] text-[#74cfc2]">制作物</p>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-[1.3] tracking-[-0.02em] text-white">
              医療・介護に関わる制作物
            </h2>
            <p className="mt-5 max-w-3xl text-[14px] leading-8 text-white/58 md:text-[15px]">
              看護記録や申し送りなど、現場で見てきた仕事をもとに作ったツールと、受診の準備を助けるツールです。いずれも自分で企画・制作したもので、医療機関や施設から依頼を受けたものではありません。診断や治療の判断は行いません。
            </p>
          </AnimateIn>

          <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-3">
            {healthcareWorks.map((work, index) => (
              <AnimateIn key={work.id} delay={100 + index * 80}>
                <Link
                  href={work.detailPath}
                  className="group flex h-full flex-col border-t border-white/[0.09] py-6 transition hover:border-[#74cfc2]/40"
                >
                  <p className="text-[11px] tracking-[0.14em] text-[#74cfc2]/80">{work.subtitle}</p>
                  <h3 className="mt-3 text-[16px] font-semibold leading-7 tracking-[0.02em] text-white/88">
                    {work.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-7 text-white/58">{work.plainSummary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] text-[#9eddd4] transition group-hover:text-white">
                    詳しく見る
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
