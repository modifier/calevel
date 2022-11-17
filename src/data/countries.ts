import { Locale } from "./locales";

export const sortedCountries = [
  {
    key: "UK",
    en: "UK",
    ru: "СК",
  },
  {
    key: "Ireland",
    en: "Ireland",
    ru: "Ирландия",
  },
];

export const countries = sortedCountries.reduce((acc, { key, ...rest }) => {
  acc[key] = rest;

  return acc;
}, {} as Record<string, Record<Locale, string>>);
