"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMsgs = exports.JSONFiles = void 0;
// Paths to JSON files
var JSONFiles;
(function (JSONFiles) {
    JSONFiles["TICKETS"] = "src/data/tickets.json";
    JSONFiles["ORGANIZATION"] = "src/data/organizations.json";
    JSONFiles["USERS"] = "src/data/users.json";
})(JSONFiles || (JSONFiles = {}));
exports.JSONFiles = JSONFiles;
// Common error messages
var errorMsgs;
(function (errorMsgs) {
    errorMsgs["UNSUPPORTED_ENV"] = "Error: Terminal environment is unsupported";
    errorMsgs["EMPTY_OBJECT"] = "Error: Cannot search empty object";
    errorMsgs["NO_RESULTS"] = "No results found";
    errorMsgs["FILE_DOES_NOT_EXIST"] = "Error: You file you requested does not exist";
})(errorMsgs || (errorMsgs = {}));
exports.errorMsgs = errorMsgs;
