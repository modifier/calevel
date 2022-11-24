const levels = [
  {
    key: "default",
    text: {
      en: "Never been there",
      uz: "Never been there",
      ru: "Никогда тут не был",
    },
    value: 0,
    position: 6,
    color: "#FFF",
  },
  {
    key: "wannabe",
    text: {
      en: "Want to be there",
      uz: "Want to be there",
      ru: "Приехал бы",
    },
    value: 0,
    position: 5,
    color: "#d6beff",
  },
  {
    key: "transit",
    text: {
      en: "Passed here",
      uz: "Passed here",
      ru: "Проезжал мимо",
    },
    value: 1,
    position: 4,
    color: "#88AEFF",
  },
  {
    key: "stopped",
    text: {
      en: "Stopped there",
      uz: "Stopped there",
      ru: "Останавливался на ночь",
    },
    value: 2,
    position: 3,
    color: "#A8FFBE",
  },
  {
    key: "visited",
    text: {
      en: "Visited there",
      uz: "Visited there",
      ru: "Посещал",
    },
    value: 3,
    position: 2,
    color: "#FFE57E",
  },
  {
    key: "stayed",
    text: {
      en: "Traveled there",
      uz: "Traveled there",
      ru: "Путешествовал тут",
    },
    value: 4,
    position: 1,
    color: "#FFB57E",
  },
  {
    key: "lived",
    text: {
      en: "Lived there",
      uz: "Lived there",
      ru: "Жил тут",
    },
    value: 5,
    position: 0,
    color: "#FF7E7E",
  },
];

console.assert(
  levels.length < 36,
  "There cannot be more than 36 levels, otherwise encoding doesn't work"
);

export default levels;
