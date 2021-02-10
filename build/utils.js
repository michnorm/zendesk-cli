"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStringMatch = exports.stringMatch = exports.cleanString = exports.printError = exports.printStream = exports.searchType = void 0;
var chalk_1 = __importDefault(require("chalk"));
var operators_1 = require("rxjs/operators");
function printStream(stream, emptyResult, callback) {
    stream
        .pipe(operators_1.defaultIfEmpty(emptyResult), operators_1.finalize(function () { return callback(); }))
        .subscribe(console.log);
}
exports.printStream = printStream;
function printError(error) {
    console.log(chalk_1.default.bold.red(error));
}
exports.printError = printError;
function cleanString(input) {
    var punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    return input.trim().toLowerCase().replace(punc_regex, "");
}
exports.cleanString = cleanString;
function stringMatch(source, query) {
    return cleanString(String(source)) === cleanString(query);
}
exports.stringMatch = stringMatch;
function listMatch(source, query, f) {
    return source.reduce(function (acc, curr) { return acc || f(curr, query); }, false);
}
function listStringMatch(source, query) {
    return listMatch(source, query, stringMatch);
}
exports.listStringMatch = listStringMatch;
function searchType(source, query) {
    return Array.isArray(source)
        ? listStringMatch(source, query)
        : stringMatch(source, query);
}
exports.searchType = searchType;
