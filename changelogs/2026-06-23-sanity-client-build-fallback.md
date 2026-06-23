# Sanity client — fallback para build na Vercel

**Data:** 2026-06-23

## Problema

O build na Vercel falhava em `Collecting page data` com:

```
Error: Configuration must contain `projectId`
```

As variáveis `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` existiam apenas em `.env.local` (não versionado) e não estavam configuradas no projeto Vercel.

## Correção

- `sanity/client.ts` passou a usar valores padrão públicos (`d930rucp` / `production`) quando as env vars não estão definidas
- O build funciona na Vercel sem configuração extra; as env vars continuam opcionais para override
