'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const PANEL_ID = 'works-list-panel'

/**
 * Folds the top page's works list behind one button.
 *
 * The list stays in the document while closed — collapsed to zero height and
 * made `inert`, so it is neither reachable by Tab nor announced — which keeps
 * every card server-rendered for search engines and for the structured data
 * that describes them. Only the first view gets shorter; nothing is dropped.
 *
 * The height animates with a `grid-template-rows` 0fr → 1fr transition rather
 * than a measured height, and `motion-reduce` turns it off.
 */
export default function WorksDisclosure({
  count,
  aside,
  children,
}: {
  count: number
  /** Shown beside the toggle whether the list is open or not. */
  aside?: ReactNode
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /**
   * Closing from the button at the bottom of a long list: bring the top toggle
   * back into view and give it focus, so neither the reader nor keyboard focus
   * is left stranded in the space the list used to fill.
   */
  const closeFromBottom = useCallback(() => {
    setOpen(false)
    const toggle = toggleRef.current
    if (!toggle) return
    toggle.focus({ preventScroll: true })
    toggle.scrollIntoView({ block: 'center' })
  }, [])

  // An address that points inside the list (an old `/#client-work` link, say)
  // opens it, so the anchor still lands on something visible.
  useEffect(() => {
    const openForHash = () => {
      const hash = window.location.hash
      if (hash.length < 2) return
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target || !panelRef.current?.contains(target)) return
      setOpen(true)
      window.setTimeout(() => target.scrollIntoView({ block: 'start' }), 80)
    }
    openForHash()
    window.addEventListener('hashchange', openForHash)
    return () => window.removeEventListener('hashchange', openForHash)
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={PANEL_ID}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.06)] px-6 py-3 text-[13px] font-semibold tracking-[0.08em] text-[rgba(240,215,140,0.95)] transition hover:border-[rgba(212,175,55,0.7)] hover:bg-[rgba(212,175,55,0.1)] hover:text-white sm:w-auto"
        >
          {open ? '作品一覧を閉じる' : `作品一覧を見る（${count}件）`}
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {aside}
      </div>

      <div
        ref={panelRef}
        id={PANEL_ID}
        role="region"
        aria-label="制作実績の一覧"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="-mx-1.5 min-h-0 overflow-hidden">
          {/* The side and bottom padding gives focus rings room inside the
              clip; it sits a level in so the closed track collapses to 0. */}
          <div className="px-1.5 pb-1.5">
            {children}
            <div className="mt-12 flex justify-center border-t border-white/[0.07] pt-8">
              <button
                type="button"
                onClick={closeFromBottom}
                aria-expanded={open}
                aria-controls={PANEL_ID}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 border border-white/14 px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white/70 transition hover:border-white/35 hover:text-white sm:w-auto"
              >
                作品一覧を閉じる
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
