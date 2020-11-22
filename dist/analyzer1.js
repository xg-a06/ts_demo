"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Analyzer1 = /** @class */ (function () {
    function Analyzer1() {
    }
    Analyzer1.getInstance = function () {
        if (!Analyzer1.instance) {
            Analyzer1.instance = new Analyzer1();
        }
        return Analyzer1.instance;
    };
    Analyzer1.prototype.getResultData = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('.common-events-list li');
        var plays = [];
        items.map(function (index, item) {
            var title = $(item).find('.title').text();
            var count = parseInt($(item).find('.followers').text(), 10);
            plays.push({ title: title, count: count });
        });
        var result = {
            time: new Date().getTime(),
            data: plays
        };
        return result;
    };
    Analyzer1.prototype.updateResult = function (result, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[result.time] = result.data;
        return fileContent;
    };
    Analyzer1.prototype.analyze = function (html, filePath) {
        var result = this.getResultData(html);
        var content = this.updateResult(result, filePath);
        return JSON.stringify(content, null, '\t');
    };
    return Analyzer1;
}());
exports.default = Analyzer1;
