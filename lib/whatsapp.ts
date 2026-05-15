/** Digits only, including country code (no +). Example: 919876543210 */
export function normalizeWhatsAppNumber(
  raw: string | undefined | null,
): string | null {
  if (raw == null || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return digits;
}

export function buildWhatsAppUrl(phoneDigits: string, message?: string): string {
  const base = `https://wa.me/${phoneDigits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppInquiryUrl(
  message?: string,
  envValue: string | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): string | null {
  const n = normalizeWhatsAppNumber(envValue);
  if (!n) return null;
  return buildWhatsAppUrl(n, message);
}
