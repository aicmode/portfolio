import { caseStudies } from './caseStudies'
import { projects } from './projects'

/**
 * The pieces the /healthcare page links to, read from the same entries the
 * work pages render, so the summary shown there can never drift from the work.
 *
 * Chosen by what the piece is for, not by keyword: two tools for records and
 * handovers on the ward or in care, and one for getting ready for a doctor's
 * visit. Nurse FUKUGYO Lab is about nurses' careers, not care work, so it is
 * not listed here. Shared with the page's JSON-LD.
 */
const HEALTHCARE_WORK_IDS = ['handover-maker', 'medichart-lite', 'medibrief-ai'] as const

export type HealthcareWork = {
  id: string
  title: string
  subtitle: string
  plainSummary: string
  detailPath: string
}

const entries = [...projects, ...caseStudies]

export const healthcareWorks: readonly HealthcareWork[] = HEALTHCARE_WORK_IDS.flatMap((id) => {
  const entry = entries.find((candidate) => candidate.id === id)
  if (!entry?.detailPath || !entry.plainSummary) return []
  const { title, subtitle, plainSummary, detailPath } = entry
  return [{ id, title, subtitle, plainSummary, detailPath }]
})
