import type { CaseStudy } from '../types/project'

/**
 * AI & automation case studies.
 *
 * Every entry here is backed by a public repository under github.com/aicmode
 * that was read before writing this file: the problem, feature list, stack and
 * architecture notes all come from that repository's own README / design doc.
 * `status` was set from an actual HTTP check of the URL, not from an assumption.
 *
 * Deliberately absent from this file:
 *   - client names, revenue figures, user counts, testimonials
 *   - quantified impact ("cuts work by 50%"). `expectedImpact` states intent,
 *     which is all that can honestly be claimed for work that has not been run
 *     inside a client's operation.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'medibrief-ai',
    title: '受診メモ作成ツール',
    subtitle: 'MediBrief',
    plainSummary: '話したいことを書くだけで、病院で伝えやすいメモに整理してくれるツール。',
    group: 'AI Systems',
    projectType: 'Self-directed Project',
    role: ['企画', '要件整理', '設計', '開発', '動作確認'],
    status: 'released',
    problem:
      '診察時間は短く、患者は緊張して伝えたいことを忘れるため、医師が判断に必要な情報が揃わない。',
    solution:
      '話し言葉の自由入力を、診察で伝えやすい7項目の受診メモへ自動で整理するWebアプリを設計・実装しました。',
    plainFeatures: [
      '話し言葉で書いた内容を、伝わる順番に整理',
      'いつから、どんな症状かを時系列でまとめる',
      '医師に聞きたいことを質問文にする',
    ],
    features: [
      '自由入力から7項目の受診メモを生成',
      '時期と症状を組にした経過の整理',
      '医師に尋ねる質問文の組み立て',
      '空欄は推測で埋めず「書き足し方」だけを案内',
      'コピー・印刷での持ち出し',
      'ルールベースとAI経路を差し替え可能な構成',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'OpenAI API (optional)', 'Vercel'],
    accent: '#5fd2c2',
    detail: {
      goal:
        '受診前の数分で「何を、どの順番で伝えるか」を確定させ、限られた診察時間を症状の説明ではなく相談に使える状態にすること。',
      proposedSolution: [
        '話し言葉のまま書ける単一の入力欄に絞り、フォーム入力の負担をなくす',
        '入力を文単位に分解し、症状・時期・変化・状況・服薬・質問へ振り分ける',
        '医学的判断（病名・薬・緊急度）は一切行わず、整理だけに機能を限定する',
        '拾えなかった項目は空欄のまま残し、補い方だけを提示する',
      ],
      mvpScope: [
        '自由入力 → 7項目の受診メモ生成',
        '入力例3件による動作確認',
        'コピー／印刷／クリア',
        'ブラウザ内処理（APIキー設定なしで動作）',
        'スマホ・PC両対応のレイアウト',
      ],
      phase2: [
        'AI経路（OpenAI API）を既定にした精度改善',
        '生成結果の項目ごとの手直しと保存',
        '経過を複数回分並べて比較する表示',
        '家族・介助者が代理入力する場合の項目追加',
      ],
      architecture: [
        '整理ロジックを `MemoOrganizer` インターフェースで抽象化し、実装を差し替え可能に',
        '既定は依存ライブラリなしのルールベース（`lib/organizer/rule-based.ts`）',
        'AI経路は `/api/organize` のRoute Handler経由。応答は受け取り側で検証',
        'APIキー未設定・API失敗時はサーバー側でルールベースへフォールバック',
      ],
      security: [
        '既定ではブラウザ内だけで処理し、入力を外部送信・保存しない',
        'APIキーはサーバー側の環境変数のみ。クライアントへは渡さない',
        'システムプロンプトでも病名・薬・緊急度の出力を明示的に禁止',
        '体調は機微情報のため、AI経路を使う場合は送信先の規約確認を前提とする',
        '「診断ではありません」の注意書きを画面とコピー結果の両方に固定表示',
      ],
      expectedImpact: [
        '伝え忘れを減らし、診察で症状の経過を言葉にできる状態を目指す',
        '医師が把握するまでの時間短縮を想定',
        '問診票への転記・二重入力を減らす設計',
      ],
    },
    liveUrl: 'https://medibrief-ai.vercel.app',
    githubUrl: 'https://github.com/aicmode/medibrief-ai',
    screenshot: '/works/case-studies/medibrief-ai.png',
    screenshotAlt: 'MediBriefの画面。自由入力から7項目の受診メモが生成されている',
    addedOn: '2026-07-30',
    order: 1,
    year: 2026,
  },
]
