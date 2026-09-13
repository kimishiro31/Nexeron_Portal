# Nexeron Portal

Portal central de aplicações corporativas Nexeron.

## Objetivo

Exibir a tela de seleção de aplicações e direcionar cada ferramenta para seu próprio domínio. O portal é uma aplicação frontend estática e não depende do backend, da autenticação ou do banco de dados do CESA.

## Stack

- React 19
- TypeScript
- Vite
- CSS responsivo

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

O Vite disponibiliza o portal localmente, normalmente em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Os arquivos publicados são gerados em `dist/`.

## Estrutura principal

```text
src/main.tsx       Tela, cards, atalhos e navegação externa
src/styles.css     Identidade visual e responsividade
public/Imagens     Logos e arte da pantera
index.html         Entrada HTML do portal
vite.config.ts     Configuração do Vite
```

## Domínios planejados

```text
nexeron.online
→ Portal Nexeron

cesa.nexeron.online
→ CESA

gc.nexeron.online
→ Gestor de Coletores
```

Os cards Controle de Ativos e Gestão de Coletores abrem, respectivamente, `https://cesa.nexeron.online` e `https://gc.nexeron.online/`.
