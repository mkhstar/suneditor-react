"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getLanguage = function (lang) {
    switch (typeof lang) {
        case "object":
            return lang;
        case "string":
            return require("suneditor/src/lang/" + lang + ".js");
        default:
            return undefined;
    }
};
exports.default = getLanguage;
