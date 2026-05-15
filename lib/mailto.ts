const CRLF = "\r\n";

/** Collapses line breaks/control chars so subject and inline product names stay mail URI–safe */
export function sanitizeForMailSnippet(value: string): string {
  return value
    .replace(/\r?\n+/g, " ")
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\uFEFF]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * pct-encodes subject/body separately. Uses CRLF in the plaintext body so clients
 * (notably Outlook) decode line breaks reliably after encodeURIComponent → %0D%0A.
 */
export function buildMailtoHref(options: {
  to: string;
  subject: string;
  bodyLines: readonly string[];
}): string {
  const { to, subject, bodyLines } = options;
  const plainBody = bodyLines.join(CRLF);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainBody)}`;
}
