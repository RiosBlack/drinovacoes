# Hero — scroll travado no mobile

**Data:** 2026-06-23

## Problema

No mobile, o scroll da home ficava travado no hero. O usuário conseguia percorrer o stack de dashboards até o limite físico do container, mas a página não desbloqueava — só o botão "Ver projetos" liberava o scroll da página.

## Causa

O `ScrollStack` calculava o ponto de conclusão (`stackCompleteScrollTop`) com base na posição do último card, mas o espaço rolável real (`scrollHeight - clientHeight`) era menor em viewports estreitas. O `isAtEnd()` nunca retornava `true`, mantendo `setPageScrollLocked(true)`.

## Solução

- Espaçador final (`.scroll-stack-end`) ajustado dinamicamente para garantir scroll suficiente até o fim do stack
- `isAtEnd()` passa a considerar o menor valor entre o alvo calculado e o máximo rolável nativo

## Arquivos

- `app/_components/portfolio/ScrollStack.tsx`
