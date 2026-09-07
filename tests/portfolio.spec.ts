import { expect, test, type Page } from 'playwright/test'

/** Defaults to the usual dev port; override when a dev server is already on it. */
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

function collectRuntimeErrors(page: Page) {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  return errors
}

test.describe('short sales landing page', () => {
  test('shows only the six sales sections and keeps the primary routes clear', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

    await expect(page).toHaveTitle('AIC｜AIを使って、面倒な仕事をラクにします。')
    const sectionIds = await page.locator('main#main > section').evaluateAll((sections) =>
      sections.map((section) => section.id),
    )
    expect(sectionIds).toEqual([
      'top',
      'services',
      'healthcare',
      'works',
      'about',
      'contact',
    ])

    const hero = page.locator('#top')
    await expect(hero).toContainText('医療・介護にも対応できます。')
    await expect(hero).toContainText('AIを使って、')
    await expect(hero).toContainText('作業の自動化')
    await expect(hero).toContainText('AIを使ったツール')
    await expect(hero).toContainText('仕事用のWebアプリ')

    await expect(page.locator('#services article')).toHaveCount(3)
    await expect(page.locator('#services')).toContainText('面倒な仕事を自動化する')
    await expect(page.locator('#services')).toContainText('AIを使った便利なツールを作る')
    await expect(page.locator('#services')).toContainText('仕事に合ったWebアプリを作る')
    await expect(page.getByRole('link', { name: 'できることを詳しく見る' })).toHaveAttribute('href', '/services')

    await expect(page.locator('#healthcare')).toContainText('看護師として約9年間働いた経験')
    await expect(page.getByRole('link', { name: '医療・介護について詳しく見る' })).toHaveAttribute('href', '/healthcare')

    // AI・業務自動化 first and larger, Web制作 second: the order is the claim
    // the page makes about what this portfolio is, so it is asserted here.
    const works = page.locator('#works')
    const groupHeadings = await works.locator('h3').allTextContents()
    expect(groupHeadings).toEqual(['AI・業務自動化', 'Web制作'])

    // Every AI / automation piece lives here now — the ones that used to be
    // reachable only from the archive included, since /works is web-only.
    const featured = works.locator('article')
    await expect(featured).toHaveCount(8)
    for (const title of [
      'MediBrief',
      'AI LINE Inquiry Assistant',
      'AI Real Estate Matcher',
      'MediChart Lite',
      'Handover Maker',
      'MedDose',
      'Meta Ad Library Monitor',
      'Nurse FUKUGYO Lab',
    ]) {
      await expect(featured.getByRole('heading', { name: title, exact: true })).toBeVisible()
    }
    expect((await featured.locator('h4').allTextContents()).slice(0, 3)).toEqual([
      'MediBrief',
      'AI LINE Inquiry Assistant',
      'AI Real Estate Matcher',
    ])

    const matcherCard = featured.filter({
      has: page.getByRole('heading', { name: 'AI Real Estate Matcher', exact: true }),
    })
    await expect(matcherCard).toContainText('不動産 × AI × 業務支援')
    await expect(matcherCard).toContainText('自主制作 ・ 公開中')
    await expect(matcherCard.getByRole('link', { name: '詳細を見る' })).toHaveAttribute(
      'href',
      '/works/ai-real-estate-matcher',
    )
    await expect(matcherCard.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://ai-real-estate-matcher.vercel.app',
    )
    await expect(matcherCard.getByRole('link', { name: /GitHubで見る/ })).toHaveAttribute(
      'href',
      'https://github.com/aicmode/ai-real-estate-matcher',
    )

    const nurseCard = featured.filter({
      has: page.getByRole('heading', { name: 'Nurse FUKUGYO Lab', exact: true }),
    })
    await expect(nurseCard.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://aicmode.github.io/NURSE-FUKUGYO-LAB/',
    )
    await expect(page.locator('#works').getByText(/自主制作/).first()).toBeVisible()
    await expect(page.locator('#works').getByText(/試作品（実機で動作確認済み）/)).toBeVisible()
    // /works is the web gallery, so the only link to it is the web one, and
    // its count is the web count — never the whole portfolio's.
    await expect(page.getByRole('link', { name: 'Web制作の実績を見る（21件）' })).toHaveAttribute(
      'href',
      '/works#archive',
    )
    await expect(page.getByRole('link', { name: /すべての制作実績を見る/ })).toHaveCount(0)

    const profile = page.locator('#about')
    await expect(profile).toContainText('看護師として約9年')
    await expect(profile).toContainText('ご相談から制作、公開まで一人で担当します。')
    const profileImage = profile.getByAltText('AICのプロフィール写真')
    await expect(profileImage).toBeVisible()
    await profileImage.scrollIntoViewIfNeeded()
    await expect.poll(() => profileImage.evaluate((image: HTMLImageElement) => image.complete)).toBe(true)
    const profileImageState = await profileImage.evaluate((image: HTMLImageElement) => ({
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      objectFit: getComputedStyle(image).objectFit,
    }))
    expect(profileImageState.naturalWidth).toBeGreaterThan(0)
    expect(profileImageState.naturalHeight).toBeGreaterThan(0)
    expect(profileImageState.objectFit).toBe('cover')
    await expect(profile.getByRole('link', { name: '自己紹介を詳しく見る' })).toHaveAttribute('href', '/about')

    await expect(page.locator('#contact')).toContainText('まずは困っていることを教えてください。')
    const line = page.getByRole('link', { name: /LINEで相談する/ })
    await expect(line).toHaveAttribute('href', 'https://line.me/R/ti/p/@862povmk')
    await expect(line).toHaveAttribute('target', '_blank')
    await expect(line).toHaveAttribute('rel', /noopener/)
    const github = page.getByRole('link', { name: /GitHubで制作内容を見る/ })
    await expect(github).toHaveAttribute('href', 'https://github.com/aicmode')

    await expect(page.getByText('お困りごとから探す')).toHaveCount(0)
    await expect(page.getByText('お渡しできるもの')).toHaveCount(0)
    await expect(page.getByText('得意なこと')).toHaveCount(0)
    await expect(page.getByText('使える技術の一覧')).toHaveCount(0)
    await expect(page.getByText('ご相談前によくいただく質問')).toHaveCount(0)

    const navLabels = await page.locator('nav > div').first().getByRole('link').allTextContents()
    expect(navLabels.map((label) => label.trim())).toEqual([
      'AIC',
      'できること',
      '制作実績',
      '医療・介護',
      '自己紹介',
      'よくある質問',
      'お問い合わせ',
    ])

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    expect(pageHeight).toBeLessThan(12000)
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(1200)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    await page.screenshot({ path: '/tmp/aicmode-home-pc.png', fullPage: true })
    expect(runtimeErrors).toEqual([])
  })

  test('fits a phone viewport without horizontal overflow', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
    }))
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
    expect(dimensions.height).toBeLessThan(22000)
    await expect(page.locator('#works article')).toHaveCount(8)

    await page.getByRole('button', { name: 'メニューを開く' }).click()
    await expect(page.getByRole('link', { name: 'お問い合わせ', exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'お問い合わせ', exact: true }).click()
    await expect(page.locator('#contact')).toBeInViewport()
    await page.waitForTimeout(1200)
    await page.screenshot({ path: '/tmp/aicmode-home-mobile.png', fullPage: true })
    expect(runtimeErrors).toEqual([])
  })
})

test.describe('detail pages retain the removed information', () => {
  test('services retains problem and deliverable details', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`)
    await expect(page.getByText('お困りごとから探す', { exact: true })).toBeVisible()
    await expect(page.getByText('お渡しできるもの', { exact: true })).toBeVisible()
    await expect(page.locator('#services article')).toHaveCount(3)
  })

  test('healthcare retains all four safety and workflow points', async ({ page }) => {
    await page.goto(`${BASE_URL}/healthcare`)
    for (const text of ['現場の流れが分かります', '医療の言葉が分かります', '安全を最優先にします', '先に確認してから作ります']) {
      await expect(page.getByText(text)).toBeVisible()
    }
  })

  test('works is the web gallery: 21 web records and no AI work', async ({ page }) => {
    await page.goto(`${BASE_URL}/works`, { waitUntil: 'networkidle' })

    await expect(page).toHaveTitle('Web制作実績｜AIC')
    // The AI case-study section belongs to the top page now.
    await expect(page.locator('#case-studies')).toHaveCount(0)
    await expect(page.locator('#archive article')).toHaveCount(21)
    await expect(page.locator('#archive')).toContainText('全21件')

    // None of the AI / automation work is listed here.
    for (const title of [
      'MediBrief',
      'AI LINE Inquiry Assistant',
      'MediChart Lite',
      'Handover Maker',
      'MedDose',
      'Meta Ad Library Monitor',
    ]) {
      await expect(page.getByRole('heading', { name: title, exact: true })).toHaveCount(0)
    }
  })

  test('the archive filters by the web categories that exist in the data', async ({ page }) => {
    await page.goto(`${BASE_URL}/works`, { waitUntil: 'networkidle' })

    // One row of tabs, and no 大分類 row: the page is a single domain.
    await expect(page.getByRole('group', { name: '大きな分類で絞り込み' })).toHaveCount(0)
    const tabs = page.getByRole('group', { name: 'Web制作の種類で絞り込み' })
    const tabLabels = await tabs.getByRole('button').allTextContents()
    expect(tabLabels.map((label) => label.replace(/[0-9]+$/, '').trim())).toEqual([
      'すべて',
      'ホームページ',
      '1ページの紹介サイト',
      'ネットショップ',
    ])
    await expect(tabs.getByRole('button', { name: /AI・業務自動化/ })).toHaveCount(0)

    for (const [label, count] of [
      ['ホームページ', 5],
      ['1ページの紹介サイト', 11],
      ['ネットショップ', 5],
    ] as const) {
      await tabs.getByRole('button', { name: new RegExp(`^${label}`) }).click()
      await expect(page.locator('#archive article')).toHaveCount(count)
    }

    await tabs.getByRole('button', { name: /^すべて/ }).click()
    await expect(page.locator('#archive article')).toHaveCount(21)

    const nurse = page.locator('#archive article').filter({
      has: page.getByRole('heading', { name: 'Nurse FUKUGYO Lab', exact: true }),
    })
    await expect(nurse).toHaveCount(1)
    await expect(nurse.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
      'href',
      'https://aicmode.github.io/NURSE-FUKUGYO-LAB/',
    )

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
  })

  test('Handover Maker keeps its card, links, and responsive layout on the top page', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 })
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

      const handoverCard = page.locator('#works article').filter({
        has: page.getByRole('heading', { name: 'Handover Maker', exact: true }),
      })
      await expect(handoverCard).toHaveCount(1)
      await expect(handoverCard).toContainText('完全オフライン対応ツール')
      await expect(handoverCard.getByRole('link', { name: /実際に見る/ })).toHaveAttribute(
        'href',
        'https://aicmode.github.io/offline-handover/',
      )
      await expect(handoverCard.getByRole('link', { name: /GitHubで見る/ })).toHaveAttribute(
        'href',
        'https://github.com/aicmode/offline-handover',
      )

      const cardImage = handoverCard.getByAltText(/申し送りメーカーVer2\.0/)
      await handoverCard.scrollIntoViewIfNeeded()
      await expect(cardImage).toBeVisible()
      await expect.poll(() => cardImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)

      await page.screenshot({ path: `/tmp/aicmode-handover-card-${width}.png` })

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
    }

    expect(runtimeErrors).toEqual([])
  })

  test('the AI detail pages are still reachable and intact', async ({ page }) => {
    for (const path of ['/works/meddose', '/works/meta-ad-library-monitor', '/works/ai-real-estate-matcher']) {
      const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' })
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toBeVisible()
    }

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })
    const adMonitor = page.locator('#works article').filter({
      has: page.getByRole('heading', { name: 'Meta Ad Library Monitor', exact: true }),
    })
    await expect(adMonitor.getByRole('link', { name: '詳細を見る' })).toHaveAttribute(
      'href',
      '/works/meta-ad-library-monitor',
    )
  })

  test('AI Real Estate Matcher detail keeps the requested content and links', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 })
      const response = await page.goto(`${BASE_URL}/works/ai-real-estate-matcher`, { waitUntil: 'networkidle' })
      expect(response?.status()).toBe(200)

      await expect(page.getByRole('heading', { name: 'AI Real Estate Matcher', exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: '課題', exact: true })).toBeAttached()
      await expect(page.getByRole('heading', { name: '解決', exact: true })).toBeAttached()
      await expect(page.getByRole('heading', { name: '特徴', exact: true })).toBeAttached()
      await expect(page.getByRole('heading', { name: '技術的ポイント', exact: true })).toBeAttached()
      await expect(page.getByText('全国47都道府県・架空188物件のSupabase PostgreSQLデータベース', { exact: false })).toBeAttached()
      await expect(page.getByText('業務ロジックを組み合わせた選定フロー')).toBeAttached()

      await expect(page.getByRole('link', { name: /実際に見る/ }).first()).toHaveAttribute(
        'href',
        'https://ai-real-estate-matcher.vercel.app',
      )
      await expect(page.getByRole('link', { name: /GitHubで見る/ }).first()).toHaveAttribute(
        'href',
        'https://github.com/aicmode/ai-real-estate-matcher',
      )
      await expect(page.locator('img')).toHaveCount(2)

      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(dimensions.scrollWidth).toBe(dimensions.clientWidth)
      await page.screenshot({ path: `/tmp/aicmode-real-estate-detail-${width}.png`, fullPage: true })
    }

    expect(runtimeErrors).toEqual([])
  })

  test('about retains profile, strengths, values, and skills', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`)
    await expect(page.getByText('とくに得意な6つのこと')).toBeVisible()
    await expect(page.getByText('大切にしていること', { exact: true })).toBeVisible()
    await expect(page.getByText('使える技術の一覧')).toBeVisible()
    await expect(page.getByText('考え方・進め方')).toBeVisible()
  })

  test('FAQ retains all ten answers', async ({ page }) => {
    await page.goto(`${BASE_URL}/faq`)
    await expect(page.locator('#faq h3')).toHaveCount(10)
    await expect(page.getByText('何を作るか決まっていなくても相談できますか？')).toBeVisible()
  })

  test('contact retains inquiry examples and checklist', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`)
    await expect(page.locator('#process')).toContainText('ご相談から公開まで')
    await expect(page.locator('#process h3')).toHaveCount(5)
    await expect(page.getByText('こんなご相談が多いです')).toBeVisible()
    await expect(page.getByText('お伝えいただきたいこと')).toBeVisible()
    await expect(page.getByRole('link', { name: /LINE公式アカウント/ })).toHaveAttribute(
      'href',
      'https://line.me/R/ti/p/@862povmk',
    )
  })
})
