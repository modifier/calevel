import { DEFAULT_LOCALE, Locale, locales } from "../data/locales";

export function getDefaultLocale(): Locale {
  let lang = localStorage.getItem("lang");
  if (lang && locales.hasOwnProperty(lang)) {
    return lang as Locale;
  }

  const chosenLanguage = navigator.languages.find((lang) =>
    locales.hasOwnProperty(lang)
  );

  if (chosenLanguage) {
    return chosenLanguage as Locale;
  }

  return DEFAULT_LOCALE;
}
