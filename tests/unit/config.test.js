import { describe, expect, it } from "vitest";
import { PROMO_CONFIG } from "../../src/config.js";

describe("PROMO_CONFIG", () => {
  it("exposes the Stripe checkout link", () => {
    expect(PROMO_CONFIG.stripeUrl).toBe(
      "https://buy.stripe.com/cNidR900S6Xl2HO98p97G02"
    );
  });

  it("exposes the PIX copy-paste payload", () => {
    expect(PROMO_CONFIG.pixCopyPaste).toBe(
      "00020126360014BR.GOV.BCB.PIX0114244909870001385204000053039865406120.005802BR5901N6001C62070503***6304A14C"
    );
  });

  it("points to bundled promo assets", () => {
    expect(PROMO_CONFIG.assets.pixQrCode).toBe("assets/pix-qrcode.png");
    expect(PROMO_CONFIG.assets.demoVideo).toBe("assets/demo-video.mp4");
  });

  it("includes product title and promo price", () => {
    expect(PROMO_CONFIG.productName).toMatch(/Purple Stock/i);
    expect(PROMO_CONFIG.promoPrice).toBe("R$ 120,00");
  });

  it("mentions 3 months of system access in the description", () => {
    expect(PROMO_CONFIG.promoDescription).toMatch(/3 meses de acesso/i);
  });

  it("exposes the public share link", () => {
    expect(PROMO_CONFIG.shareUrl).toBe("https://vendas.purplestock.com.br");
  });

  it("exposes the official website link", () => {
    expect(PROMO_CONFIG.officialSiteUrl).toBe("https://www.purplestock.com.br");
  });
});
