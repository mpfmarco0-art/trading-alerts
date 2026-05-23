# Trading Alerts PRO

Aplicação profissional de alertas de sessões de trading em tempo real.

## Funcionalidades

- Relógio em tempo real (UTC) com animações
- Status dos mercados (aberto/fechado) com indicador visual
- Timeline visual 24H das sessões de trading
- Cards de sessão com progresso em tempo real e indicador LIVE
- Contador regressivo para o próximo evento
- Alertas sonoros para abertura e fecho de sessões
- Tabela completa de horários com estado ativo
- Design responsivo (mobile-first)
- Animações suaves com Framer Motion
- Background grid + glow effects

## Sessões de Trading

| Sessão | Horário (UTC) | Ativos |
|--------|--------------|--------|
| Asiática | 00:00 – 09:00 | JPY, AUD, NZD |
| Europeia | 08:00 – 17:30 | EUR, GBP, CHF |
| Americana | 14:30 – 22:00 | USD, Índices EUA, Ouro |
| Solapamento LND-NY | 14:30 – 17:30 | Pares maiores, Índices |

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Framer Motion
- Lucide React Icons
- CSS custom properties & glassmorphism

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

O output de build fica em `dist/`. Pode ser deployado em qualquer plataforma de hosting estático (Vercel, Netlify, Cloudflare Pages, etc.).

