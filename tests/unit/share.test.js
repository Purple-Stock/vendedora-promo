import { describe, expect, it } from "vitest";
import { buildShareMessage, buildShareUrl } from "../../src/share.js";
import { PROMO_CONFIG } from "../../src/config.js";

describe("buildShareMessage", () => {
  it("includes product, price and payment options", () => {
    const message = buildShareMessage(
      PROMO_CONFIG,
      "https://exemplo.com/promo"
    );

    expect(message).toContain("Purple Stock");
    expect(message).toContain("R$ 120,00");
    expect(message).toContain(PROMO_CONFIG.stripeUrl);
    expect(message).toContain("https://exemplo.com/promo");
  });
});

describe("buildShareUrl", () => {
  it("returns current page URL without query params", () => {
    const url = buildShareUrl("https://exemplo.com/promo?utm=abc");

    expect(url).toBe("https://exemplo.com/promo");
  });
});
