# ポケモン ことばさがし

小学1年生を主なプレイヤーとする、家族向けのカタカナ単語探しWebゲームです。iPhone・iPadのSafariで、見つけた名前を指でなぞって遊べます。

## ローカルで起動

```sh
npm install
npm run dev -- --host 0.0.0.0
```

PCでは `http://localhost:5173/` を開きます。同じWi-FiにつないだiPhone/iPadでは、起動時に表示される `Network` のURLをSafariで開きます。

## ホーム画面へ追加

iPhone/iPadのSafariで公開URLを開き、「共有」→「ホーム画面に追加」を選びます。Service Workerを使わないため、プレイ時にはネット接続が必要です。

## 開発者向け設定

- 盤面サイズと出題数: [`src/config/gameConfig.ts`](src/config/gameConfig.ts)
- 出題候補: [`src/data/pokemonCatalog.ts`](src/data/pokemonCatalog.ts)

候補は公式人気投票の順位ではなく、発売済みの第1〜9世代の最初のパートナー27匹を必須とし、親しみやすさ・世代・名前の長さを考慮して選んだ108匹です。数字、記号、フォルム名は含めていません。

## 品質チェック

```sh
npm run check       # 型、Lint、単体・画面テスト、整形、ビルド
npm run test:e2e    # iPhone/iPad相当のWebKitテスト
npm run check:all   # 上記すべて
```

## GitHub Pagesへ公開

1. GitHubで公開リポジトリを作成し、このプロジェクトを`main`ブランチへpushします。
2. リポジトリの「Settings」→「Pages」でSourceを「GitHub Actions」にします。
3. `main`へのpush時に、テスト合格後の`dist`が自動公開されます。

AI-DLC成果物は[`aidlc/`](aidlc/)に保存しています。

## 権利表記

これは家族利用を目的とした非公式ファンプロジェクトで、株式会社ポケモン等とは関係ありません。ポケットモンスター・ポケモン・Pokémonは、任天堂・クリーチャーズ・ゲームフリークの商標です。本リポジトリに公式画像・ロゴ・音源は収録していません。
