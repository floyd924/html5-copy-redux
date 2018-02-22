var Order = require("../app/order");

describe("Order", function() {
    var order;

    describe("constructor", function() {

        const accountId = 100;
        const price = 80;
        const quantity = 60;
        const action = "SELL";

        beforeEach(function(){
        });
    
        it("should create object with account, price, quatity and action", function() {
            order = new Order(accountId, price, quantity, action);
            expect(order.accountId).toEqual(accountId);
            expect(order.price).toEqual(price);
            expect(order.quantity).toEqual(quantity);
            expect(order.action).toEqual(action);
        });

        it("should give the order an id", function() {
            order = new Order(accountId, price, quantity, action);
            expect(order.id).toMatch(/\d{1,}/);
        });
            
    });
    
    beforeEach(function() {
        order = new Order();
    });
});