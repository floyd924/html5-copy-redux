var Order = require("../app/order");

var BUY = "BUY";
var SELL = "SELL";

function trade() {

    this.book = [];
    this.size = 0;
    this.marketAveragePrice = 0;
    this.receive = function(buyOrder, sellOrder) {
        var d = new Date();
        this.book[this.size] = {'BUY': buyOrder, 'SELL': sellOrder, timeStamp: d.getTime()};
        if(this.marketAveragePrice === 0) {
            this.marketAveragePrice = sellOrder.price;
        } else {
            this.marketAveragePrice = this.marketAveragePrice + ((sellOrder.price - this.marketAveragePrice) / this.book.length);
        }
        this.size ++;
    }

    this.getAllTrades = function() {
        return this.book;
    }

    this.exportBook = function() {
        var tradeBook = [];
        for(i in this.book) {
            var bookTemp = this.book[i];
            tradeBook.push({
                quantity: bookTemp.BUY.quantity,
                price: bookTemp.SELL.price,
                accountTo: bookTemp.SELL.accountId,
                accountFrom: bookTemp.BUY.accountId,
                sellOrderId: bookTemp.SELL.id,
                buyOrderId: bookTemp.BUY.id,
                timeStamp: bookTemp.timeStamp,
            });
        }
        return tradeBook;
    }
};

module.exports = trade;