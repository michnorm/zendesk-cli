"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStringMatch = exports.stringMatch = exports.cleanString = exports.printError = exports.printResults = exports.searchType = void 0;
var chalk_1 = __importDefault(require("chalk"));
var stream_1 = require("./stream");
var types_1 = require("./types");
function printResults(output) {
    if (output.length > 0) {
        var formatted = output.map(function (obj) {
            return __assign(__assign({}, obj), { tags: String(stream_1.getValue(obj, "tags")) });
        });
        console.table(formatted);
    }
    else {
        console.log(chalk_1.default.bold.yellow(types_1.errorMsgs.NO_RESULTS));
    }
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
