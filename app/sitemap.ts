import type { MetadataRoute } from 'next'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

/**
 * The home page plus the project pages that have their own route. `lastModified`
 * is intentionally omitted rather than stamped with build time: a rebuild does
 * not mean the content changed, and a date that moves on every deploy is noise
 * for a crawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/works/enterprise-rag-knowledge-ai`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/works/ai-construction-estimate`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/works/ai-line-inquiry-assistant`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/works/ai-real-estate-matcher`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/works/meddose`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/works/meta-ad-library-monitor`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...['services', 'healthcare', 'works', 'about', 'faq', 'contact'].map((path) => ({
      url: `${SITE_URL}/${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === 'works' ? 0.9 : 0.7,
    })),
  ]
}
