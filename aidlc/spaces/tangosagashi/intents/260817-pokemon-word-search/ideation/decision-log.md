# Decision log

| ID | Decision | Status | Source |
|---|---|---|---|
| D-001 | iPhone・iPadのSafariで動くWebアプリとして開発する | Accepted | S-001 |
| D-002 | 利用対象は家族のみとし、URLを知る人がアクセスできる公開方式とする | Accepted | S-001 |
| D-003 | オフライン対応は行わない | Accepted | S-001 |
| D-004 | 問題はプレイごとにランダム生成する | Accepted | S-001 |
| D-005 | 難易度は「かんたん」「ふつう」の2段階とする | Accepted | S-001 |
| D-006 | 盤面プリセットは8×8/4匹、12×12/8匹、16×16/12匹とする | Superseded by D-035 | S-001 |
| D-007 | 盤面と探索対象数はプレイヤー設定にせず、開発者向け設定にする | Accepted | S-001 |
| D-008 | 小書き文字は盤面上で大きい文字に正規化する | Accepted | S-001 |
| D-009 | 発見した単語ごとに異なる色を付け、名前一覧に打ち消し線を付ける | Accepted | S-001 |
| D-010 | 発見時とクリア時に音および紙吹雪の演出を行う | Accepted | S-001 |
| D-011 | タイマーは実装せず、発見したポケモン数の累計を端末内に保存する | Accepted | S-001 |
| D-012 | 約100種類を収録し、歴代の御三家ポケモンを必須とする | Accepted | S-001 |
| D-013 | AWS Labs系AI-DLCのフェーズと承認ゲートに沿って進める | Accepted | S-001 |
| D-014 | 累計は種類数ではなく発見回数とし、同じ種類の再発見も加算する | Accepted | S-001 |
| D-015 | 歴代御三家は各世代の最初に選べる3匹の基本形を必須収録する | Accepted | S-001 |
| D-016 | 長音符は1マスとして扱い、数字・記号を含む名前はMVP候補から外す | Accepted | S-001 |
| D-017 | 不正解時は選択を消して盤面を軽く揺らし、ペナルティとエラー音は付けない | Accepted | S-001 |
| D-018 | ヒント機能はMVPに含めない | Accepted | S-001 |
| D-019 | プレイヤー設定は効果音の切替と、確認付きの累計リセットのみとする | Accepted | S-001 |
| D-020 | 逆方向からのなぞりを正解とし、単語の交差配置を許可する | Accepted | S-001 |
| D-021 | MVPでは公式画像・公式ロゴを使用せず、名前のみを独自デザインで扱う | Accepted | S-001 |
| D-022 | タイトル、ゲーム、クリア、設定の画面案と文言・情報配置を承認する | Accepted | S-001 |
| D-023 | React、TypeScript、Vite、DOM/CSS Grid、Pointer Eventsを採用する | Accepted | S-001 |
| D-024 | Vitest、React Testing Library、Playwright WebKitで検証する | Accepted | S-001 |
| D-025 | 公開GitHubリポジトリとGitHub Pagesを利用する | Accepted | S-001 |
| D-026 | Web App Manifestを用意するが、MVPではService Workerを導入しない | Accepted | S-001 |
| D-027 | Inception成果物を承認し、Constructionへ進む | Accepted | S-001 |
| D-028 | Bolt 1 Walking Skeletonを承認する | Accepted | S-001 |
| D-029 | Bolt 2以降は自律進行とし、検証失敗時のみ停止する | Accepted | S-001 |
| D-030 | 第10世代として公式発表済みのハブロウ・ポムケン・ミオリーを必須候補へ含める | Superseded by D-033 | S-001 |
| D-031 | GitHub認証が復旧するまで公開操作を保留し、ローカルのリリース検証まで完了する | Accepted | S-001 |
| D-032 | クリア時は完成盤面を保持し、約3秒の盤面オーバーレイ後に盤面下へ操作を表示する | Accepted | S-001 |
| D-033 | 未発売作品の知名度を考慮し、第10世代の3匹を候補から除外する | Accepted | S-001 |
| D-034 | 紙吹雪を毎回ランダム化し、出題外の候補名を一文字変えたニアミス語を盤面へ混ぜる | Accepted | S-001 |
| D-035 | 特大12×12/12匹/ニアミス5匹と宇宙16×16/16匹/ニアミス10匹を追加する | Accepted | S-001 |
