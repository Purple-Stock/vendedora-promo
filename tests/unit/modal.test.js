import { afterEach, describe, expect, it } from "vitest";
import { closeModal, isModalOpen, openModal } from "../../src/modal.js";

function createModalFixture() {
  document.body.innerHTML = `
    <div id="pix-modal" data-testid="pix-modal" class="hidden" aria-hidden="true">
      <button id="pix-modal-close" data-testid="pix-modal-close" type="button">Fechar</button>
      <img id="pix-modal-image" data-testid="pix-modal-image" alt="" />
    </div>
  `;

  return {
    modal: document.getElementById("pix-modal"),
    closeButton: document.getElementById("pix-modal-close"),
    modalImage: document.getElementById("pix-modal-image"),
  };
}

describe("modal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "";
  });

  it("opens modal and locks body scroll", () => {
    const { modal } = createModalFixture();

    openModal(modal);

    expect(isModalOpen(modal)).toBe(true);
    expect(modal.getAttribute("aria-hidden")).toBe("false");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes modal and restores body scroll", () => {
    const { modal } = createModalFixture();
    openModal(modal);

    closeModal(modal);

    expect(isModalOpen(modal)).toBe(false);
    expect(modal.getAttribute("aria-hidden")).toBe("true");
    expect(document.body.style.overflow).toBe("");
  });
});
