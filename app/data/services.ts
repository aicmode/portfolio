/**
 * Services and capabilities.
 *
 * These two lists deliberately answer different questions and must not repeat
 * each other:
 *   - `services` starts from the client's problem ("we can't keep up with
 *     enquiries") and is what the JSON-LD offer catalog is built from.
 *   - `capabilities` starts from the deliverable ("AI chatbot", "dashboard") —
 *     the concrete thing that gets handed over.
 *
 * Nothing here claims a capability that isn't backed by a public repository
 * (see `caseStudies.ts` and `projects.ts`). RAG / vector search is backed by
 * `enterprise-rag-knowledge-ai` in `projects.ts`.
 */

/** The three things a visitor should remember, in the words they already use. */
export const serviceEntrances = [
  {
    no: '01',
    title: '面倒な仕事を自動化する',
    audience: '毎日おなじ作業に時間を取られている方へ。',
    body: '毎日の集計、文章作成、情報整理、通知などを自動化します。Google・LINE・Slackなど、お使いのサービス同士の連携にも対応します。',
    items: [
      '数字の集計や表への転記',
      '決まった文章の作成',
      '情報の整理と保存',
      '担当者へのお知らせ',
    ],
  },
  {
    no: '02',
    title: 'AIを使った便利なツールを作る',
    audience: '問い合わせ対応や文章の作成に追われている方へ。',
    body: '問い合わせ対応、文章の要約、社内情報の検索など、仕事に合わせたツールを作ります。',
    items: [
      'よくある質問への自動返信',
      '長い文章を短くまとめる',
      '社内の資料をすばやく探す',
      'LINEやチャットへのお知らせ',
    ],
  },
  {
    no: '03',
    title: '仕事に合ったWebアプリを作る',
    audience: '今のソフトが仕事のやり方に合っていない方へ。',
    body: '入力・検索・管理・集計など、必要な機能をまとめた使いやすいアプリを作ります。',
    items: [
      '入力フォームと一覧画面',
      '検索としぼり込み',
      '数字の集計とグラフ',
      'スマホでも使える画面',
    ],
  },
] as const

/** Problem-first. Each `id`/`type` also feeds the Service JSON-LD nodes. */
export const services = [
  {
    id: 'reduce-support-load',
    problem: '問い合わせ対応が追いつかない',
    name: '問い合わせ対応をAIに任せる',
    type: 'AI Support Automation',
    desc: 'よくある質問はAIが答え、人が判断すべきものだけを手元に残します。営業時間外もお客様を待たせません。',
    description:
      'AIチャットによる一次対応と有人対応への引き継ぎを設計し、問い合わせ対応の負担を減らす仕組みを構築します。',
  },
  {
    id: 'automate-manual-work',
    problem: '毎日同じ手作業に時間が消える',
    name: '手作業をなくす',
    type: 'Business Automation',
    desc: '集める、まとめる、知らせる、保存する。決まった手順の作業から順番に自動にしていきます。',
    description:
      '手作業・集計・通知・共有の工程を整理し、APIとスクリプトで自動化するワークフローを設計・実装します。',
  },
  {
    id: 'organize-scattered-information',
    problem: '必要な情報が散らばって探せない',
    name: '情報をひとつにまとめる',
    type: 'Information Consolidation',
    desc: 'あちこちに散らばった情報を1か所に集めて、探せる・絞り込める形に整えます。',
    description:
      '複数ツールに分散した情報を集約し、検索・絞り込み・蓄積ができる状態に整えるシステムを構築します。',
  },
  {
    id: 'visualize-numbers',
    problem: '判断に必要な数字がすぐ出てこない',
    name: '数字をひと目で分かるように',
    type: 'Custom Dashboard',
    desc: '合計・平均・内訳・推移を1つの画面にまとめます。毎回集計し直す必要がなくなります。',
    description:
      '売上・進捗・支出などの指標を自動集計し、グラフとテーブルで一画面に集約するダッシュボードを開発します。',
  },
  {
    id: 'connect-existing-tools',
    problem: '同じ内容を何度も入力している',
    name: 'サービス同士をつなぐ',
    type: 'API Integration',
    desc: 'Google、LINE、Slack、Discordなど、すでにお使いのサービス同士を自動でつなぎます。今のやり方は変えずに、二度入力する手間だけをなくします。',
    description:
      'Google APIs、LINE Messaging API、Slack API、Discord API、REST APIを用いて、既存ツール間のデータ連携を実装します。',
  },
  {
    id: 'increase-web-enquiries',
    problem: 'サイトから問い合わせが来ない',
    name: 'ホームページの制作',
    type: 'Web Design',
    desc: '第一印象と信頼感を整え直し、見た人が次に何をすればよいか迷わないサイトにします。',
    description:
      '店舗・クリニック・中小企業・個人事業主・ブランド向けに、信頼感と問い合わせ導線を設計したWebサイト・ランディングページを制作します。',
  },
  {
    id: 'build-purpose-specific-app',
    problem: '今使っているソフトが仕事に合わない',
    name: '専用アプリの制作',
    type: 'Web Application Development',
    desc: '必要な機能だけにしぼった専用アプリを作ります。まず小さく作って、使いながら広げていきます。',
    description:
      'Next.js・React・TypeScript・Pythonを用いて、業務に合わせた目的特化型のWebアプリケーションを開発します。',
  },
] as const

/** Deliverable-first: the concrete thing that gets handed over. */
export const capabilities = [
  {
    id: '01',
    title: '質問に答えるAIチャット',
    desc: 'よくある質問にAIが答え、むずかしい内容だけを人に回します。営業時間外の一次対応もできます。',
  },
  {
    id: '02',
    title: '文章をまとめる・分類する仕組み',
    desc: '長い文章を短くまとめる、内容ごとに振り分けるなど、読む手間を減らす仕組みを組み込みます。',
  },
  {
    id: '03',
    title: '自動で動く作業の仕組み',
    desc: '情報を取ってきて、まとめて、保存して、知らせるまでを自動で行います。送信前の確認もできます。',
  },
  {
    id: '04',
    title: '数字がひと目で分かる画面',
    desc: '合計・平均・推移などを1画面にまとめます。検索、しぼり込み、表計算ソフトへの書き出しつき。',
  },
  {
    id: '05',
    title: '仕事用のWebアプリ',
    desc: '入力・一覧・修正・削除ができる業務用アプリ。入力ミスを防ぐ仕組みとスマホ表示に対応します。',
  },
  {
    id: '06',
    title: '今お使いのサービスとの連携',
    desc: 'Google、LINE、Slack、Discordなど、すでに使っているサービス同士を自動でつなぎます。',
  },
  {
    id: '07',
    title: 'ホームページ',
    desc: '複数ページのホームページ。伝えたいことの順番と、見た人の動きやすさを設計して作ります。',
  },
  {
    id: '08',
    title: '1ページの紹介サイト',
    desc: '伝えたいこと・その根拠・申し込みまでを1ページに整理し、途中でやめられにくい形にします。',
  },
] as const

/** Delivery process, shown in the Process section. */
export const processSteps = [
  {
    step: '01',
    title: 'お話をうかがう',
    desc: '目的、今のやり方、使う人、困っていることを整理します。作るものより先に、解くことを決めます。',
  },
  {
    step: '02',
    title: '内容とお見積もりを決める',
    desc: 'まず作る範囲、あとから足す部分、期間、費用をはっきりさせます。納得いただいてから始めます。',
  },
  {
    step: '03',
    title: '設計して作る',
    desc: '画面と流れを決めて作ります。途中の状態もご確認いただけるので、あとから大きくずれません。',
  },
  {
    step: '04',
    title: '動作を確認して公開',
    desc: '主な操作、スマホ表示、表示の崩れがないかを確認したうえで公開します。',
  },
] as const

/** Shown as a supporting row under the four-column process grid. */
export const processFollowUp = {
  step: '05',
  title: '公開したあとも対応します',
  desc: '公開後の修正、機能の追加、うまく動かないときの対応も続けて行います。対応の範囲は先に決めておきます。',
} as const
