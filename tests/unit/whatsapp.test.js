import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "../../src/whatsapp.js";

describe("buildWhatsAppUrl", () => {
  it("builds wa.me link from phone digits", () => {
    expect(buildWhatsAppUrl("5521987962324")).toBe(
      "https://wa.me/5521987962324"
    );
  });

  it("includes optional pre-filled message", () => {
    const url = new URL(
      buildWhatsAppUrl("+55 21 98796-2324", "Olá! Quero a promoção.")
    );

    expect(url.origin + url.pathname).toBe("https://wa.me/5521987962324");
    expect(url.searchParams.get("text")).toBe("Olá! Quero a promoção.");
  });
});
