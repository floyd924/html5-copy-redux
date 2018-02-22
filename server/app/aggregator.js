var Order = require("../app/order");

var BUY = "BUY";
var SELL = "SELL";

function aggregator() {

    this.publicOrders = [];

    this.test = -5;

    this.allOrders = function(allLiveOrders) {
        var publicOrders = this.aggregator(allLiveOrders, true);
        this.publicOrders = publicOrders;
        return publicOrders;
    }

    this.privateOrders = function(allLiveOrders, accountId) {
        var privateOrders = this.aggregator(allLiveOrders, false, accountId);
        return privateOrders;
    }

    this.aggregator = function(allLiveOrders, isPublic, accountId) {
        var orders = [];
        for(i in allLiveOrders) {
            var liveOrder = allLiveOrders[i];
            if(isPublic == true || liveOrder.accountId == accountId) {
                var aggregateIndex = orders.findIndex(function(aggOrder) {
                    return (aggOrder.action == liveOrder.action && aggOrder.price == liveOrder.price);
                });

                if(aggregateIndex != -1) {
                    orders[aggregateIndex].quantity = orders[aggregateIndex].quantity += liveOrder.quantity;
                } else {
                    var index = orders.length;
                    orders[index] = {
                        'price' : liveOrder.price, 
                        'quantity': liveOrder.quantity,
                        'action': liveOrder.action
                    };
                }
            }
        }
        return orders;
    }
};

module.exports = aggregator;