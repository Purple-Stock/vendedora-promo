import { PROMO_CONFIG } from "./config.js";
import { copyText, showCopyFeedback } from "./clipboard.js";
import { bindPixModal } from "./modal.js";
import { buildShareMessage } from "./share.js";

function bindPromoPage() {
  const stripeLink = document.getElementById("stripe-link");
  const pixQrTrigger = document.getElementById("pix-qr-trigger");
  const pixQrImage = document.getElementById("pix-qr");
  const demoVideo = document.getElementById("demo-video");
  const productTitle = document.getElementById("product-title");
  const promoPrice = document.getElementById("promo-price");
  const promoDescription = document.getElementById("promo-description");
  const copyPixButton = document.getElementById("copy-pix");
  const sharePageButton = document.getElementById("share-page");
  const shareLinkInput = document.getElementById("share-link");

  if (!stripeLink || !pixQrImage || !demoVideo) return;

  productTitle.textContent = PROMO_CONFIG.productName;
  promoPrice.textContent = PROMO_CONFIG.promoPrice;
  if (promoDescription) {
    promoDescription.textContent = PROMO_CONFIG.promoDescription;
  }
  stripeLink.href = PROMO_CONFIG.stripeUrl;
  pixQrImage.src = PROMO_CONFIG.assets.pixQrCode;
  pixQrImage.alt = "QR Code PIX para pagamento";
  demoVideo.src = PROMO_CONFIG.assets.demoVideo;

  bindPixModal({
    trigger: pixQrTrigger ?? pixQrImage,
    modal: document.getElementById("pix-modal"),
    closeButton: document.getElementById("pix-modal-close"),
    backdrop: document.getElementById("pix-modal-backdrop"),
    modalImage: document.getElementById("pix-modal-image"),
    imageSrc: PROMO_CONFIG.assets.pixQrCode,
  });

  const pageUrl = PROMO_CONFIG.shareUrl;
  shareLinkInput.value = pageUrl;

  copyPixButton.addEventListener("click", async () => {
    const copied = await copyText(PROMO_CONFIG.pixCopyPaste);
    if (copied) {
      showCopyFeedback(copyPixButton, { successLabel: "PIX copiado!" });
    }
  });

  sharePageButton.addEventListener("click", async () => {
    const message = buildShareMessage(PROMO_CONFIG, pageUrl);

    if (navigator.share) {
      try {
        await navigator.share({
          title: PROMO_CONFIG.productName,
          text: message,
          url: pageUrl,
        });
        return;
      } catch {
        /* user cancelled or share failed — fall through to clipboard */
      }
    }

    const copied = await copyText(message);
    if (copied) {
      showCopyFeedback(sharePageButton, {
        successLabel: "Link copiado!",
        durationMs: 2500,
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", bindPromoPage);
