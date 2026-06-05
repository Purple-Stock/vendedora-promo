import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText, showCopyFeedback } from "../../src/clipboard.js";

describe("copyText", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses navigator.clipboard when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    const result = await copyText("pix-code");

    expect(result).toBe(true);
    expect(writeText).toHaveBeenCalledWith("pix-code");
  });

  it("falls back to execCommand when clipboard API is unavailable", async () => {
    vi.stubGlobal("navigator", {});
    const execCommand = vi.fn().mockReturnValue(true);
    document.execCommand = execCommand;

    const result = await copyText("fallback-pix");

    expect(result).toBe(true);
    expect(execCommand).toHaveBeenCalledWith("copy");
  });
});

describe("showCopyFeedback", () => {
  it("updates button label and restores it after delay", () => {
    vi.useFakeTimers();
    const button = document.createElement("button");
    button.textContent = "Copiar PIX";

    showCopyFeedback(button, { successLabel: "Copiado!", durationMs: 2000 });

    expect(button.textContent).toBe("Copiado!");
    expect(button.disabled).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(button.textContent).toBe("Copiar PIX");
    expect(button.disabled).toBe(false);

    vi.useRealTimers();
  });
});
