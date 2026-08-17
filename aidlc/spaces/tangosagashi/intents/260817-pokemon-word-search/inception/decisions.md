# Architecture decision records

Status: Accepted on 2026-08-18

## ADR-001: Static client-only application

- Decision: バックエンドを持たない静的SPAとする。
- Reason: アカウント、同期、オフラインが不要で、すべての状態を端末内に保持できる。
- Consequence: ブラウザデータを消すと記録も失われ、端末間共有はできない。

## ADR-002: React + TypeScript + Vite

- Decision: React、TypeScript strict、Viteを採用する。
- Reason: 画面と状態を分離しやすく、ドメインロジックを型付きでテストでき、静的ホスティングに適する。
- Alternative: Vanilla TypeScriptは依存が少ないが、画面状態とダイアログが増えた際の構造化で不利。
- Alternative: Flutter/ネイティブはApp Store配布が不要なMVPには過大。

## ADR-003: DOM and CSS Grid instead of Canvas

- Decision: 各文字マスをDOM要素としてCSS Gridに配置する。
- Reason: 最大256要素は十分扱える規模で、文字表示、レスポンシブ配置、自動テスト、アクセシビリティが容易。
- Consequence: Pointer Events中の再レンダリングを抑え、仮選択の更新を軽量に保つ必要がある。

## ADR-004: Pure domain modules

- Decision: 問題生成、検証、方向判定、正規化、保存形式をReactから独立した純粋TypeScriptモジュールにする。
- Reason: ランダム生成の境界条件を高速な単体テストで広く検証できる。

## ADR-005: Versioned local persistence

- Decision: `localStorage`へスキーマバージョン付きで保存する。
- Reason: リリース後に保存形式を変更しても、安全に移行または初期化できる。
- Consequence: 保存失敗・破損時は累計を可能な範囲で保護し、ゲームを起動不能にしない。

## ADR-006: GitHub Pages deployment

- Decision: GitHub Actionsで検証・ビルド後、GitHub Pagesへ静的配信する。
- Reason: GitHubアカウントを既に利用でき、サーバー管理が不要。
- Repository visibility: 公開リポジトリを利用する。
