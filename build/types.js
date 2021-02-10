"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMsgs = exports.JSONFiles = void 0;
var JSONFiles;
(function (JSONFiles) {
    JSONFiles["TICKETS"] = "src/data/tickets.json";
    JSONFiles["ORGANIZATION"] = "src/data/organizations.json";
    JSONFiles["USERS"] = "src/data/users.json";
})(JSONFiles || (JSONFiles = {}));
exports.JSONFiles = JSONFiles;
var errorMsgs;
(function (errorMsgs) {
    errorMsgs["UNSUPPORTED_ENV"] = "Error: Terminal environment is unsupported";
    errorMsgs["EMPTY_OBJECT"] = "Error: Cannot search empty object";
    errorMsgs["NO_RESULTS"] = "No results found";
})(errorMsgs || (errorMsgs = {}));
exports.errorMsgs = errorMsgs;
