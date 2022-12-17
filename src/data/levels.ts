/**
 * The list of supported levels.
 *
 * After the initial release this list must have the same order and none of the levels must be removed, otherwise the
 * previously generated sharing links will stop working. If you need to change the order, use "position" property,
 * and if you need to hide some level, set "hidden" to true.
 *
 * New levels can only be added in the end of the list.
 *
 * See also /src/utils/state-encorder.ts
 *
 * key - The unique key which represents the level.
 * text - The list of strings shown in the legend and the level picker.
 * value - The number of points assigned to each level.
 * position - The position in the legend and the level picker.
 * color - The background color of the level in the legend and level picker. Also, the background color of the
 *         territories which have the same level.
 * hidden - Whether to show this level in the level picker or the legend. Set this to true when some level becomes
 *          deprecated.
 */
const levels = [
  {
    key: "default",
    text: {
      en: "Never been there",
      uz: "Boʻlmaganman",
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
      uz: "Bormoqchiman",
      ru: "Хочу побывать тут",
    },
    value: 0,
    position: 5,
    color: "#d6beff",
  },
  {
    key: "transit",
    text: {
      en: "Passed here",
      uz: "Yonidan oʻtdim",
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
      uz: "Bir kecha tunadim",
      ru: "Останавливался на ночь",
    },
    hidden: true,
    value: 2,
    position: 3,
    color: "#A8FFBE",
  },
  {
    key: "visited",
    text: {
      en: "Visited there",
      uz: "Tashrif buyurdim",
      ru: "Посещал",
    },
    value: 2,
    position: 2,
    color: "#A8FFBE",
  },
  {
    key: "stayed",
    text: {
      en: "Traveled there",
      uz: "Sayohat qildim",
      ru: "Путешествовал тут",
    },
    value: 3,
    position: 1,
    color: "#FFB57E",
  },
  {
    key: "lived",
    text: {
      en: "Lived there",
      uz: "Yashadim",
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
