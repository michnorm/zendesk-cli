import chalk from "chalk";
import { Observable } from "rxjs";
import { defaultIfEmpty, finalize } from "rxjs/operators";

/*
  Takes stream and prints to console. The emptyResult parameter is printed
  to console if the stream is empty. The callback is called once the stream has
  completed. No need to unsubscribe as stream completes.
*/
function printStream<T>(
  stream: Observable<T>,
  emptyResult: T | string,
  callback: () => void
) {
  stream
    .pipe(
      defaultIfEmpty(emptyResult),
      finalize(() => callback())
    )
    .subscribe(console.log);
}

/*
  Takes input and prints in console using red colour
*/
function printError(error: any) {
  console.log(chalk.bold.red(error));
}

/*
  Takes string, removes trailing whitespace, coverts to lowercase and removes
  punctuation.
*/
function cleanString(input: string): string {
  const punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  return input.trim().toLowerCase().replace(punc_regex, "");
}

/*
  Takes source and query, converts to string if needed, cleans both strings
  and returns whether they are equal.
*/
function stringMatch(
  source: string | boolean | number,
  query: string
): boolean {
  return cleanString(String(source)) === cleanString(query);
}

/*
  Checks whether any element in a list matches a given predicate function.
*/
function listMatch<T>(
  source: T[],
  query: string,
  f: (x: T, y: string) => boolean
): boolean {
  return source.reduce((acc: boolean, curr: T) => acc || f(curr, query), false);
}

/*
  Checks whether any string in a list of strings matches a given query string.
*/
function listStringMatch(source: string[], query: string): boolean {
  return listMatch(source, query, stringMatch);
}

/*
  Selects which search function should be called for a given search field. For lists,
  listStringMatch should be called, and any other type should use stringMatch.
*/
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
  printStream,
  printError,
  cleanString,
  stringMatch,
  listStringMatch,
};
