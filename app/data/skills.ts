/**
 * Skills, grouped so a client can find what they were looking for.
 *
 * Inclusion rule: every entry is traceable to a public repository under
 * github.com/aicmode, to this codebase, or to a build actually stood up and
 * verified in a real environment. Notably NOT listed, because there is no
 * implementation to back them yet: Supabase and other unverified services.
 */

export type TechSkill = { label: string; icon: string }

export type SkillGroupData = {
  title: string
  /** Why a client would care about this group. */
  note: string
  items: readonly TechSkill[]
  /**
   * Optional line under the cards, for a group where one card needs context the
   * card itself has no room for (e.g. which AWS services, and to what depth).
   */
  caption?: string
}

export const skillGroups: readonly SkillGroupData[] = [
  {
    title: '画面まわり',
    note: '見た目と使いやすさ',
    items: [
      { label: 'HTML', icon: '</>' },
      { label: 'CSS', icon: '{ }' },
      { label: 'JavaScript', icon: 'JS' },
      { label: 'TypeScript', icon: 'TS' },
      { label: 'React', icon: '◎' },
      { label: 'Next.js', icon: 'N' },
      { label: 'Tailwind CSS', icon: '≋' },
      { label: 'Framer Motion', icon: '∿' },
      { label: 'Recharts', icon: '▥' },
      { label: 'スマホ対応', icon: '▤' },
    ],
  },
  {
    title: 'データのしくみ',
    note: '情報をためて動かす部分',
    items: [
      { label: 'Node.js', icon: '⬡' },
      { label: 'Express', icon: 'Ex' },
      { label: 'Python', icon: 'Py' },
      { label: 'Flask', icon: 'Fl' },
      { label: 'サービス間のデータ連携', icon: '⇄' },
      { label: 'Google Sheets', icon: '▦' },
      { label: 'ブラウザ内での保存', icon: '▣' },
    ],
  },
  {
    title: 'データベース',
    note: '検索用データを安全にためる部分',
    items: [
      { label: 'PostgreSQL', icon: 'PG' },
      { label: 'Neon', icon: 'N' },
      { label: 'pgvector', icon: '→' },
    ],
    caption: 'NeonのPostgreSQLにpgvectorを導入し、文書のベクトル検索をProduction環境で検証しました。',
  },
  {
    title: 'クラウド・インフラ',
    note: 'サービスを動かすためのクラウド基盤',
    items: [{ label: 'AWS', icon: '⬢' }],
    caption:
      'IAM / S3 / Lambda / EC2 / RDS / CloudWatch / VPC / Security Group — 基礎構築とサービス間連携を実際のAWS環境で検証しました。',
  },
  {
    title: 'AI・RAG',
    note: '社内資料を検索して、根拠付きで答える部分',
    items: [
      { label: 'RAG', icon: 'R' },
      { label: 'OCR', icon: '◫' },
      { label: 'PDF解析', icon: 'PDF' },
      { label: 'Chunking', icon: '≡' },
      { label: 'OpenAI Embeddings', icon: 'E' },
      { label: 'Vector Search', icon: '⌕' },
    ],
    caption:
      'RAG（Retrieval-Augmented Generation）— OCR・PDF解析・Chunking・Embedding・Vector Searchをつなぎ、引用付き回答まで実装しました。',
  },
  {
    title: 'AIと自動化',
    note: 'AIを仕事に組み込む部分',
    items: [
      { label: 'OpenAI API', icon: '✳' },
      { label: 'Whisper API', icon: '◍' },
      { label: 'Dify API', icon: '◈' },
      { label: 'AIへの指示づくり', icon: '⌘' },
      { label: '作業の自動化', icon: '⟳' },
      { label: 'Webからの情報収集', icon: '⌗' },
      { label: 'AIを使った開発', icon: '✧' },
    ],
  },
  {
    title: 'サービス連携',
    note: '今お使いのサービスとつなぐ部分',
    items: [
      { label: 'Google APIs', icon: 'G' },
      { label: 'Google Apps Script', icon: 'GS' },
      { label: 'LINE Messaging API', icon: 'L' },
      { label: 'Slack API', icon: '#' },
      { label: 'Discord API', icon: '◇' },
      { label: 'Gmail API', icon: '✉' },
      { label: '自動通知の受け取り', icon: '↯' },
    ],
  },
  {
    title: '公開と運用',
    note: 'インターネットに出す部分',
    items: [
      { label: 'Git', icon: '⑂' },
      { label: 'GitHub', icon: '⊙' },
      { label: 'Vercel', icon: '▲' },
      { label: 'Render', icon: '◐' },
      { label: 'GitHub Pages', icon: '⊞' },
      { label: 'パスワード類の安全な管理', icon: '⚿' },
      { label: '公開前の動作チェック', icon: '✓' },
    ],
  },
]

/**
 * Ordered for a client reading top-to-bottom: what gets thought about before
 * any code exists comes first, craft comes after.
 */
export const creativeSkills = [
  {
    title: '事業として考える',
    description: '集客・運用・コストまで踏まえ、事業として成立する形を提案。作って終わりにしない。',
    icon: '◫',
  },
  {
    title: '課題を見つけて整理する',
    description: '「何を作るか」の前に「何が課題か」を整理。必要な打ち手だけに絞って形にする。',
    icon: '✦',
  },
  {
    title: 'AIの使いどころを決める',
    description: '仕事のどこにAIを使えば効果が出るかを見きわめ、必要なつながりまで設計する。',
    icon: '⊟',
  },
  {
    title: '自動化の設計',
    description: '手作業・集計・通知・共有を洗い出し、自動化できる工程から仕組み化して人の時間を戻す。',
    icon: '⟳',
  },
  {
    title: '仕事の流れを整理する',
    description: '現場の業務フローを整理し、重複や無駄な工程を削減。運用が続く形に組み直す。',
    icon: '⟐',
  },
  {
    title: '使いやすさの設計',
    description: '使う人の目線で導線と操作性を設計。\nスマホ表示と、迷わせない構成を重視。',
    icon: '⊞',
  },
  {
    title: '見せ方を決める',
    description: 'コンセプト設計からデザイン監修まで担当。\nブランドの魅力を最大限に引き出す方向づけ。',
    icon: '⬒',
  },
  {
    title: 'AIへの指示づくり',
    description: 'AIへの指示を設計し、出力の精度と再現性を安定させる。実務で使える品質まで詰める。',
    icon: '◈',
  },
] as const
