import { sortedCountries } from "../data/countries";
import levels from "../data/levels";

const RADIX = 64;

export function encodeState(levelsByCountry: Record<string, string>): string {
  let sortedState = "";
  const radix = levels.length;
  for (const country of sortedCountries) {
    const level = levelsByCountry[country.key] || "default";
    const levelIndex = levels.findIndex((item) => item.key === level);
    const levelLetter = Number(levelIndex).toString(radix);

    sortedState += levelLetter;
  }

  const stateNumber = parseBigInt(sortedState, radix);

  return toAnyBase(stateNumber, RADIX);
}

export function decodeState(code: string): Record<string, string> {
  const stateNumber = parseBigInt(code, RADIX);

  const sortedState = stateNumber
    .toString(levels.length)
    .padStart(sortedCountries.length, "0");
  const state: Record<string, string> = {};
  for (let i = 0; i < sortedState.length; i++) {
    const levelLetter = sortedState[i];
    const levelIndex = parseInt(levelLetter, levels.length);
    const level = levels[levelIndex];

    if (level.key !== "default") {
      const country = sortedCountries[i];
      state[country.key] = level.key;
    }
  }

  return state;
}

export function getSharedState(): Record<string, string> | null {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  if (!code) {
    return null;
  }

  try {
    return decodeState(code);
  } catch (e) {
    console.warn(`Could not decode state [code=${code}]`);

    return null;
  }
}

export function getSavedCountries(): Record<string, string> {
  const savedCountries = localStorage.getItem("countries");
  if (savedCountries) {
    try {
      return JSON.parse(savedCountries);
    } catch (e) {}
  }

  return {};
}

const keyspace =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

// source: https://stackoverflow.com/questions/55646698/base-36-to-bigint
function parseBigInt(numberString: string, radix: number) {
  let result = 0n;
  const keyspaceLength = BigInt(radix);
  for (let i = 0; i < numberString.length; i++) {
    const value = keyspace.indexOf(numberString[i]);
    if (value === -1) throw new Error("invalid string");
    result = result * keyspaceLength + BigInt(value);
  }
  return result;
}

function toAnyBase(num: bigint, radix: number) {
  const nRadix = BigInt(radix);
  let result = "";

  let residual = num;
  do {
    result = keyspace.charAt(Number(residual % nRadix)) + result;
    residual = residual / nRadix;
  } while (residual !== 0n);

  return result;
}
