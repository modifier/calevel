import { Locale } from "./locales";

/**
 * The list of territories and their translations.
 *
 * You mustn't remove items from this list after the initial release or change the order. The sharing functionality
 * depends on this order, if you change it, previously generated links will stop working.
 *
 * New levels can only be added in the end of the list.
 *
 * See also /src/utils/state-encorder.ts
 *
 * If some territory's name can be wrapped, use \n in the translation.
 */
export const sortedCountries = [
  {
    key: "Toshkent",
    en: "Tashkent",
    uz: "Toshkent",
    ru: "Ташкент",
  },
  {
    key: "Samarqand",
    en: "Samarkand",
    uz: "Samarqand",
    ru: "Самарканд",
  },
  {
    key: "Aktobe",
    en: "Aktobe",
    uz: "Aqtoʻbe",
    ru: "Актобе",
  },
  {
    key: "Oral",
    en: "Oral",
    uz: "Oʻral",
    ru: "Уральск",
  },
  {
    key: "Atyrau",
    en: "Atyrau",
    uz: "Atirau",
    ru: "Атырау",
  },
  {
    key: "Aktau",
    en: "Aktau",
    uz: "Aqtau",
    ru: "Актау",
  },
  {
    key: "Qyzylorda",
    en: "Kyzylorda",
    uz: "Qiziloʻrda",
    ru: "Кызылорда",
  },
  {
    key: "Turkistan",
    en: "Turkistan",
    uz: "Turkiston",
    ru: "Туркестан",
  },
  {
    key: "Shymkent",
    en: "Shymkent",
    uz: "Chimkent",
    ru: "Шымкент",
  },
  {
    key: "Jambyl",
    en: "Taraz",
    uz: "Taraz",
    ru: "Тараз",
  },
  {
    key: "Almaty",
    en: "Almaty",
    uz: "Olmaota",
    ru: "Алматы",
  },
  {
    key: "Oskemen",
    en: "\nOskemen",
    uz: "\nOʻskemen",
    ru: "Усть-\nКаменогорск",
  },
  {
    key: "Jetisu",
    en: "Taldykorgan",
    uz: "Taldiqoʻrgʻan",
    ru: "Талдыкорган",
  },
  {
    key: "Abai",
    en: "Semey",
    uz: "Semey",
    ru: "Семей",
  },
  {
    key: "Ulytau",
    en: "Jezkazgan",
    uz: "Jezqazgʻan",
    ru: "Жезказган",
  },
  {
    key: "Qostanai",
    en: "Kostanay",
    uz: "Qoʻstanay",
    ru: "Костанай",
  },
  {
    key: "Petropavl",
    en: "Petropavl",
    uz: "Petropavl",
    ru: "Петропавловск",
  },
  {
    key: "Astana",
    en: "Astana",
    uz: "Ostona",
    ru: "Астана",
  },
  {
    key: "Karaganda",
    en: "Karaganda",
    uz: "Qaragʻandi",
    ru: "Караганда",
  },
  {
    key: "Pavlodar",
    en: "Pavlodar",
    uz: "Pavlodar",
    ru: "Павлодар",
  },
  {
    key: "Osh",
    en: "Osh",
    uz: "Oʻsh",
    ru: "Ош",
  },
  {
    key: "Naryn",
    en: "Naryn",
    uz: "Narin",
    ru: "Нарын",
  },
  {
    key: "Jalal-Abad",
    en: "Jalal-Abad",
    uz: "Jalolobod",
    ru: "Джалал-Абад",
  },
  {
    key: "Bishkek",
    en: "Bishkek",
    uz: "Bishkek",
    ru: "Бишкек",
  },
  {
    key: "Talas",
    en: "Talas",
    uz: "Talas",
    ru: "Талас",
  },
  {
    key: "Karakol",
    en: "Karakol",
    uz: "Qoraqoʻl",
    ru: "Каракол",
  },
  {
    key: "Batken",
    en: "Batken",
    uz: "Botken",
    ru: "Баткен",
  },
  {
    key: "Karakalpakstan",
    en: "Nukus",
    uz: "Nukus",
    ru: "Нукус",
  },
  {
    key: "Surxondaryo",
    en: "Termez",
    uz: "Termiz",
    ru: "Термез",
  },
  {
    key: "Fergana",
    en: "Fergana",
    uz: "Fargʻona",
    ru: "Фергана",
  },
  {
    key: "Andijon",
    en: "Andijan",
    uz: "Andijon",
    ru: "Андижан",
  },
  {
    key: "Namangan",
    en: "Namangan",
    uz: "Namangan",
    ru: "Наманган",
  },
  {
    key: "Jizzax",
    en: "Jizzakh",
    uz: "Jizzax",
    ru: "Джизак",
  },
  {
    key: "Navoiy",
    en: "Navoiy",
    uz: "Navoiy",
    ru: "Навои",
  },
  {
    key: "Buxoro",
    en: "Bukhara",
    uz: "Buxoro",
    ru: "Бухара",
  },
  {
    key: "Qashqadaryo",
    en: "Qarshi",
    uz: "Qarshi",
    ru: "Карши",
  },
  {
    key: "Xorazm",
    en: "Khiva",
    uz: "Xiva",
    ru: "Хива",
  },
  {
    key: "Sirdaryo",
    en: "Gulistan",
    uz: "Guliston",
    ru: "Гулистан",
  },
  {
    key: "Sogd",
    en: "Khujand",
    uz: "Xoʻjand",
    ru: "Худжанд",
  },
  {
    key: "Dushanbe",
    en: "Dushanbe",
    uz: "Dushanbe",
    ru: "Душанбе",
  },
  {
    key: "Bokhtar",
    en: "Bokhtar",
    uz: "Boxtar",
    ru: "Бохтар",
  },
  {
    key: "Pamir",
    en: "Khorugh",
    uz: "Xorugʻ",
    ru: "Хорог",
  },
  {
    key: "Dashoguz",
    en: "Dashoguz",
    uz: "Toshhovuz",
    ru: "Дашогуз",
  },
  {
    key: "Ashgabat",
    en: "Ashgabat",
    uz: "Ashxobod",
    ru: "Ашхабад",
  },
  {
    key: "Balkanabat",
    en: "Balkanabat",
    uz: "Bolqonobod",
    ru: "Балканабат",
  },
  {
    key: "Mary",
    en: "Mary",
    uz: "Mari",
    ru: "Мары",
  },
  {
    key: "Lebap",
    en: "Türkmenabat",
    uz: "Turkmanobod",
    ru: "Туркменабад",
  },
];

export const countries = sortedCountries.reduce((acc, { key, ...rest }) => {
  acc[key] = rest as Record<Locale, string>;

  return acc;
}, {} as Record<string, Record<Locale, string>>);
