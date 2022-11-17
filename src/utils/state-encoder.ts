import {sortedCountries} from "../data/countries";
import levels from "../data/levels";

const RADIX = 16;

export function encodeState(levelsByCountry: Record<string, string>): string {
  let sortedState = "";
  const radix = levels.length;
  for (const country of sortedCountries) {
    const level = levelsByCountry[country.key] || 'default';
    const levelIndex = levels.findIndex(item => item.key === level);
    const levelLetter = Number(levelIndex).toString(radix);

    sortedState += levelLetter;
  }

  const stateNumber = parseInt(sortedState, radix);

  return Number(stateNumber).toString(RADIX);
}

export function decodeState(code: string): Record<string, string> {
  const stateNumber = parseInt(code, RADIX);

  const sortedState = Number(stateNumber).toString(levels.length);
  const state: Record<string, string> = {};
  for (let i = 0; i < sortedState.length; i++) {
    const levelLetter = sortedState[i];
    const levelIndex = parseInt(levelLetter, levels.length);
    const level = levels[levelIndex];

    if (level.key !== 'default') {
      const country = sortedCountries[i];
      state[country.key] = level.key;
    }
  }

  return state;
}

export function getSharedState(): Record<string, string> | null {
  const params = (new URL(document.location)).searchParams;
  const code = params.get('code');

  if (!code) {
    return null;
  }

  return decodeState(code);
}

export function getSavedCountries(): Record<string, string> {
  const savedCountries = localStorage.getItem('countries');
  if (savedCountries) {
    try {
      return JSON.parse(savedCountries);
    }
    catch (e) {}
  }

  return {};
}