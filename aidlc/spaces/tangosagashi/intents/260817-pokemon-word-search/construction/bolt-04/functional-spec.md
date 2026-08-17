# Bolt 4 functional specification

Status: Implemented on 2026-08-18

- 正解時に短い効果音と小さな紙吹雪を表示する。
- 不正解時は選択を消し、盤面を軽く揺らす。減点とエラー音は付けない。
- 全発見時は大きな紙吹雪、今回と累計の発見数、再プレイ・タイトル操作を表示する。
- 効果音は設定で停止でき、音声API障害がゲーム進行へ影響しない。
- 8×8、12×12、16×16をiPhone/iPad幅へ収める。
- Web App Manifestと独自の虫眼鏡アイコンを提供する。Service Workerは導入しない。
