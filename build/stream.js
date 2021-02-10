"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.searchJSON = exports.fetchProperties = exports.createJSONStream = void 0;
var fs_1 = require("fs");
var jsonstream_1 = require("jsonstream");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var types_1 = require("./types");
var utils_1 = require("./utils");
function getValue(obj, name) {
    return obj[name];
}
exports.getValue = getValue;
// Check types, unsubscribe from streams
function createJSONStream(filePath) {
    if (!fs_1.existsSync(filePath))
        return Promise.reject(types_1.errorMsgs.FILE_DOES_NOT_EXIST);
    var jsonFile = fs_1.createReadStream(filePath);
    return Promise.resolve(new rxjs_1.Observable(function (observer) {
        jsonFile
            .pipe(jsonstream_1.parse("*"))
            .on("data", function (data) { return observer.next(data); })
            .on("error", function (err) { return observer.error(err); })
            .on("end", function () {
            jsonFile.destroy();
            return observer.complete();
        });
    }));
}
exports.createJSONStream = createJSONStream;
function fetchProperties(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var stream, first_obj, props;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createJSONStream(filePath)];
                case 1:
                    stream = _a.sent();
                    return [4 /*yield*/, stream.pipe(operators_1.first()).toPromise()];
                case 2:
                    first_obj = _a.sent();
                    props = Object.keys(first_obj);
                    if (props.length === 0)
                        return [2 /*return*/, Promise.reject(types_1.errorMsgs.EMPTY_OBJECT)];
                    else
                        return [2 /*return*/, props];
                    return [2 /*return*/];
            }
        });
    });
}
exports.fetchProperties = fetchProperties;
function searchJSON(state) {
    return __awaiter(this, void 0, void 0, function () {
        var stream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createJSONStream(state.searchFile)];
                case 1:
                    stream = _a.sent();
                    return [2 /*return*/, stream.pipe(operators_1.filter(function (item) {
                            return utils_1.searchType(getValue(item, state.searchField), state.searchQuery);
                        }))];
            }
        });
    });
}
exports.searchJSON = searchJSON;
