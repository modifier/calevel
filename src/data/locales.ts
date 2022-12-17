import { IconName } from "../components/atoms/ca-icon";

/**
 * The list of locales and their names in their language.
 */
export const locales = {
  en: "English",
  ru: "Русский",
  uz: "Oʻzbek",
};

export type Locale = keyof typeof locales;

/**
 * The default locale which is used if it's impossible to detect user's locale.
 *
 * See /src/utils/locale.ts for locale detection algorithm.
 */
export const DEFAULT_LOCALE: Locale = "ru";

/**
 * Icon names of the locales. The value is an icon name that's supported by ca-icon object.
 *
 * You can add new icons if needed in /src/components/atoms/ca-icon.ts.
 */
export const localeIcons: Record<Locale, IconName> = {
  en: "enFlag",
  ru: "ruFlag",
  uz: "uzFlag",
};
