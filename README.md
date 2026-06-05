# Vendedora Promo — Purple Stock

Página standalone para compartilhar links de pagamento (Stripe + PIX) e vídeo de demonstração.

## Como usar

```bash
cd vendedora-promo
npm install
npm run dev
```

Abra http://localhost:3456 e compartilhe o link com clientes.

## Qualidade

```bash
npm run format:check  # Prettier
npm run lint          # ESLint
npm test              # testes unitários (Vitest)
npm run test:e2e      # testes E2E (Playwright)
npm run verify        # roda tudo
```

Pre-commit (monorepo): ao commitar arquivos em `vendedora-promo/`, roda lint-staged, Prettier, ESLint e testes unitários. CI no GitHub Actions executa o pipeline completo incluindo E2E.

## Estrutura

- `index.html` — página principal (Tailwind CDN)
- `src/config.js` — links Stripe, PIX e assets
- `src/clipboard.js` — copiar PIX / mensagem
- `src/share.js` — montar mensagem de compartilhamento
- `assets/` — QR Code PIX e vídeo demo
