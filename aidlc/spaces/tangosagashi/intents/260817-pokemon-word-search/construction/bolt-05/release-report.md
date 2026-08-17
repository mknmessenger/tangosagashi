# Bolt 5 release report

Status: Local release verification passed; deployment pending

## Passed

- `npm run check`: 型検査、ESLint、Vitest 15件、Prettier、本番ビルド
- `npm run test:e2e`: WebKit iPhone/iPad 6件
- なぞり、設定、横幅、途中保存復元をE2Eで検証
- GitHub Actionsによる検査・GitHub Pages公開ワークフローを追加
- 家庭内LAN起動、ホーム画面追加、公開手順をREADMEへ記載

## External blocker

- Git remoteは未設定。
- GitHub CLIの`mknmessenger`アカウント用トークンが失効している。
- `gh auth login -h github.com`完了後、公開リポジトリ作成、push、Pages有効化を実施する。

Construction → Operation gate remains open until the deployed URL is verified.
