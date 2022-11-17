const levels = [
  {
    key: "default",
    text: {
      "en": "Never been there",
      "ru": "Никогда тут не был",
    },
    value: 0,
    color: "#FFF"
  },
  {
    key: "stayed",
    text: {
      "en": "Stayed here",
      "ru": "Останавливался тут",
    },
    value: 4,
    color: "#FFB57E"
  },
  {
    key: "lived",
    text: {
      "en": "Lived here",
      "ru": "Жил тут",
    },
    value: 5,
    color: "#FF7E7E"
  }
];

console.assert(levels.length < 36, "There cannot be more than 36 levels, otherwise encoding doesn't work");

export default levels;