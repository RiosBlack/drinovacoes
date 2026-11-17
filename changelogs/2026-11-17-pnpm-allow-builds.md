# pnpm — aprovar builds de esbuild e unrs-resolver

**Data:** 2026-11-17

## Problema

`pnpm next dev` (pnpm 11.24) reinstalava `node_modules` e terminava com exit code 1:

```
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild@0.25.6, esbuild@0.28.1, unrs-resolver@1.12.2
```

No pnpm 10+, scripts de dependências não rodam sem aprovação. Sem o postinstall, o binário do esbuild e o binding nativo do unrs-resolver não são instalados, e o próprio `pnpm install` falha no modo estrito.

## Correção

- `pnpm approve-builds esbuild unrs-resolver` gravou `allowBuilds` em `pnpm-workspace.yaml`
- Os postinstall desses pacotes rodaram e os binários ficaram disponíveis
