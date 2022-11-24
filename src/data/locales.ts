export const locales = {
  en: "English",
  ru: "Русский",
  uz: "O'zbek",
};

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "ru";

export const localeIcons: Record<Locale, string> = {
  en: "enFlag",
  ru: "ruFlag",
  uz: "uzFlag",
};
