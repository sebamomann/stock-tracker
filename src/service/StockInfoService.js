"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var si = require("stock-info");
var StockInfoService = /** @class */ (function () {
    function StockInfoService() {
    }
    StockInfoService.getStockInfo = function (ticker) {
        si.getSingleStockInfo(ticker).then(console.log);
    };
    return StockInfoService;
}());
exports.StockInfoService = StockInfoService;
