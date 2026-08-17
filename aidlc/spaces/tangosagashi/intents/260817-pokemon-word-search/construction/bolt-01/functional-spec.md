# Bolt 1 functional specification

Status: Implemented, pending gate approval

## Delivered slice

1. タイトル画面で難易度と小・中・大を選択する。
2. 「ゲームスタート」で選択条件を渡す。
3. ランダムに対象を選び、許可方向へ配置する。
4. 文字で空きマスを埋め、盤面と対象一覧を表示する。
5. 「もどる」でタイトルへ戻る。

## Technical foundation

- React + TypeScript strict + Vite
- CSS Gridによる8×8、12×12、16×16盤面
- 設定と問題生成をUIから分離
- シード可能な乱数による再現可能な単体テスト
- ESLint、Prettier、Vitest、本番ビルドを`npm run check`へ統合
- iPhoneのレイアウト幅を正しく扱うviewport設定

## Intentional limitations

- なぞり操作、発見状態、保存、設定、演出は後続Boltで実装する。
- カタログはWalking Skeleton用の17種類であり、約100種類への拡充はBolt 2で行う。
- 現段階の問題生成は配置成立を保証するが、埋め文字を含む一意出現検証はBolt 2で追加する。

