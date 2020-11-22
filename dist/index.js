"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crawler_1 = __importDefault(require("./crawler"));
var analyzer1_1 = __importDefault(require("./analyzer1"));
var url = "http://e.vhall.com/category/4";
var analyzer1 = analyzer1_1.default.getInstance();
new crawler_1.default(url, analyzer1);
