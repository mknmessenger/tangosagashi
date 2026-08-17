# Bolt plan

Status: Approved on 2026-08-18

## Bolt 1: Walking skeleton

- Units: UOW-01
- Mode: Gated and interactive
- Deliverable: タイトルから8×8盤面まで動く最小アプリ、品質スクリプト、最小テスト
- Gate: 必ずユーザー確認を受ける
- After gate: Construction autonomy modeを一度だけ確認する

## Bolt 2: Puzzle engine and content

- Units: UOW-02
- Deliverable: カタログ、正規化、全サイズ・全方向ジェネレータ、検証テスト
- Gate behavior: Bolt 1後に選択された自律モードへ従う

## Bolt 3: Gameplay and persistence batch

- Units: UOW-03 and UOW-04
- Parallel eligibility: 依存元UOW-02完了後、相互に依存しない範囲を並行化できる
- Deliverable: なぞり操作、進行、保存、再開、設定、確認ダイアログ

## Bolt 4: Delight and responsive polish

- Units: UOW-05
- Deliverable: 効果音、紙吹雪、クリア、最終画面、Manifest、全サイズ調整

## Bolt 5: Release

- Units: UOW-06
- Deliverable: E2E、CI、GitHub Pages、実機確認手順
- Gate: Construction → Operation verification
