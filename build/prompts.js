"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAgainPrompt = exports.fieldSelectPrompt = exports.searchQueryPrompt = exports.fileSelectPrompt = void 0;
var stream_1 = require("./stream");
var types_1 = require("./types");
/*
  Prompt that lists available files to search from.
*/
function fileSelectPrompt() {
    var options = [
        { name: "Tickets", value: types_1.JSONFiles.TICKETS },
        { name: "Users", value: types_1.JSONFiles.USERS },
        { name: "Organizations", value: types_1.JSONFiles.ORGANIZATION },
    ];
    return {
        name: "searchFile",
        type: "list",
        message: "Select which file to search:",
        choices: options,
    };
}
exports.fileSelectPrompt = fileSelectPrompt;
/*
  Prompt which accepts search query string from user.
*/
function searchQueryPrompt() {
    return {
        name: "searchQuery",
        type: "input",
        message: "Enter your search query:",
    };
}
exports.searchQueryPrompt = searchQueryPrompt;
/*
  Prompt which lists all available search fields. This is dynamic and uses the
  previous question (fileSelectPrompt) to choose which file to fetch JSON keys from.
*/
function fieldSelectPrompt() {
    return {
        name: "searchField",
        type: "list",
        message: "Select which field to search:",
        choices: function (previous) { return stream_1.fetchProperties(previous.searchFile); },
    };
}
exports.fieldSelectPrompt = fieldSelectPrompt;
/*
  Yes or no prompt used to check whether the user wants to search again.
*/
function searchAgainPrompt() {
    return {
        name: "searchAgain",
        type: "confirm",
        message: "Search again?",
    };
}
exports.searchAgainPrompt = searchAgainPrompt;
