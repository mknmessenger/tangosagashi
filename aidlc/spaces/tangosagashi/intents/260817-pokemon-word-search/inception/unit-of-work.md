# Units of work

Status: Approved on 2026-08-18

## UOW-01: Walking skeleton

### Goal

プロジェクトの品質基盤を作り、「タイトルで選ぶ → 小サイズの問題を生成する → 盤面を表示する」という最小の縦切りを動作させる。

### Scope

- React + TypeScript + Viteプロジェクト
- strict type checking、lint、format、Vitest
- アプリの基本テーマとレスポンシブな画面枠
- タイトル画面の難易度・サイズ選択
- 開発者向け盤面プリセット設定
- 最小の問題生成と8×8盤面表示
- 基本CI検証コマンド

### Exit criteria

- ローカルで起動・ビルド・テストできる。
- タイトル画面から8×8盤面へ遷移できる。
- 最小ジェネレータの単体テストが通る。
- AI-DLCのWalking Skeleton承認ゲートで確認可能である。

Stories: US-001, US-009

## UOW-02: Puzzle domain and catalog

### Goal

全プリセット・全難易度で、仕様を満たす問題を安定して生成できるようにする。

### Scope

- 約100種類のポケモン名カタログ
- 歴代御三家基本形の必須収録
- 小書き文字、長音符、使用可能文字の正規化
- 4方向・8方向配置
- 交差配置、逆向き、対象抽選
- 一意出現検査と安全な再試行
- 8×8、12×12、16×16の反復生成テスト

### Exit criteria

- カタログが設定・ロジックから分離されている。
- 各条件で多数回生成しても不正な盤面を返さない。
- 各対象が正解として1回だけ現れる。
- 生成不能時に明示的かつ安全に失敗する。

Stories: US-001, US-009

## UOW-03: Touch gameplay

### Goal

iPhone・iPadで単語を指でなぞり、発見・不正解・交差を正しく扱えるようにする。

### Scope

- Pointer Eventsによる始点・移動・終点入力
- 4方向・8方向スナップ
- なぞり中の仮選択
- 正解の逆向き受け入れ
- 単語ごとの色、対象一覧、打ち消し線
- 不正解時の解除と軽い揺れ
- 現在の発見数表示

### Exit criteria

- マウスとタッチ相当入力で同じ選択結果になる。
- 交差した2単語を順不同で発見できる。
- ゲーム中にページスクロールや文字選択が発生しない。
- 不正解で状態や累計が変化しない。

Stories: US-002, US-003

## UOW-04: Persistence, settings, and navigation

### Goal

途中問題・累計・設定を端末内に安全に保存し、誤操作からゲームを守る。

### Scope

- バージョン付きlocalStorageスキーマ
- 累計の加算と復元
- 途中問題・発見状況の自動保存と再開
- 前回の難易度・サイズの保存
- 効果音設定
- 確認付き累計リセット
- ゲーム終了確認
- 破損保存データからの復旧

### Exit criteria

- 再読み込み後に途中状態と累計が復元される。
- 同じ種類の再発見も累計へ加算される。
- 確認を取り消した場合、ゲームと累計が変化しない。
- 不正な保存データでもアプリが起動する。

Stories: US-005, US-006, US-007, US-008

## UOW-05: Completion, delight, and device polish

### Goal

承認済み画面案を完成させ、子どもが楽しく使える演出と端末向け仕上げを行う。

### Scope

- Web Audio APIによる発見効果音
- 正解時の小さな紙吹雪
- クリア画面と大きな演出
- 同条件での再プレイ
- 8×8、12×12、16×16のレスポンシブ調整
- reduced motion、色以外の発見表現、読みやすい文言
- Web App Manifestと独自アプリアイコン

### Exit criteria

- 承認済み画面・文言・画面遷移を再現する。
- 効果音オフ時に音を再生しない。
- 320px相当からiPad幅まで横にはみ出さない。
- 全問発見から再プレイ・タイトル復帰ができる。

Stories: US-004, US-008

## UOW-06: Release validation and delivery

### Goal

自動検証と実機確認を通し、家族がSafariから利用できるURLを提供する。

### Scope

- Playwright WebKitとMobile Safari設定のE2Eテスト
- GitHub Actionsのtypecheck、lint、unit、build、E2E
- GitHub Pagesデプロイワークフロー
- 公開リポジトリ接続
- iPhone/iPad実機受け入れチェックリスト
- ホーム画面追加手順

### Exit criteria

- CIの必須検証がすべて成功する。
- GitHub PagesのURLからゲームを起動できる。
- iPhoneとiPadのSafariで主要シナリオを確認する。
- ホーム画面からWebアプリとして起動できる。

Stories: US-001–US-009
