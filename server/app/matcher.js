var Order = require("../app/order");

var sellAction = "SELL";
var buyAction = "BUY";

function Matcher(trade) {

    this.sellOrders = [];
    this.buyOrders = [];
    this.totalOrderNumber = 0;
    this.test = -5;

    this.receiveOrder = function(order) {
        if(!this.isValidOrder(order)){
            return false;
        }

        order.priority = this.totalOrderNumber;
        this.totalOrderNumber++;
        var success = false;
        if(order.action == buyAction) {
            success = this.handleBuyOrder(order);
        } else if (order.action == sellAction) {
            success = this.handleSellOrder(order);
        }
        return success;
    }

    this.handleBuyOrder = function(buyOrder) {
        this.buyOrders.push(buyOrder);
        this.sortBuyOrders();
        return this.attemptToMatchOrders(buyOrder, this.getSellOrdersByQuantity(buyOrder));
    }

    this.handleSellOrder = function(sellOrder) {
        this.sellOrders.push(sellOrder);
        this.sortSellOrders();
        
        return this.attemptToMatchOrders(sellOrder, this.getBuyOrdersByQuantity(sellOrder));
    }

    this.attemptToMatchOrders = function(order, ordersOfOppositeAction) {
        if(ordersOfOppositeAction.length > 0) {
            if(order.action == sellAction) {
                for(i in ordersOfOppositeAction){
                    this.matchOrders(ordersOfOppositeAction[i], this.getSellOrderById(order.id))
                }
            } else if (order.action == buyAction) {
                for(i in ordersOfOppositeAction){
                    this.matchOrders(this.getBuyOrderById(order.id), ordersOfOppositeAction[i]);
                }
            }
            return true;
        } else {
            return false;
        }
    }
    
    this.getSellOrdersByQuantity = function(buyOrder) {
        var sellOrdersBelowBuyOrderPrice = [];
        var remainingQuantity = buyOrder.quantity;
        
        for(var index in this.sellOrders) {
            var order = this.sellOrders[index];
            if(remainingQuantity > 0 && order.price <= buyOrder.price) {
                sellOrdersBelowBuyOrderPrice.push(order);
                remainingQuantity -= order.quantity;
            }
        }
        return sellOrdersBelowBuyOrderPrice;
    }
    
    this.getBuyOrdersByQuantity = function(sellOrder) {
        var buyOrdersAboveSellOrderPrice = [];
        var remainingQuantity = sellOrder.quantity;

        // reversed because higher buy orders are 
        for(i = 0; i < this.buyOrders.length; i++){
            var order = this.buyOrders[i];
            if(remainingQuantity > 0 && order.price >= sellOrder.price) {
                buyOrdersAboveSellOrderPrice.push(order);
                remainingQuantity -= order.quantity;
            }
        }
        return buyOrdersAboveSellOrderPrice;
    }

    this.matchOrders = function(buyOrder, sellOrder) {
        if(sellOrder.quantity == buyOrder.quantity) {
            this.removeOrder(buyOrder);
            this.removeOrder(sellOrder);
            trade.receive(buyOrder, sellOrder);
        } else if (sellOrder.quantity > buyOrder.quantity) {
            sellOrder.quantity = sellOrder.quantity - buyOrder.quantity
            this.removeOrder(buyOrder);

            var newOrder = new Order();
            newOrder = newOrder.setWithSize(sellOrder, buyOrder.quantity);
            trade.receive(buyOrder, newOrder);
        } else if (sellOrder.quantity < buyOrder.quantity) {
            buyOrder.quantity = buyOrder.quantity - sellOrder.quantity;
            this.removeOrder(sellOrder);

            var newOrder = new Order();
            newOrder = newOrder.setWithSize(buyOrder, sellOrder.quantity);
            trade.receive(newOrder, sellOrder);
        }
    }

    this.removeOrder = function(order){
        if(order.action == sellAction) {
            var sellOrderIndex = this.sellOrders.findIndex(function(orderToFind) {return orderToFind.id == order.id;});
            this.sellOrders.splice(sellOrderIndex, 1);
        } else if (order.action == buyAction) {
            var buyOrderIndex = this.buyOrders.findIndex(function(orderToFind) {return orderToFind.id == order.id;});
            this.buyOrders.splice(buyOrderIndex, 1);
        }
    }

    this.sortBuyOrders = function() {
        this.buyOrders.sort(function(order1, order2) {
            if(order1.price - order2.price == 0) {
                return order1.priority - order2.priority;
            } else {
                return order2.price - order1.price;
            }
        })
    }

    this.sortSellOrders = function() {
        this.sellOrders.sort(function(order1, order2) {
            if(order1.price - order2.price == 0) {
                return order1.priority - order2.priority;
            } else {
                this.test = 0;
                return order1.price - order2.price;
            }
        })
    }

    this.isValidOrder = function(order){
        if(order.quantity < 1 || order.price < 1 || order.accountId < 1 ) {
            // Maybe should throw exception?
            return false;
        }
        if(isNaN(order.quantity) || isNaN(order.price) || (!(Number.isInteger(order.accountId)))) {
            // Maybe should throw exception?
            return false;
        }
        return true;
    }

    this.getSellOrderById = function(orderId){
        return this.sellOrders.find(function(order) {return order.id == orderId});
    }

    this.getBuyOrderById = function(orderId){
        return this.buyOrders.find(function(order) {return order.id == orderId});
    }

    // this.getBuyOrderById = (id) => {
    //     return this.buyOrders.find((order) => order.id == id);
    // }
    

    // this.getSellOrderById = (id) => {
    //     return this.buyOrders.find((order) => order.id == id);
    // }

    this.getSellOrders = function() {
        return this.sellOrders;
    }

    this.getBuyOrders = function() {
        return this.buyOrders;
    }

    this.getAllOrders = function() {
        return this.buyOrders.concat(this.sellOrders);
    }

    this.timeStamp = function() {
        var d = new Date();
        return d.getTime() + "" + this.totalOrderNumber;
        this.totalOrderNumber++;
    }
};

module.exports = Matcher;