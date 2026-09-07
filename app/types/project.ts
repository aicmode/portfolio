/**
 * Shared vocabulary for everything shown in Works, Selected Works and the
 * AI & Automation case studies.
 *
 * Status and project type are enums rather than free text on purpose: a
 * prospective client has to be able to tell, at a glance and without ambiguity,
 * whether something is a live deployment, source code, or a design study — and
 * whether it was a paid client engagement or self-directed work. Labels live in
 * one place (`STATUS_LABEL`, `STATUS_CTA`) so a card, a modal and the archive
 * can never disagree about the same project.
 */

/** Where the work currently lives, verified against the real URL. */
export type ProjectStatus =
  /** Publicly reachable and returning 200 at the time of writing. */
  | 'released'
  /** Designed and documented, no running deployment. */
  | 'case-study'
  /** Built while following a course curriculum, publicly reachable. */
  | 'training'
  /** Was deployed, currently not reachable. */
  | 'temporary-unavailable'
  /** Finished code that has not been deployed yet. */
  | 'deployment-required'
  /** Runs locally / needs its own API keys; only the source is public. */
  | 'source-only'
  /**
   * A working build that runs on real hardware but is not distributed: no store
   * listing, no hosted demo. Kept separate from `source-only` so a device app
   * that has actually been installed and used is not read as untested code, and
   * separate from `released` so it can never be mistaken for a shipped product.
   */
  | 'prototype'

/**
 * How the work came about. Deliberately has no "Client Project" member: every
 * item currently in this portfolio is self-directed or course work, and adding
 * that member would invite mislabelling.
 */
export type ProjectType =
  | 'Self-directed Project'
  | 'Personal Project'
  | 'Training Project'
  | 'Concept Project'
  | 'Architecture Study'

export type Category =
  | 'AI Systems'
  | 'Automation'
  | 'Web Applications'
  | 'Websites'
  | 'Landing Pages'
  | 'EC'

/**
 * The two things this portfolio is read for, in the order they should be read.
 *
 * `Domain` sits above `Category` rather than replacing it: the existing
 * categories stay exactly as they are and keep driving the cards, while the
 * domain answers the only question a first-time visitor has — is this person an
 * AI/automation developer, or a web producer? The answer is "AI and automation
 * first, web production as a second skill", and `DOMAIN_ORDER` is where that
 * order is stated once for every surface that renders it.
 */
export type Domain = 'AI & Automation' | 'Web Production'

/** MAIN before SUB. Every domain-aware list renders in this order. */
export const DOMAIN_ORDER: readonly Domain[] = ['AI & Automation', 'Web Production']

/** Japanese label for a domain, used wherever a visitor reads one. */
export const DOMAIN_LABEL: Record<Domain, string> = {
  'AI & Automation': 'AI・業務自動化',
  'Web Production': 'Web制作',
}

/**
 * Which domain a category belongs to. One map, so a category can never be
 * counted under one heading and listed under another.
 *
 * `Web Applications` is deliberately on the AI/automation side: those are
 * business tools built to remove manual work, not web production.
 */
export const CATEGORY_DOMAIN: Record<Category, Domain> = {
  'AI Systems': 'AI & Automation',
  Automation: 'AI & Automation',
  'Web Applications': 'AI & Automation',
  Websites: 'Web Production',
  'Landing Pages': 'Web Production',
  EC: 'Web Production',
}

/**
 * The archive's "show everything" tab. It is deliberately not a `Category`
 * member — no project carries it — so it lives here as one constant that both
 * the tab list and the filter compare against, and can never drift into a
 * string that matches nothing.
 */
export const ALL_FILTER = 'All'

/** A tab in the Works Archive: every category, plus "All". */
export type Filter = typeof ALL_FILTER | Category

/** The archive's top-level tab: one domain, or everything. */
export type DomainFilter = typeof ALL_FILTER | Domain

/**
 * Everything a visitor reads is Japanese, and plain: the enum member stays in
 * English because it is a key in the code, never something shown on screen.
 */
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  released: '公開中',
  'case-study': '設計のみ（企画書を公開）',
  training: '公開中',
  'temporary-unavailable': '公開を一時停止中',
  'deployment-required': '完成済み・未公開',
  'source-only': '手元で動かす形（内容を公開）',
  prototype: '試作品（実機で動作確認済み）',
}

/**
 * Default label for the primary button. A project may override it, but the
 * default already keeps the promise honest: nothing that has no reachable
 * deployment can end up offering "実際に見る".
 */
export const STATUS_CTA: Record<ProjectStatus, string> = {
  released: '実際に見る',
  'case-study': '内容を見る',
  training: '実際に見る',
  'temporary-unavailable': '中身を見る',
  'deployment-required': '中身を見る',
  'source-only': '中身を見る',
  prototype: '中身を見る',
}

/** Japanese label for a category, used wherever a visitor reads one. */
export const CATEGORY_LABEL: Record<Category, string> = {
  'AI Systems': 'AIのしくみ',
  Automation: '作業の自動化',
  'Web Applications': '仕事用アプリ',
  Websites: 'ホームページ',
  'Landing Pages': '1ページの紹介サイト',
  EC: 'ネットショップ',
}

/** Japanese label for how the work came about. */
export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  'Self-directed Project': '自主制作',
  'Personal Project': '自主制作',
  'Training Project': '学習のための制作',
  'Concept Project': 'デザイン提案として制作',
  'Architecture Study': '設計のみ',
}

/** Japanese label for the archive's "show everything" tab. */
export const ALL_FILTER_LABEL = 'すべて'

/** One place that turns any filter value into the word a visitor reads. */
export function filterLabel(filter: Filter) {
  return filter === ALL_FILTER ? ALL_FILTER_LABEL : CATEGORY_LABEL[filter]
}

/** The same, for the top-level domain tabs. */
export function domainFilterLabel(filter: DomainFilter) {
  return filter === ALL_FILTER ? ALL_FILTER_LABEL : DOMAIN_LABEL[filter]
}

/** True when the status means there is something live to open. */
export function hasLiveDemo(status: ProjectStatus) {
  return status === 'released' || status === 'training'
}

/**
 * One capture in a project's screen-flow gallery.
 *
 * `width` / `height` are the file's real pixel size and are required, not
 * decorative: the frame derives its aspect ratio from them, so a capture from a
 * device with its own proportions (a watch, a phone) is never stretched or
 * cropped to fit a ratio the layout happens to prefer.
 */
export type GalleryImage = {
  src: string
  /** Alt text — describes what the screen shows, not that it is a screenshot. */
  alt: string
  /** Caption printed under the frame, in the site's language. */
  caption: string
  width: number
  height: number
}

/** An optional section appended to the shared work-detail dialog. */
export type ProjectDetailSection = {
  title: string
  body?: string
  items?: readonly string[]
}

/** A portfolio piece in Selected Works / Works Archive. */
export type Project = {
  id: string
  title: string
  /** Small line above the title. Holds the original product name, if any. */
  subtitle: string
  /** Longer descriptor line, kept from the original cards. */
  category: string
  /**
   * One plain sentence, shown on the card before anything technical: what the
   * thing does, in words someone outside the industry already uses.
   */
  plainSummary: string
  /** 2–3 lines: who it is for, what was built, how it is used. */
  summary: string
  /** One sentence: the situation the work addresses. */
  problem: string
  /** One sentence: what was built in response. */
  solution: string
  features: readonly string[]
  /** Optional safety boundary for demos in regulated or sensitive domains. */
  safety?: string
  /**
   * What was actually verified — never a projected or quantified business
   * result, which nothing here has earned the right to claim.
   */
  outcome?: readonly string[]
  /** Work personally completed for this project. */
  role?: readonly string[]
  group: Category
  projectType: ProjectType
  status: ProjectStatus
  /** Shown beside the status when the plain label leaves out something material. */
  statusNote?: string
  stack: readonly string[]
  tags?: readonly string[]
  /** Design label kept from the original cards (palette / build notes). */
  colorLabel: string
  accent: string
  tint: string
  image: string
  imageAlt?: string
  imagePosition?: string
  /**
   * How the poster image sits in the shared 16/10 frame. Cards are one size for
   * everything, so a capture that is not landscape gets `contain` and keeps its
   * own proportions inside that frame rather than being cropped to fill it.
   */
  imageFit?: 'cover' | 'contain'
  /** Ordered screen flow shown in the detail dialog instead of the single hero. */
  gallery?: readonly GalleryImage[]
  /** Intro line above the gallery, e.g. where the captures were taken. */
  galleryNote?: string
  /** Optional introduction shown before Problem in the shared detail dialog. */
  overview?: string
  /** Project-specific explanations rendered with the dialog's shared section UI. */
  detailSections?: readonly ProjectDetailSection[]
  liveUrl?: string
  githubUrl?: string
  /**
   * Route of a full detail page inside this site, when the project has one.
   *
   * Set it and the card's primary action becomes 「詳細を見る」 pointing here,
   * in the same tab, instead of an external target — the honest primary read
   * for work that has no reachable deployment to offer. The in-page dialog is
   * dropped for that card only: the page it links to is the longer version of
   * the same content, so keeping both would be two controls for one job.
   * Projects without the field keep the dialog and their existing CTA.
   */
  detailPath?: string
  /** Optional primary-card CTA copy when the default status label is too generic. */
  ctaLabel?: string
  /** Show a source link beside the primary CTA on the work card. */
  showGithubOnCard?: boolean
  /**
   * The date this piece was added to the portfolio, `YYYY-MM-DD`.
   *
   * The AI・業務自動化 section reads newest first, and this is the only thing
   * that decides that order: a new piece is added with today's date and lands
   * at the top on its own, with nothing else reordered by hand. `order` keeps
   * its existing job — the curated Selected Works list and the web archive.
   */
  addedOn?: string
  /** Lower numbers appear first; also drives Selected Works. */
  order: number
  featured?: boolean
  year: number
  /** Card treatments defined in globals.css. */
  variant?: 'special' | 'kissa' | 'greenroot' | 'blackline' | 'velvet'
  wide?: boolean
}

/** An AI / automation build documented as a full case study. */
export type CaseStudy = {
  id: string
  title: string
  /** Small line above the title. Holds the original product name, if any. */
  subtitle: string
  /**
   * One plain sentence, shown on the card before anything technical: what the
   * thing does, in words someone outside the industry already uses.
   */
  plainSummary: string
  group: Category
  projectType: ProjectType
  /** Work personally completed for this project; kept factual per repository documentation. */
  role: readonly string[]
  status: ProjectStatus
  /** Shown under the status when the deployment has a caveat worth stating. */
  statusNote?: string
  problem: string
  solution: string
  features: readonly string[]
  /**
   * The three things the card lists, in plain Japanese. `features` keeps the
   * precise wording for the detail dialog, where the technical vocabulary is
   * what a reader has asked for.
   */
  plainFeatures: readonly string[]
  stack: readonly string[]
  accent: string
  detail: {
    goal: string
    proposedSolution: readonly string[]
    mvpScope: readonly string[]
    phase2: readonly string[]
    architecture: readonly string[]
    security: readonly string[]
    /** Intent, never a fabricated metric. */
    expectedImpact: readonly string[]
  }
  liveUrl?: string
  githubUrl?: string
  screenshot?: string
  screenshotAlt?: string
  /**
   * The date this piece was added to the portfolio, `YYYY-MM-DD`.
   *
   * The AI・業務自動化 section reads newest first, and this is the only thing
   * that decides that order: a new piece is added with today's date and lands
   * at the top on its own, with nothing else reordered by hand. `order` keeps
   * its existing job — the curated Selected Works list and the web archive.
   */
  addedOn?: string
  order: number
  year: number
}
