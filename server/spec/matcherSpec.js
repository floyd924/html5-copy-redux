var Matcher = require("../app/matcher").Matcher;

describe("Matcher", function() {
    var matcher;
    
    beforeEach(function() {
        matcher = new Matcher();
    });

    it("add orders", function() {
        matcher.createOrder(2, 500, 5, "sell");
        matcher.createOrder(4, 400, 6, "buy");
        
        expect(matcher.orders.length).toBe(2);
    });

    it("check order created", function() {
        matcher.createOrder(3, 5, 10, "sell");
        
        var order = {account: 3, price: 5, quantity: 10, action: "sell"};
        expect(matcher.orders).toContain(order);
    })

    it("reduce buyer", function() {
        matcher.createOrder(2, 1, 30, "buy");
        matcher.processNewOrder(4, 1, 20, "sell");
        
        expect(matcher.orders[0].quantity).toBe(10);
    })

    it("reduce seller", function() {
        matcher.createOrder(2, 1, 20, "buy");
        matcher.processNewOrder(4, 1, 30, "sell");
        
        expect(matcher.orders[0].quantity).toBe(10);
    })
    
    it("remove both", function() {
        matcher.createOrder(2, 4, 20, "buy");
        matcher.processNewOrder(4, 2, 20, "sell");
        
        expect(matcher.orders.length).toBe(0);
    })

    it("incompatable prices", function() {
        matcher.createOrder(2, 1, 20, "buy");
        matcher.processNewOrder(4, 2, 20, "sell");
        
        expect(matcher.orders.length).toBe(2);
    })

    it("buy from cheapest compatable seller", function() {
        matcher.createOrder(1, 10, 10, "buy");

        // best price between worse prices in memory
        matcher.createOrder(2, 9, 10, "sell");
        matcher.createOrder(3, 5, 10, "sell");
        matcher.processNewOrder(4, 8, 10, "sell");
        
        // cheapest seller should be removed
        var order = {account: 3, price: 5, quantity: 10, action: "sell"};
        expect(matcher.orders).not.toContain(order);
    })
});
