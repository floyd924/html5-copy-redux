var Order = require("../app/order");
var Matcher = require("../app/matcher");
var Aggregator = require("../app/aggregator");
var Trade = require("../app/Trade");

describe("Aggregator", function() {

    var matcher;
    var orderBuy1, orderBuy2, orderBuy3, orderBuy4, orderBuy5, orderBuy6, orderBuy7;
    var orderSell1, orderSell2, orderSell3, orderSell4, orderSell5, orderSell6, orderSell7;
    var aggregator;

    var SELL = "SELL";
    var BUY = "BUY";

    beforeAll(function() {
        orderBuy1 = new Order(1, 100, 100, BUY);
        orderBuy2 = new Order(2, 50, 100, BUY);
        orderBuy3 = new Order(3, 50, 100, BUY);
        orderBuy4 = new Order(4, 70, 100, BUY);
        orderBuy5 = new Order(5, 70, 100, BUY);
        orderBuy6 = new Order(6, 70, 100, BUY);
        orderBuy7 = new Order(7, 70, 100, BUY);
        orderSell1 = new Order(8, 200, 100, SELL);
        orderSell2 = new Order(9, 200, 100, SELL);
        orderSell3 = new Order(10, 400, 100, SELL);
        orderSell4 = new Order(11, 500, 100, SELL);
        orderSell5 = new Order(12, 200, 100, SELL);
        orderSell6 = new Order(13, 200, 100, SELL);
        orderSell7 = new Order(14, 500, 100, SELL);

        aggregator = new Aggregator();
    });

    beforeEach(function(){
        trade = new Trade();
        matcher = new Matcher(trade);
        matcher.receiveOrder(orderBuy1);
        matcher.receiveOrder(orderBuy2);
        matcher.receiveOrder(orderBuy3);
        matcher.receiveOrder(orderBuy4);
        matcher.receiveOrder(orderBuy5);
        matcher.receiveOrder(orderBuy6);
        matcher.receiveOrder(orderBuy7);
        matcher.receiveOrder(orderSell1);
        matcher.receiveOrder(orderSell2);
        matcher.receiveOrder(orderSell3);
        matcher.receiveOrder(orderSell4);
        matcher.receiveOrder(orderSell5);
        matcher.receiveOrder(orderSell6);
        matcher.receiveOrder(orderSell7);
    });

    it("should receive an array of all orders and return a series of aggregated orders", function() {
        var publicOrders = aggregator.allOrders(matcher.getAllOrders());
        // console.log("IVAN ", aggregator.publicOrders);

        // console.log("IVAN ", aggregator.test);
        expect(publicOrders.length).toEqual(6);
        expect(publicOrders[0]).toEqual({'price': 100, 'quantity': 100, 'action': 'BUY'});
        expect(publicOrders[1]).toEqual({'price': 70, 'quantity': 400, 'action': 'BUY'});
        expect(publicOrders[2]).toEqual({'price': 50, 'quantity': 200, 'action': 'BUY'});
        expect(publicOrders[3]).toEqual({'price': 200, 'quantity': 400, 'action': 'SELL'});
        expect(publicOrders[4]).toEqual({'price': 400, 'quantity': 100, 'action': 'SELL'});
        expect(publicOrders[5]).toEqual({'price': 500, 'quantity': 200, 'action': 'SELL'});

        // better future format. Too much work to do now
        // expect(aggregator.publicOrders['BUY']).toEqual({'100': 100, '70': 400, '50': 200});
        // expect(aggregator.publicOrders['SELL']).toEqual({'200': 400, '400': 100, '500': 200});
    });

    it("should receive an array of all orders and return a private orderbook for a given account", function(){
        orderUserA1 = new Order(20, 100, 100, BUY);
        orderUserA2 = new Order(20, 110, 10, BUY);
        orderUserA3 = new Order(20, 115, 10, BUY);
        orderUserA4 = new Order(20, 130, 100, SELL);
        orderUserA5 = new Order(20, 130, 100, SELL);
        orderUserA6 = new Order(20, 130, 100, SELL);
        orderUserA7 = new Order(20, 160, 100, SELL);
        // order Id based on time, jasmine too fast and creates them in the same milisecond
        orderUserA2.id = 501020;
        orderUserA3.id = 601020;
        orderUserA4.id = 701020;
        orderUserA5.id = 801020;
        orderUserA6.id = 901020;
        orderUserA7.id = 101020;
        matcher.receiveOrder(orderUserA1);
        matcher.receiveOrder(orderUserA2);
        matcher.receiveOrder(orderUserA3);
        matcher.receiveOrder(orderUserA4);
        matcher.receiveOrder(orderUserA5);
        matcher.receiveOrder(orderUserA6);
        matcher.receiveOrder(orderUserA7);

        var privateOrders = aggregator.privateOrders(matcher.getAllOrders(), 20);
        // console.log(privateOrders);
        expect(privateOrders.length).toEqual(5);
        expect(privateOrders[0]).toEqual({'price': 115, 'quantity': 10, 'action': 'BUY'});
        expect(privateOrders[1]).toEqual({'price': 110, 'quantity': 10, 'action': 'BUY'});
        expect(privateOrders[2]).toEqual({'price': 100, 'quantity': 100, 'action': 'BUY'});
        expect(privateOrders[3]).toEqual({'price': 130, 'quantity': 300, 'action': 'SELL'});
        expect(privateOrders[4]).toEqual({'price': 160, 'quantity': 100, 'action': 'SELL'});
    });
});