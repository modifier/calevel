import enFlag from "flag-icons/flags/4x3/gb.svg";
import ruFlag from "flag-icons/flags/4x3/ru.svg";

export const locales = {
  en: "English",
  ru: "Русский",
};

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "ru";

export const localeIcons: Record<Locale, string> = {
  en: enFlag,
  ru: ruFlag,
}