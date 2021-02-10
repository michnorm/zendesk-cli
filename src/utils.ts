import chalk from "chalk";
import { errorMsgs } from "./types";

function printResults(output: object[]) {
  if (output.length > 0) console.log(output);
  else console.log(chalk.bold.yellow(errorMsgs.NO_RESULTS));
}

function printError(error: any) {
  console.log(chalk.bold.red(error));
}

function cleanString(input: string): string {
  const punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  return input.trim().toLowerCase().replace(punc_regex, "");
}

function stringMatch(
  source: string | boolean | number,
  query: string
): boolean {
  return cleanString(String(source)) === cleanString(query);
}

function listMatch<T>(
  source: T[],
  query: string,
  f: (x: T, y: string) => boolean
): boolean {
  return source.reduce((acc: boolean, curr: T) => acc || f(curr, query), false);
}

function listStringMatch(source: string[], query: string): boolean {
  return listMatch(source, query, stringMatch);
}

function searchType(
  source: string | string[] | boolean | number,
  query: string
): boolean {
  return Array.isArray(source)
    ? listStringMatch(source, query)
    : stringMatch(source, query);
}

export {
  searchType,
  printResults,
  printError,
  cleanString,
  stringMatch,
  listStringMatch,
};
