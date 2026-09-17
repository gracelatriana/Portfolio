import { ui, defaultLocale, type Locale, type UIKey } from "./ui";

/** Returns a translator function `t(key)` bound to the given locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

/** Pick the correct language variant from a localized `{ en, id }` object. */
export function pick<T>(
  value: { en: T; id: T } | undefined,
  locale: Locale,
): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value[defaultLocale];
}

/**
 * Build a locale-aware path. English (default) is served at the root, so it
 * gets no prefix; Indonesian is served under `/id/`.
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean === "/" ? "/" : clean;
  return clean === "/" ? "/id/" : `/id${clean}`;
}

/**
 * Format an education/experience date range for display.
 * `endDate` absent renders the localized "Present" label.
 */
export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  presentLabel: string,
): string {
  const start = formatMonth(startDate);
  const end = endDate ? formatMonth(endDate) : presentLabel;
  return `${start} – ${end}`;
}

function formatMonth(value: string): string {
  // Accepts "YYYY", "YYYY-MM", or "YYYY-MM-DD".
  const parts = value.split("-");
  if (parts.length === 1) return parts[0];
  const [year, month] = parts;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const idx = parseInt(month, 10) - 1;
  const name = monthNames[idx] ?? month;
  return `${name} ${year}`;
}

/** Sort helper: reverse-chronological by a "YYYY-MM" style date string. */
export function byDateDesc(a: string, b: string): number {
  return b.localeCompare(a);
}
