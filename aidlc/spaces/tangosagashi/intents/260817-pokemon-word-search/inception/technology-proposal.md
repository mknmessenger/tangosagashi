# Technology proposal

Status: Approved on 2026-08-18

## Recommended stack

| Area | Choice | Rationale |
|---|---|---|
| Language | TypeScript, strict mode | 盤面座標、方向、保存データ、設定値を型で検証しやすい |
| UI | React | 4画面、ダイアログ、進行状態をコンポーネントとして分離できる |
| Build | Vite | 静的Webアプリの開発・ビルドが軽量で、GitHub Pagesの公式手順がある |
| Styling | Plain CSS + CSS Grid | 最大256マスをDOMとして配置し、画面幅に応じて正方形を保てる |
| State | React `useReducer` | 状態遷移は明示するが、外部状態管理ライブラリは導入しない |
| Touch | Pointer Events | タッチとマウスを同じ入力モデルで扱う |
| Persistence | Versioned `localStorage` schema | バックエンドなしで設定、累計、途中問題を保持できる |
| Sound | Web Audio API | 第三者音源を使用せず、短い効果音を生成できる |
| Unit tests | Vitest | Vite設定とTypeScript変換を共有できる |
| UI tests | React Testing Library | 子どもが見る文言と操作結果を中心に検証できる |
| End-to-end | Playwright: WebKit + Mobile Safari profile | Safariに近いWebKitとiPhone相当の表示・操作を自動検証できる |
| Hosting | GitHub Pages + GitHub Actions | 静的ファイルだけで公開でき、既存のGitHubアカウントを利用できる |

## Application form

- Client-side rendered single-page application
- アプリ内状態で画面を切り替え、URLルーターは導入しない
- サーバー、API、データベースは使用しない
- Web App Manifestを用意し、Safariのホーム画面追加時にアプリらしく起動できるようにする
- Service WorkerはMVPに含めない。したがってオフライン動作は保証しない

## Dependency policy

- React、Vite、テスト基盤以外のランタイム依存は極力追加しない
- 紙吹雪はCSSまたは小さなCanvas実装とし、専用ライブラリを追加しない
- 効果音はアプリ内で合成し、外部音源ファイルへ依存しない
- パズル生成、方向判定、正規化、保存は純粋なTypeScriptモジュールとして実装する

## Local environment assessment

- Node.js: v24.15.0
- npm: 11.13.0
- Git: 2.53.0.windows.3
- 現在の環境で提案スタックを実行可能

## Deployment outline

1. GitHubリポジトリへ`main`ブランチをpushする。
2. GitHub PagesのSourceをGitHub Actionsに設定する。
3. Actionsで`npm ci`、テスト、`npm run build`を実行する。
4. Viteの`dist`をGitHub Pagesへデプロイする。
5. iPhone/iPadのSafariでURLを開く。
6. 必要に応じてSafariの共有メニューから「ホーム画面に追加」する。

## Official references

- React TypeScript: https://react.dev/learn/typescript
- Vite static deployment and GitHub Pages: https://vite.dev/guide/static-deploy
- Pointer Events: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
- Vitest: https://vitest.dev/guide/
- Playwright browsers and WebKit: https://playwright.dev/docs/browsers
- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
