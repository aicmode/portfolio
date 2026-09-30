import type { Metadata } from "next";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HomeServices from "./components/HomeServices";
import HomeHealthcare from "./components/HomeHealthcare";
import FeaturedWorks from "./components/FeaturedWorks";
import HomeAbout from "./components/HomeAbout";
import HomeContact from "./components/HomeContact";
import Footer from "./components/Footer";
import { services } from "./data/services";
import { caseStudies } from "./data/caseStudies";
import { LIVE_LINK_PAUSED, projects } from "./data/projects";

const SITE_URL = "https://aicmode-portfolio.vercel.app";
const GITHUB_URL = "https://github.com/aicmode";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * A portfolio piece's links for JSON-LD: its own page on this site when it has
 * one, with the external demo as `sameAs` — the same shape the detail pages
 * emit. Pieces without a page fall back to the demo itself.
 */
function workLinks(detailPath?: string, liveUrl?: string) {
  if (detailPath) {
    return { url: `${SITE_URL}${detailPath}`, ...(liveUrl ? { sameAs: liveUrl } : {}) };
  }
  return liveUrl ? { url: liveUrl } : {};
}

/**
 * Structured data, built from the same arrays the page renders, so the two can
 * never describe different things.
 *
 * Person + ProfessionalService, not Organization: this is one freelance
 * developer, and there is no registered company, address, phone number or
 * review to describe. Nothing about pricing, ratings, aggregate reviews or
 * client counts appears here — inventing any of that is exactly the kind of
 * structured-data claim search engines penalise, and it would be untrue.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AIC",
      alternateName: "AIC｜AIを使って、面倒な仕事をラクにします。",
      description:
        "毎日の繰り返し作業、情報整理、問い合わせ対応など、時間のかかる仕事をAIやシステムで効率化します。看護師として約9年間働いた経験を活かし、医療・介護分野の業務改善にも対応します。",
      inLanguage: "ja-JP",
      publisher: { "@id": `${SITE_URL}/#aicmode` },
      about: { "@id": `${SITE_URL}/#service` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#aicmode`,
      name: "AIC",
      // The name shown next to the profile photo in the About section.
      alternateName: "KAITO",
      url: SITE_URL,
      image: `${SITE_URL}/images/profile/profile-kaito.png`,
      jobTitle: "AI・システム開発",
      description:
        "看護師として約9年間働いた経験を生かし、業務の自動化、AIを使ったツール、仕事用のWebアプリを、相談から公開まで一人で担当します。",
      knowsAbout: [
        "AI Systems Development",
        "Business Automation",
        "Workflow Automation",
        "Web Application Development",
        "API Integration",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Search",
        "OCR",
        "Prompt Engineering",
        "Dashboard Development",
        "Web Design",
        "Responsive Design",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Python",
        "Flask",
        "Node.js",
        "Express",
        "REST API",
        "PostgreSQL",
        "pgvector",
        "OpenAI API",
        "OpenAI Embeddings",
        "Whisper API",
        "Dify API",
        "Google APIs",
        "Google Apps Script",
        "LINE Messaging API",
        "Slack API",
        "Discord API",
        "Webhook",
        "Git",
        "GitHub",
        "Vercel",
      ],
      knowsLanguage: ["ja", "en"],
      sameAs: [GITHUB_URL],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "AIC",
      description:
        "面倒な仕事の自動化、AIを使ったツールの制作、仕事に合わせたWebアプリの開発、医療・介護分野の業務改善、ホームページ制作を行います。",
      url: SITE_URL,
      areaServed: "JP",
      availableLanguage: ["ja", "en"],
      provider: { "@id": `${SITE_URL}/#aicmode` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Development, Automation & Web Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${SITE_URL}/#service-${service.id}` },
        })),
      },
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `${SITE_URL}/#service-${service.id}`,
      name: service.name,
      serviceType: service.type,
      description: service.description,
      areaServed: "JP",
      provider: { "@id": `${SITE_URL}/#aicmode` },
    })),
    // Portfolio pieces are CreativeWork, and `creator` is the only relationship
    // asserted — never a client, sponsor or customer, because there is none.
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#case-studies`,
      name: "AI & Automation Case Studies",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: study.title,
          description: study.solution,
          creator: { "@id": `${SITE_URL}/#aicmode` },
          keywords: study.stack.join(", "),
          ...workLinks(study.detailPath, study.liveUrl),
          ...(study.githubUrl ? { codeRepository: study.githubUrl } : {}),
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#works`,
      name: "Portfolio Projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          creator: { "@id": `${SITE_URL}/#aicmode` },
          keywords: project.stack.join(", "),
          // A paused demo is withheld here exactly as it is on the page.
          ...workLinks(
            project.detailPath,
            LIVE_LINK_PAUSED.has(project.id) ? undefined : project.liveUrl,
          ),
          ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <HomeServices />
        <HomeHealthcare />
        <FeaturedWorks />
        <HomeAbout />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
