"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StockInfoService_1 = require("../services/StockInfoService");
var Stock = /** @class */ (function () {
    function Stock(ticker) {
        this.name = '';
        this.pricing = 0;
        this.ticker = ticker;
        this.getStockInfo();
    }
    Stock.prototype.getStockInfo = function () {
        var info = StockInfoService_1.StockInfoService.getStockInfo(this.ticker);
        console.log(info);
    };
    return Stock;
}());
exports.Stock = Stock;
