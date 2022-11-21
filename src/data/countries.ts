import { Locale } from "./locales";

export const sortedCountries = [
  {
    key: "Toshkent",
    en: "Toshkent",
    ru: "Ташкент",
  },
  {
    key: "Samarqand",
    en: "Samarkand",
    ru: "Самарканд",
  },
  {
    key: "Aktobe",
    en: "Aktobe",
    ru: "Актобе"
  },
  {
    key: "Oral",
    en: "Oral",
    ru: "Уральск"
  },
  {
    key: "Atyrau",
    en: "Atyrau",
    ru: "Атырау"
  },
  {
    key: "Aktau",
    en: "Aktau",
    ru: "Актау"
  },
  {
    key: "Qyzylorda",
    en: "Kyzylorda",
    ru: "Кызылорда"
  },
  {
    key: "Turkistan",
    en: "Shymkent",
    ru: "Шымкент"
  },
  {
    key: "Jambyl",
    en: "Taraz",
    ru: "Тараз"
  },
  {
    key: "Almaty",
    en: "Almaty",
    ru: "Алматы"
  },
  {
    key: "Oskemen",
    en: ["", "Oskemen"],
    ru: ["Усть-", "Каменогорск"]
  },
  {
    key: "Jetisu",
    en: "Taldykorgan",
    ru: "Талдыкорган"
  },
  {
    key: "Abai",
    en: "Semey",
    ru: "Семей"
  },
  {
    key: "Ulytau",
    en: "Jezkazgan",
    ru: "Жезказган"
  },
  {
    key: "Qostanai",
    en: "Kostanay",
    ru: "Костанай"
  },
  {
    key: "Petropavl",
    en: "Petropavl",
    ru: "Петропавловск"
  },
  {
    key: "Astana",
    en: "Astana",
    ru: "Астана"
  },
  {
    key: "Karaganda",
    en: "Karaganda",
    ru: "Караганда"
  },
  {
    key: "Pavlodar",
    en: "Pavlodar",
    ru: "Павлодар"
  },
  {
    key: "Osh",
    en: "Osh",
    ru: "Ош"
  },
  {
    key: "Naryn",
    en: "Naryn",
    ru: "Нарын"
  },
  {
    key: "Jalal-Abad",
    en: "Jalal-Abad",
    ru: "Джалал-Абад"
  },
  {
    key: "Bishkek",
    en: "Bishkek",
    ru: "Бишкек"
  },
  {
    key: "Talas",
    en: "Talas",
    ru: "Талас"
  },
  {
    key: "Karakol",
    en: "Karakol",
    ru: "Каракол"
  },
  {
    key: "Batken",
    en: "Batken",
    ru: "Баткен"
  },
  {
    key: "Karakalpakstan",
    en: "Nukus",
    ru: "Нукус"
  },
  {
    key: "Surxondaryo",
    en: "Termez",
    ru: "Термез"
  },
  {
    key: "Fergana",
    en: "Fergana",
    ru: "Фергана"
  },
  {
    key: "Andijon",
    en: "Andijon",
    ru: "Андижан"
  },
  {
    key: "Namangan",
    en: "Namangan",
    ru: "Наманган"
  },
  {
    key: "Jizzax",
    en: "Jizzax",
    ru: "Джизак"
  },
  {
    key: "Navoiy",
    en: "Navoiy",
    ru: "Навои"
  },
  {
    key: "Buxoro",
    en: "Bukhara",
    ru: "Бухара"
  },
  {
    key: "Qashqadaryo",
    en: "Karshi",
    ru: "Карши"
  },
  {
    key: "Xorazm",
    en: "Khiva",
    ru: "Хива"
  },
  {
    key: "Sirdaryo",
    en: "Guliston",
    ru: "Гулистан"
  },
  {
    key: "Sogd",
    en: "Khujand",
    ru: "Худжанд"
  },
  {
    key: "Dushanbe",
    en: "Dushanbe",
    ru: "Душанбе"
  },
  {
    key: "Bokhtar",
    en: "Bokhtar",
    ru: "Бохтар"
  },
  {
    key: "Pamir",
    en: "Khorugh",
    ru: "Хорог"
  },
  {
    key: "Dashoguz",
    en: "Dashoguz",
    ru: "Дашогуз"
  },
  {
    key: "Ashgabat",
    en: "Ashgabat",
    ru: "Ашхабад"
  },
  {
    key: "Balkanabat",
    en: "Balkanabat",
    ru: "Балканабат"
  },
  {
    key: "Mary",
    en: "Mary",
    ru: "Мары"
  },
  {
    key: "Lebap",
    en: "Lebap",
    ru: "Туркменабад"
  }
];

export const countries = sortedCountries.reduce((acc, { key, ...rest }) => {
  acc[key] = rest;

  return acc;
}, {} as Record<string, Record<Locale, string>>);
