"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStringMatch = exports.stringMatch = exports.cleanString = exports.printError = exports.printStream = exports.searchType = void 0;
var chalk_1 = __importDefault(require("chalk"));
var operators_1 = require("rxjs/operators");
/*
  Takes stream and prints to console. The emptyResult parameter is printed
  to console if the stream is empty. The callback is called once the stream has
  completed. No need to unsubscribe as stream completes.
*/
function printStream(stream, emptyResult, callback) {
    stream
        .pipe(operators_1.defaultIfEmpty(emptyResult), operators_1.finalize(function () { return callback(); }))
        .subscribe(console.log);
}
exports.printStream = printStream;
/*
  Takes input and prints in console using red colour
*/
function printError(error) {
    console.log(chalk_1.default.bold.red(error));
}
exports.printError = printError;
/*
  Takes string, removes trailing whitespace, coverts to lowercase and removes
  punctuation.
*/
function cleanString(input) {
    var punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    return input.trim().toLowerCase().replace(punc_regex, "");
}
exports.cleanString = cleanString;
/*
  Takes source and query, converts to string if needed, cleans both strings
  and returns whether they are equal.
*/
function stringMatch(source, query) {
    return cleanString(String(source)) === cleanString(query);
}
exports.stringMatch = stringMatch;
/*
  Checks whether any element in a list matches a given predicate function.
*/
function listMatch(source, query, f) {
    return source.reduce(function (acc, curr) { return acc || f(curr, query); }, false);
}
/*
  Checks whether any string in a list of strings matches a given query string.
*/
function listStringMatch(source, query) {
    return listMatch(source, query, stringMatch);
}
exports.listStringMatch = listStringMatch;
/*
  Selects which search function should be called for a given search field. For lists,
  listStringMatch should be called, and any other type should use stringMatch.
*/
function searchType(source, query) {
    return Array.isArray(source)
        ? listStringMatch(source, query)
        : stringMatch(source, query);
}
exports.searchType = searchType;
