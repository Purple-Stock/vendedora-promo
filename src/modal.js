const OPEN_CLASS = "flex";
const CLOSED_CLASS = "hidden";

export function isModalOpen(modal) {
  return modal.classList.contains(OPEN_CLASS);
}

export function openModal(modal) {
  modal.classList.remove(CLOSED_CLASS);
  modal.classList.add(OPEN_CLASS);
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

export function closeModal(modal) {
  modal.classList.remove(OPEN_CLASS);
  modal.classList.add(CLOSED_CLASS);
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

export function bindPixModal({
  trigger,
  modal,
  closeButton,
  backdrop,
  modalImage,
  imageSrc,
}) {
  if (!trigger || !modal || !closeButton) return;

  if (modalImage && imageSrc) {
    modalImage.src = imageSrc;
    modalImage.alt = "QR Code PIX ampliado para pagamento";
  }

  trigger.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  if (backdrop) {
    backdrop.addEventListener("click", () => closeModal(modal));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalOpen(modal)) {
      closeModal(modal);
    }
  });
}
