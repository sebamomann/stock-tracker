"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("../services/Database");
var Stock_1 = require("./Stock");
var StockList = /** @class */ (function () {
    function StockList() {
        this.list = [];
        this.loadStockList();
    }
    StockList.prototype.loadStockList = function () {
        var _this = this;
        var ownedStockTickers = Database_1.Database.loadOwnedStocks();
        ownedStockTickers.forEach(function (ticker) {
            var stock = new Stock_1.Stock(ticker);
            _this.list.push(stock);
        });
    };
    return StockList;
}());
exports.StockList = StockList;
