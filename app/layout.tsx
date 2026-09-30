import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootRecovery from "./components/BootRecovery";
import ClientHealth from "./components/ClientHealth";
import MotionPreferences from "./components/MotionPreferences";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // Text stays readable while the webfont loads rather than flashing invisible.
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://aicmode-portfolio.vercel.app";

const title = "AIC｜AIシステム開発・業務自動化・API連携で、面倒な仕事をラクにします。";
const description =
  "AIシステム開発・業務自動化・API連携を行うAICのポートフォリオです。毎日の繰り返し作業、情報整理、問い合わせ対応など、時間のかかる仕事をAIやシステムを使って効率化します。看護師として約9年間働いた経験を活かし、医療・介護分野の業務改善にも対応できます。鹿児島を拠点に活動しています。";

export const metadata: Metadata = {
  // Required for relative OG / canonical URLs to resolve to absolute ones.
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "AIC",
  // Search keywords, not page copy: these are the words people type, so the
  // industry terms stay here even though none of them appear on the page.
  keywords: [
    "AI 業務効率化",
    "業務自動化",
    "AI 導入 相談",
    "AIシステム開発",
    "API連携",
    "RAG 開発",
    "Webアプリ開発",
    "業務システム 開発",
    "Next.js TypeScript 開発",
    "医療 業務改善",
    "介護 業務改善",
    "フリーランス エンジニア",
    "ホームページ制作",
    "鹿児島 Web制作",
    "AIC",
  ],
  authors: [{ name: "AIC", url: SITE_URL }],
  creator: "AIC",
  publisher: "AIC",
  // No `alternates.canonical` here: a canonical set on the root layout is
  // inherited by every route that forgets its own (including not-found), and
  // would point them all at the home page. Each page declares its own.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AIC",
    locale: "ja_JP",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Matches the tag Next.js emits by default; pinned explicitly so the mobile
// layout can never regress if that default changes.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-[#080808] text-[#f0f0f0] antialiased min-h-screen">
        {/* Inlined into the document, so it survives a failed asset chunk. */}
        <BootRecovery />
        <ClientHealth />
        {/* First tab stop: lets a keyboard user jump the fixed nav. */}
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <MotionPreferences>{children}</MotionPreferences>
      </body>
    </html>
  );
}
