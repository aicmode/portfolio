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
  /**
   * A request to bring one element inside the list into view. `seq` makes a
   * repeat request for the same element a new value, so it runs again.
   */
  const [reveal, setReveal] = useState<{ id: string; seq: number } | null>(null)

  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /**
   * Closing from the button at the bottom of a long list: bring the top toggle
   * back into view and give it focus, so neither the reader nor keyboard focus
   * is left stranded in the space the list used to fill.
   */
  const closeFromBottom = useCallback(() => {
    setOpen(false)
    setReveal(null)
    const toggle = toggleRef.current
    if (!toggle) return
    toggle.focus({ preventScroll: true })
    toggle.scrollIntoView({ block: 'center' })
  }, [])

  /** The element with this id, if it is inside the list. */
  const panelTarget = useCallback((id: string) => {
    const target = document.getElementById(id)
    return target && panelRef.current?.contains(target) ? target : null
  }, [])

  const requestReveal = useCallback((id: string) => {
    setOpen(true)
    setReveal((previous) => ({ id, seq: (previous?.seq ?? 0) + 1 }))
  }, [])

  // An address that points inside the list (`/#client-work`, `/#ai-works`)
  // opens it, so the anchor still lands on something visible — on first load,
  // and on back / forward between such addresses.
  useEffect(() => {
    const openForHash = () => {
      const hash = window.location.hash
      if (hash.length < 2) return
      const id = decodeURIComponent(hash.slice(1))
      if (panelTarget(id)) requestReveal(id)
    }
    openForHash()
    window.addEventListener('hashchange', openForHash)
    return () => window.removeEventListener('hashchange', openForHash)
  }, [panelTarget, requestReveal])

  // In-page links to a group inside the list (the summary cards above it).
  // Handled here rather than left to fragment navigation, because clicking a
  // link whose hash is already in the address fires no `hashchange` — and the
  // list may have been closed since. Modified clicks keep their default.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      const href = link?.getAttribute('href')
      if (!href || href.length < 2) return
      const id = decodeURIComponent(href.slice(1))
      if (!panelTarget(id)) return
      event.preventDefault()
      if (window.location.hash !== href) history.pushState(null, '', href)
      requestReveal(id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [panelTarget, requestReveal])

  /**
   * Scroll once the list has its full height. While it is still expanding, the
   * page below the toggle is shorter than it will be and a scroll aimed deep
   * into the list would stop short, so this waits for the height transition
   * itself to finish — no guessed delay. Under reduced motion (or when already
   * open) there is no transition and it scrolls at once.
   *
   * The destination is the target's layout position, not its on-screen one:
   * the fade-in wrapper around this list may still be sliding up (a transform)
   * when the scroll starts, and aiming at where it is mid-slide lands short.
   * `scrollTo` with no `behavior` follows the CSS `scroll-behavior` (and its
   * reduced-motion override), and the target's `scroll-margin-top` keeps its
   * heading clear of the fixed nav. Focus moves to the group, as native
   * fragment navigation would, so the next Tab continues from there.
   */
  useEffect(() => {
    if (!reveal || !open) return
    const panel = panelRef.current
    const target = panelTarget(reveal.id)
    if (!panel || !target) return
    let cancelled = false
    // `getAnimations()` flushes style, so the transition just triggered by
    // opening is already listed here.
    const expanding = panel
      .getAnimations()
      .filter((animation) => (animation as CSSTransition).transitionProperty === 'grid-template-rows')
    Promise.all(expanding.map((animation) => animation.finished)).then(
      () => {
        if (cancelled) return
        target.focus({ preventScroll: true })
        // offsetTop ignores transforms, so this is where the target rests.
        let top = 0
        for (let node: HTMLElement | null = target; node; node = node.offsetParent as HTMLElement | null) {
          top += node.offsetTop
        }
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
        window.scrollTo({ top: Math.max(0, top - margin) })
      },
      // Cancelled (closed again mid-way): nothing to scroll to.
      () => {},
    )
    return () => {
      cancelled = true
    }
  }, [reveal, open, panelTarget])

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => {
            // The toggle never scrolls: drop any earlier card's pending request.
            setReveal(null)
            setOpen((value) => !value)
          }}
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
