'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: '制作実績', href: '#works' },
  { label: 'できること', href: '#services' },
  { label: '医療・介護', href: '#healthcare' },
  { label: '自己紹介', href: '#about' },
  { label: 'よくある質問', href: '/faq' },
  { label: 'お問い合わせ', href: '#contact' },
]

const PANEL_ID = 'mobile-nav-panel'

/** Panel collapse duration, in seconds and ms, from one place. */
const PANEL_DURATION_S = 0.32
const PANEL_DURATION_MS = PANEL_DURATION_S * 1000

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrollTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /**
   * Drive the jump ourselves rather than leaving it to fragment navigation.
   *
   * Tapping a link in the panel used to update the URL hash and not move the
   * page at all: the panel's collapse animation runs at the same moment, and a
   * smooth scroll that is already in flight gets cancelled by it. So the hash is
   * pushed immediately (the URL stays shareable) and the scroll is started once
   * the panel has finished collapsing.
   *
   * `scrollIntoView` with no `behavior` defers to the CSS `scroll-behavior`,
   * which is how the reduced-motion override stays in effect, and it honours
   * `scroll-margin-top` so the heading clears the fixed nav.
   */
  const onNavigate = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    if (!href.startsWith('#')) return
    const target = document.querySelector(href)
    if (!target) return
    event.preventDefault()
    history.pushState(null, '', href)
    window.clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = window.setTimeout(() => {
      target.scrollIntoView({ block: 'start' })
    }, PANEL_DURATION_MS + 60)
  }, [])

  // Don't let a queued scroll fire after this component is gone.
  useEffect(() => () => window.clearTimeout(scrollTimerRef.current), [])

  // Escape closes the panel wherever focus is, and focus goes back to the
  // toggle so a keyboard user is not stranded at the top of the document.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <nav
      aria-label="サイト内ナビゲーション"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        background: scrolled || menuOpen ? 'rgba(8, 8, 8, 0.94)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="#top"
          className="text-sm font-bold tracking-[0.3em] text-white transition-opacity duration-300 hover:opacity-70"
        >
          AIC
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="whitespace-nowrap text-[12px] tracking-[0.08em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Below lg the links were previously hidden with no alternative, so the
            new sections were unreachable on a phone without manual scrolling. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={PANEL_ID}
          className="inline-flex h-10 w-10 items-center justify-center border border-white/12 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white lg:hidden"
        >
          <span className="sr-only">{menuOpen ? 'メニューを閉じる' : 'メニューを開く'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeWidth={1.5} d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id={PANEL_ID}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: PANEL_DURATION_S, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
          >
            <ul className="px-6 pb-5 pt-2">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={(event) => onNavigate(event, href)}
                    className="block border-b border-white/[0.05] py-3.5 text-[14px] tracking-[0.06em] text-zinc-400 transition-colors duration-300 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
