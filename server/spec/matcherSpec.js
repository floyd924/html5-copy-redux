const Order = require("../app/order");
const Matcher = require("../app/matcher");
const Trade = require("../app/trade");

describe("Matcher", function() {
    var matcher = null;
    var trade = null;
    const SELL = "SELL";
    const BUY = "BUY";
    
    beforeEach(function() {
        trade = new Trade();
        matcher = new Matcher(trade);
    });
    
    it("should recieve a new order and store it in the right data structure", function() {
        // sell orders must be higher than buy order to prevent trade removing them
        const orderSell = new Order(3, 150, 60, SELL);
        const orderBuy = new Order(1, 100, 160, BUY);

        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderSell);
        expect(matcher.getSellOrders().length).toEqual(1);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuy);
        expect(matcher.getSellOrders().length).toEqual(1);
        expect(matcher.getBuyOrders().length).toEqual(1);
    });

    it("should receive a new sell order and store it and sort the data strucutre by price", function(){
        const orderSellA = new Order(3, 100, 60, SELL);
        const orderSellB = new Order(1, 150, 60, SELL);
        const orderSellC = new Order(2, 200, 60, SELL);

        matcher.receiveOrder(orderSellB);
        expect(matcher.getSellOrders().length).toEqual(1);
        
        matcher.receiveOrder(orderSellA);
        expect(matcher.getSellOrders()[0].accountId).toEqual(orderSellA.accountId);
        expect(matcher.getSellOrders()[1].accountId).toEqual(orderSellB.accountId);
        
        matcher.receiveOrder(orderSellC);
        expect(matcher.getSellOrders()[0].accountId).toEqual(orderSellA.accountId);
        expect(matcher.getSellOrders()[1].accountId).toEqual(orderSellB.accountId);
        expect(matcher.getSellOrders()[2].accountId).toEqual(orderSellC.accountId);
    })
    
    it("should receive a new buy order and store it and sort the data strucutre by price (HIGHEST FIRST)", function(){
        const orderBuyA = new Order(3, 100, 160, BUY);
        const orderBuyB = new Order(4, 150, 160, BUY);
        const orderBuyC = new Order(5, 200, 160, BUY);
        const orderBuyD = new Order(6, 250, 160, BUY);

        matcher.receiveOrder(orderBuyB);
        expect(matcher.getBuyOrders().length).toEqual(1);
        
        matcher.receiveOrder(orderBuyA);
        expect(matcher.getBuyOrders()[1].accountId).toEqual(orderBuyA.accountId);
        expect(matcher.getBuyOrders()[0].accountId).toEqual(orderBuyB.accountId);
        
        matcher.receiveOrder(orderBuyC);
        expect(matcher.getBuyOrders()[2].accountId).toEqual(orderBuyA.accountId);
        expect(matcher.getBuyOrders()[1].accountId).toEqual(orderBuyB.accountId);
        expect(matcher.getBuyOrders()[0].accountId).toEqual(orderBuyC.accountId);

        matcher.receiveOrder(orderBuyD);
        expect(matcher.getBuyOrders()[3].accountId).toEqual(orderBuyA.accountId);
        expect(matcher.getBuyOrders()[2].accountId).toEqual(orderBuyB.accountId);
        expect(matcher.getBuyOrders()[1].accountId).toEqual(orderBuyC.accountId);
        expect(matcher.getBuyOrders()[0].accountId).toEqual(orderBuyD.accountId);
    })

    it("should match orders of different actions which are the same in price", function() {
        // Orders of the same letter are compatible. They should match completely
        const orderBuyA = new Order(3, 100, 50, BUY);
        const orderSellA = new Order(4, 100, 50, SELL);

        matcher.receiveOrder(orderSellA);
        matcher.receiveOrder(orderBuyA);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);

        // reverse sending of the orders
        matcher.receiveOrder(orderBuyA);
        matcher.receiveOrder(orderSellA);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });

    it("should match orders of different actions when buy price is HIGHER than sell price", function() {
        // Orders of the same letter are compatible. They should match completely
        const orderBuyA = new Order(3, 200, 50, BUY);
        const orderSellA = new Order(4, 100, 50, SELL);

        matcher.receiveOrder(orderSellA);
        matcher.receiveOrder(orderBuyA);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);

        // reverse sending of the orders
        matcher.receiveOrder(orderBuyA);
        matcher.receiveOrder(orderSellA);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });

    it("shouldn't match orders of different actions when buy price is LOWER than sell price", function() {
        // Orders of the same letter are compatible. They should match completely
        const orderBuyA = new Order(3, 50, 50, BUY);
        const orderSellA = new Order(4, 100, 50, SELL);

        matcher.receiveOrder(orderSellA);
        matcher.receiveOrder(orderBuyA);
        expect(matcher.getSellOrders().length).not.toEqual(0);
        expect(matcher.getBuyOrders().length).not.toEqual(0);

        // reverse sending of the orders
        matcher.receiveOrder(orderBuyA);
        matcher.receiveOrder(orderSellA);
        expect(matcher.getSellOrders().length).not.toEqual(0);
        expect(matcher.getBuyOrders().length).not.toEqual(0);
    });

    it("should match compatible orders and leave some order left if they are of different quantities", function() {
        // Orders of the same letter are compatible. They should match completely
        const orderBuyA = new Order(5, 200, 10, BUY);
        const orderSellA = new Order(6, 200, 50, SELL);

        matcher.receiveOrder(orderSellA);
        matcher.receiveOrder(orderBuyA);
        expect(matcher.getSellOrders().length).toEqual(1);
        expect(matcher.getBuyOrders().length).toEqual(0);
        
        const orderBuyB = new Order(7, 200, 500, BUY);
        const orderSellB = new Order(8, 200, 100, SELL);

        matcher.receiveOrder(orderBuyB);
        matcher.receiveOrder(orderSellB);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(1);
    });

    it("should match a buy order but favour the lowest sell point", function() {
        // Orders of the same letter are compatible. They should match completely
        const orderBuy = new Order(10, 200, 100, BUY);
        const orderSellLow = new Order(11, 50, 50, SELL);
        const orderSellHigh = new Order(12, 100, 100, SELL);
        const orderSellLower = new Order(13, 40, 50, SELL);

        matcher.receiveOrder(orderSellLow);
        matcher.receiveOrder(orderSellHigh);
        matcher.receiveOrder(orderSellLower);
        matcher.receiveOrder(orderBuy);

        expect(matcher.getSellOrders().length).toEqual(1);
        expect(matcher.getSellOrders()[0].id).toEqual(orderSellHigh.id);
        expect(matcher.getSellOrders()[0].accountId).toEqual(orderSellHigh.accountId); 
        expect(matcher.getSellOrders()[0].quantity).toEqual(orderSellHigh.quantity); 
    });

    it("should match a sell order but favour the highest buy point", function() {
        const orderSell = new Order(10, 50, 100, SELL);
        const orderBuyHigh = new Order(11, 200, 50, BUY);
        const orderBuyLow = new Order(12, 100, 100, BUY);
        const orderBuyHigher = new Order(13, 250, 50, BUY);

        matcher.receiveOrder(orderBuyHigh);
        matcher.receiveOrder(orderBuyLow);
        matcher.receiveOrder(orderBuyHigher);
        matcher.receiveOrder(orderSell);

        expect(matcher.getBuyOrders().length).toEqual(1);
        expect(matcher.getBuyOrders()[0].id).toEqual(orderBuyLow.id);
        expect(matcher.getBuyOrders()[0].accountId).toEqual(orderBuyLow.accountId); 
        expect(matcher.getBuyOrders()[0].quantity).toEqual(orderBuyLow.quantity); 
    });

    it("should prioritise buy orders by time if price is the same", function() {
        const orderSell = new Order(10, 50, 50, SELL);
        const orderBuyFirstIn = new Order(11, 200, 50, BUY);
        const  orderBuySecondIn = new Order(12, 200, 50, BUY);
        const  orderBuyThirdIn = new Order(13, 200, 50, BUY);
        const orderBuyFourthIn = new Order(14, 200, 50, BUY);

        matcher.receiveOrder(orderBuyFirstIn);
        matcher.receiveOrder(orderBuySecondIn);
        matcher.receiveOrder(orderBuyThirdIn);
        matcher.receiveOrder(orderBuyFourthIn);
        matcher.receiveOrder(orderSell);

        expect(matcher.getBuyOrders().length).toEqual(3);
        expect(matcher.getBuyOrders()[0].id).toEqual(orderBuySecondIn.id);
        expect(matcher.getBuyOrders()[0].quantity).toEqual(orderBuySecondIn.quantity); 
        expect(matcher.getBuyOrders()[1].id).toEqual(orderBuyThirdIn.id);
        expect(matcher.getBuyOrders()[1].quantity).toEqual(orderBuyThirdIn.quantity); 
        expect(matcher.getBuyOrders()[2].id).toEqual(orderBuyFourthIn.id);
        expect(matcher.getBuyOrders()[2].quantity).toEqual(orderBuyFourthIn.quantity); 
    });

    it("should accept orders with decimals", function() {
        const orderBuy1 =  new Order(10, 40.5, 50, BUY);
        const orderBuy2 =  new Order(10, 40, 50.5, BUY);
        const orderSell1 = new Order(10, 50.5, 50, SELL);
        const orderSell2 =  new Order(10, 60, 50.5, SELL);
        
        console.log("IVAN", isNaN(orderBuy1.quantity))

        matcher.receiveOrder(orderSell1);
        matcher.receiveOrder(orderBuy1);
        expect(matcher.getBuyOrders().length).toEqual(1);
        expect(matcher.getSellOrders().length).toEqual(1);
        expect(matcher.getBuyOrders()[0].price).toEqual(orderBuy1.price);
        expect(matcher.getSellOrders()[0].price).toEqual(orderSell1.price);
        
        matcher.receiveOrder(orderSell2);
        matcher.receiveOrder(orderBuy2);
        expect(matcher.getBuyOrders().length).toEqual(2);
        expect(matcher.getSellOrders().length).toEqual(2);
        expect(matcher.getBuyOrders()[1].quantity).toEqual(orderBuy2.quantity);
        expect(matcher.getSellOrders()[1].quantity).toEqual(orderSell2.quantity);
    });

    // **********************************************************************************
    // **********************************************************************************
    // **********************************************************************************
    // **********************        ERROR CHECKING          ****************************
    // **********************************************************************************
    // **********************************************************************************
    // **********************************************************************************

    it("should refuse a order with no quantity, negative or non numeric quantity", function() {
        const orderSellZero = new Order(10, 50, 0, SELL);
        const orderSellNegative = new Order(10, 50, -100, SELL);
        const orderSellNonNumeric = new Order(10, 50, "asd", SELL);
        
        matcher.receiveOrder(orderSellZero);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNegative);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNonNumeric);
        expect(matcher.getSellOrders().length).toEqual(0);

        
        const orderBuyZero = new Order(11, 200, 0, BUY);
        const orderBuyNegative = new Order(11, 200, -100, BUY);
        const orderBuyNonNumeric = new Order(11, 200, "NOT GOOD", BUY);

        matcher.receiveOrder(orderBuyZero);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNegative);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNonNumeric);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });

    it("should refuse a order with no price, negative or non numeric price", function() {
        const orderSellZero = new Order(10, 0, 50, SELL);
        const orderSellNegative = new Order(10, -50, 100, SELL);
        const orderSellNonNumeric = new Order(10, "BAD", 50, SELL);
        
        matcher.receiveOrder(orderSellZero);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNegative);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNonNumeric);
        expect(matcher.getSellOrders().length).toEqual(0);

        
        const orderBuyZero = new Order(10, 0, 50, BUY);
        const orderBuyNegative = new Order(10, -50, 100, BUY);
        const orderBuyNonNumeric = new Order(10, "TERRIBLE", 50, BUY);

        matcher.receiveOrder(orderBuyZero);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNegative);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNonNumeric);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });

    it("should refuse an order with bad action", function() {
        const orderBadString = new Order(10, 0, 50, "BAD");

        matcher.receiveOrder(orderBadString);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);

        const orderActionIsNumber = new Order(10, 0, 50, 0);

        matcher.receiveOrder(orderActionIsNumber);
        expect(matcher.getSellOrders().length).toEqual(0);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });

    it("should refuse an order with bad account number", function() {
        const orderSellZero = new Order(0, 50, 50, SELL);
        const orderSellNegative = new Order(-10, 50, 100, SELL);
        const orderSellNonNumeric = new Order("BAD", 40, 50, SELL);
        
        matcher.receiveOrder(orderSellZero);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNegative);
        expect(matcher.getSellOrders().length).toEqual(0);
        
        matcher.receiveOrder(orderSellNonNumeric);
        expect(matcher.getSellOrders().length).toEqual(0);

        
        const orderBuyZero = new Order(0, 10, 50, BUY);
        const orderBuyNegative = new Order(-10, 50, 100, BUY);
        const orderBuyNonNumeric = new Order("FALSE", 40, 50, BUY);

        matcher.receiveOrder(orderBuyZero);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNegative);
        expect(matcher.getBuyOrders().length).toEqual(0);

        matcher.receiveOrder(orderBuyNonNumeric);
        expect(matcher.getBuyOrders().length).toEqual(0);
    });
});