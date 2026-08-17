# Bolt 1 test report

Date: 2026-08-18

## Automated quality gate

Command: `npm run check`

| Check | Result |
|---|---|
| TypeScript strict typecheck | Pass |
| ESLint | Pass |
| Vitest | Pass: 1 file, 5 tests |
| Prettier check | Pass |
| Production build | Pass |

## Unit coverage in this Bolt

- 8×8盤面と4対象を生成する。
- 小・中・大の各配置文字列が盤面上の文字と一致する。
- 「かんたん」が上下左右の4方向だけを使用する。

## Browser verification

- Viewport: 390×844 CSS pixels
- タイトル画面: Pass
- 初期選択「かんたん・小」: Pass
- タイトルからゲーム開始: Pass
- 8×8・64マス・4対象表示: Pass
- 横方向オーバーフローなし: Pass
- Console errors/warnings: 0

## Security/dependency check

- npm install audit result: 0 known vulnerabilities

