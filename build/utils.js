"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStringMatch = exports.stringMatch = exports.cleanString = exports.printError = exports.printResults = exports.searchType = void 0;
var chalk_1 = __importDefault(require("chalk"));
var types_1 = require("./types");
function printResults(output) {
    if (output.length > 0)
        console.log(output);
    else
        console.log(chalk_1.default.bold.yellow(types_1.errorMsgs.NO_RESULTS));
}
exports.printResults = printResults;
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
