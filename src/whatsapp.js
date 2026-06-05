export function buildWhatsAppUrl(phone, message = "") {
  const digits = phone.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);

  if (message) {
    url.searchParams.set("text", message);
  }

  return url.toString();
}
