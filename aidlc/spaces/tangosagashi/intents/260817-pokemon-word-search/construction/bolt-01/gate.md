# Bolt 1 approval gate

Status: Approved by product owner on 2026-08-18

## Exit criteria

| Criterion | Status |
|---|---|
| ローカルで起動・ビルド・テストできる | Pass |
| タイトルから8×8盤面へ遷移できる | Pass |
| 最小ジェネレータの単体テストが通る | Pass |
| iPhone幅で横にはみ出さない | Pass |
| Product owner review | Pass |

## Gate decision after approval

Product owner selects the Construction autonomy mode once:

- autonomous: Remaining Bolts proceed without a gate after each Bolt; failures still halt.
- gated: Stop for approval after every Bolt or parallel batch.
