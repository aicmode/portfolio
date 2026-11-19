import Link from 'next/link'

export default function DetailPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.08] bg-[#080808] px-5 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[-14rem] h-[32rem] w-[32rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 68%)' }}
      />
      <div className="relative mx-auto max-w-7xl">
        <nav aria-label="詳細ページナビゲーション" className="mb-14 flex items-center justify-between gap-5">
          <Link href="/" className="text-sm font-bold tracking-[0.3em] text-white transition-opacity hover:opacity-70">
            AIC
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center justify-center border border-[rgba(212,175,55,0.34)] px-4 text-[11px] font-semibold tracking-[0.08em] text-[rgba(232,204,113,0.9)] transition hover:border-[rgba(212,175,55,0.6)] hover:text-white"
          >
            お問い合わせ
          </Link>
        </nav>
        <p className="mb-5 text-[12px] tracking-[0.24em] text-zinc-400">{eyebrow}</p>
        <h1 className="max-w-4xl text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-[15px] leading-8 text-white/58 md:text-[16px]">{description}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-white/45 transition hover:text-white/80"
        >
          <span aria-hidden="true">←</span> トップへ戻る
        </Link>
      </div>
    </header>
  )
}
