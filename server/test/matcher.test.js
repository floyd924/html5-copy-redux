const Matcher = require("../app/matcher");
const Order = require("../app/matcher");

describe("Matcher", () => {
    let matcher;
    let order1;
    let order2;
    
    beforeEach(() => {
        matcher = new Matcher();

    });


    
    it("can save an order", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        expect(matcher.allOrders.length).toBe(1);
    })

    it("can save multiple orders", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        matcher.newOrder("current", 1.3, 50, "BUY");
        expect(matcher.allOrders.length).toBe(2);
    })

    it("can count buy orders", () => {
        matcher.newOrder("current", 1.25, 20, "SELL");
        matcher.newOrder("current", 1.3, 50, "BUY");
        expect(matcher.allOrders.length).toBe(2);
        expect(matcher.buyOrders.length).toBe(1);
    })

    it("can count sell orders", () =>{
        matcher.newOrder("Iain", 1.25, 20, "SELL");
        matcher.newOrder("Banjamin", 1.3, 50, "SELL");
        matcher.newOrder("Steve", 1.3, 1, "BUY");
        expect(matcher.allOrders.length).toBe(3);
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

});