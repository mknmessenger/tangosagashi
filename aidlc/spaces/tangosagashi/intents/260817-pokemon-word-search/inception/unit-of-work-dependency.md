# Unit of work dependencies

```mermaid
flowchart LR
    U1["UOW-01<br>Walking skeleton"] --> U2["UOW-02<br>Puzzle domain"]
    U1 --> U4["UOW-04<br>Persistence"]
    U2 --> U3["UOW-03<br>Touch gameplay"]
    U2 --> U4
    U3 --> U5["UOW-05<br>Completion & polish"]
    U4 --> U5
    U5 --> U6["UOW-06<br>Release"]
```

## Dependency rationale

- UOW-01 establishes types, scripts, UI shell, and configuration conventions.
- UOW-02 defines the final Puzzle and placement contracts consumed by gameplay and persistence.
- UOW-03 and UOW-04 can proceed as a parallel batch after UOW-02.
- UOW-05 integrates gameplay, saved state, effects, and final responsive UI.
- UOW-06 validates and deploys the complete product.

