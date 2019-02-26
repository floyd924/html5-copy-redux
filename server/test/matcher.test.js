const Matcher = require("../app/matcher");

describe("Matcher", () => {
    let matcher;
    
    beforeEach(() => {
        matcher = new Matcher();

    });


    
    it("can save an order", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        expect(matcher.allPendingOrders.length).toBe(1);
    })

    it("can save multiple orders", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        matcher.newOrder("current", 1.3, 50, "SELL");
        expect(matcher.allPendingOrders.length).toBe(2);
    })

    it("can count buy orders", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        matcher.newOrder("current", 1.3, 50, "BUY");
        expect(matcher.allPendingOrders.length).toBe(1);
        expect(matcher.buyOrders.length).toBe(1);
    })

    it("can count sell orders", () =>{
        matcher.newOrder("Iain", 1.25, 20, "SELL");
        matcher.newOrder("Banjamin", 1.3, 50, "SELL");
        matcher.newOrder("Steve", 1.3, 1, "BUY");
        expect(matcher.allPendingOrders.length).toBe(2);
        expect(matcher.sellOrders.length).toBe(2);
    })

    it("will make a sale at the best price for the seller", () => {
        matcher.newOrder("bob", 17, 20, "BUY");
        matcher.newOrder("jim", 20, 20, "BUY");
        matcher.newOrder("dave", 15, 20, "BUY");
        matcher.newOrder("stan", 17, 20, "BUY");
        matcher.newOrder("dan", 17, 20, "SELL");
        expect(matcher.buyOrders[2].price).toBe(15);
    })

    it("will make a sale at the best price for the buyer", () => {
        matcher.newOrder("iain", 20, 20, "SELL");
        matcher.newOrder("alex", 15, 20, "SELL");
        matcher.newOrder("sean", 18, 20, "SELL");
        matcher.newOrder("michael", 26, 20, "SELL");
        matcher.newOrder("bob", 28, 20, "BUY");
        expect(matcher.sellOrders[0].price).toBe(18);
        expect(matcher.sellOrders[2].price).toBe(26);
    })

    it("will take small amounts from 3 consecutive orders, deleting empty ones after all transactions have taken place", () => {
        matcher.newOrder("small", 10, 1, "SELL");
        matcher.newOrder("med", 10, 2, "SELL");
        matcher.newOrder("large", 10, 3, "SELL");
        matcher.newOrder("XL", 10, 10, "SELL");
        matcher.newOrder("iain", 10, 10, "BUY");
        expect(matcher.sellOrders.length).toBe(1);
    })

    it("will get all orders for iain", () => {
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("Steve", 10, 1, "SELL");
        matcher.newOrder("Steve", 10, 1, "SELL");
        matcher.newOrder("iain", 10, 1, "SELL");
        expect(matcher.getAllOrdersByName("iain").length).toBe(4);
    })

    it("will get all orders for iain", () => {
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("iain", 10, 1, "BUY");
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("Steve", 10, 1, "SELL");
        matcher.newOrder("Steve", 10, 1, "SELL");
        matcher.newOrder("iain", 10, 1, "SELL");
        expect(matcher.getAllOrdersByName("iain").length).toBe(2);
    })

    it("can add completed trades", () => {
        matcher.newOrder("iain", 10, 1, "SELL");
        matcher.newOrder("steve", 10, 1, "BUY");
        expect(matcher.getRecentTrades().length).toBe(1);
    })

});