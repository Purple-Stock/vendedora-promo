import { expect, test } from "@playwright/test";

test.describe("Pagina de promocao vendedora", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("exibe titulo, preco e link Stripe", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Purple Stock"
    );
    await expect(page.getByTestId("promo-price")).toHaveText("R$ 120,00");
    await expect(page.getByTestId("promo-description")).toContainText(
      "3 meses de acesso"
    );

    const stripeLink = page.getByTestId("stripe-link");
    await expect(stripeLink).toHaveAttribute(
      "href",
      "https://buy.stripe.com/cNidR900S6Xl2HO98p97G02"
    );
    await expect(stripeLink).toHaveAttribute("target", "_blank");
  });

  test("exibe QR Code PIX e video de demonstracao", async ({ page }) => {
    const pixQr = page.getByTestId("pix-qr");
    await expect(pixQr).toHaveAttribute("src", /pix-qrcode\.png/);

    const video = page.getByTestId("demo-video");
    await expect(video).toHaveAttribute("src", /demo-video\.mp4/);
  });

  test("video aparece antes do titulo da oferta", async ({ page }) => {
    const videoBox = await page.getByTestId("demo-video").boundingBox();
    const titleBox = await page
      .getByRole("heading", { level: 1 })
      .boundingBox();

    expect(videoBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(videoBox.y).toBeLessThan(titleBox.y);
  });

  test("copia codigo PIX ao clicar no botao", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await page.getByTestId("copy-pix").click();
    await expect(page.getByTestId("copy-pix")).toHaveText("PIX copiado!");

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toContain("BR.GOV.BCB.PIX");
  });

  test("preenche link compartilhavel da pagina", async ({ page }) => {
    const shareLink = page.getByTestId("share-link");
    await expect(shareLink).toHaveValue("https://vendas.purplestock.com.br");
  });

  test("abre modal ao clicar na imagem do PIX", async ({ page }) => {
    const modal = page.getByTestId("pix-modal");
    await expect(modal).toBeHidden();

    await page.getByTestId("pix-qr").click();
    await expect(modal).toBeVisible();
    await expect(page.getByTestId("pix-modal-image")).toHaveAttribute(
      "src",
      /pix-qrcode\.png/
    );
  });

  test("fecha modal ao clicar no botao fechar", async ({ page }) => {
    await page.getByTestId("pix-qr").click();
    await expect(page.getByTestId("pix-modal")).toBeVisible();

    await page.getByTestId("pix-modal-close").click();
    await expect(page.getByTestId("pix-modal")).toBeHidden();
  });
});
