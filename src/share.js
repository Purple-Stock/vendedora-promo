export function buildShareMessage(config, pageUrl) {
  return [
    config.productName,
    `Promoção: ${config.promoPrice} — 3 meses de acesso`,
    "",
    "Pague com cartão:",
    config.stripeUrl,
    "",
    "Ou compartilhe esta página com PIX:",
    pageUrl,
  ].join("\n");
}

export function buildShareUrl(href) {
  const url = new URL(href);
  url.search = "";
  url.hash = "";
  return url.toString();
}
