var Order = require("../app/order");
var Matcher = require("../app/matcher");
var Aggregator = require("../app/aggregator");
var Trade = require("../app/trade");

describe("Trade", function() {

    var matcher;
    var trade;
    var orderBuy1, orderBuy2, orderBuy3, orderBuy4, orderBuy5, orderBuy6, orderBuy7;
    var orderSell1, orderSell2, orderSell3, orderSell4, orderSell5, orderSell6, orderSell7;

    var SELL = "SELL";
    var BUY = "BUY";

    beforeAll(function() {
        
    });

    beforeEach(function(){
        trade = new Trade();
        matcher = new Matcher(trade);
    });

    it("should receive trades and store them", function() {
        orderBuy1 = new Order(1, 500, 100, BUY);
        orderSell1 = new Order(2, 500, 100, SELL);

        matcher.receiveOrder(orderBuy1);
        matcher.receiveOrder(orderSell1);
        expect(trade.book.length).toEqual(1);
        
        expect(orderChecker(trade.book[0].BUY, orderBuy1)).toBeTruthy(); 
        expect(orderChecker(trade.book[0].SELL, orderSell1)).toBeTruthy(); 
        
        orderBuy2 = new Order(3, 200, 100, BUY);
        orderSell2 = new Order(4, 200, 75, SELL);
        orderSell3 = new Order(5, 200, 25, SELL);
        
        
        matcher.receiveOrder(orderBuy2);
        matcher.receiveOrder(orderSell2);
        matcher.receiveOrder(orderSell3);

        expect(trade.book.length).toEqual(3);

        orderBuy2FirstTrade = new Order();
        orderBuy2FirstTrade = orderBuy2FirstTrade.setWithSize(orderBuy2, orderSell2.quantity);
        orderBuy2SecondTrade = new Order();
        orderBuy2SecondTrade = orderBuy2SecondTrade.setWithSize(orderBuy2, orderSell3.quantity);

        expect(orderChecker(trade.book[1].BUY, orderBuy2FirstTrade)).toBeTruthy(); 
        expect(orderChecker(trade.book[1].SELL, orderSell2)).toBeTruthy(); 
        expect(orderChecker(trade.book[2].BUY, orderBuy2SecondTrade)).toBeTruthy(); 
        expect(orderChecker(trade.book[2].SELL, orderSell3)).toBeTruthy(); 
    });

    var orderChecker = function(order1, order2) {
        if(order1.account != order2.account)
            return false
        if(order1.price != order2.price)
            return false;
        if(order1.quantity != order2.quantity)
            return false;
        if(order1.action != order2.action)
            return false;
        if(order1.id != order2.id)
            return false;
        if(order1.priority != order2.priority)
            return false;

        return true;
    }

});