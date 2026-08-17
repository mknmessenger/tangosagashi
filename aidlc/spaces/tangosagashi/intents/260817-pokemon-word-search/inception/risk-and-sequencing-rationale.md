# Risk and sequencing rationale

## Why this order

1. 最初にWalking SkeletonでReact/Vite/テスト/画面枠の成立を確認する。
2. 最も不確実性が高い問題生成を、UI詳細より先に完成させる。
3. 問題型が安定した後、タッチ操作と保存を実装する。
4. 正しいゲーム進行の上に効果音・紙吹雪・レスポンシブ仕上げを重ねる。
5. 最後に全経路をE2E検証し、同じ成果物をPagesへ公開する。

## Highest-risk checkpoints

- Bolt 2: 16×16・12語を含む生成成功率と一意出現
- Bolt 3: iOS相当Pointer Eventsとスクロール抑止
- Bolt 4: 16×16のiPhone表示と演出負荷
- Bolt 5: WebKit自動テストと実機Safariの差

## Rollback strategy

- 各Boltを独立したコミットとして保持する。
- 生成ロジックとUIを分離し、問題生成の変更が画面実装へ波及しにくくする。
- 保存スキーマにバージョンを付け、非互換時は安全な移行または途中問題のみ破棄する。

