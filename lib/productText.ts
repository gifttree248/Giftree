const SHORT_DESCRIPTION_FALLBACK_LENGTH = 100;

function normalizeText(value?: string | null): string {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function truncateWithEllipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function getProductShortDescription(
  shortDescription?: string | null,
  description?: string | null,
): string {
  const normalizedShortDescription = normalizeText(shortDescription);
  if (normalizedShortDescription) return normalizedShortDescription;

  const normalizedDescription = normalizeText(description);
  if (!normalizedDescription) return "";

  return truncateWithEllipsis(
    normalizedDescription,
    SHORT_DESCRIPTION_FALLBACK_LENGTH,
  );
}
