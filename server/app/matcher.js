//this matcher benefits the newest order created.
//to change this, see the 'this.trade' method

function Matcher() {

    //storing all our orders in arrays
    this.allOrders = [];
    this.buyOrders = [];
    this.sellOrders = [];

    //creates a new order and calls the receiveOrder method
    //which triggers any possible trades
    //empty orders are then cleared once trades have taken place
    this.newOrder = function(acc, prix, volume, act){
        let order = {
            account: acc,
            price: prix,
            quantity: volume,
            action: act
        }
        this.receiveOrder(order);
        this.clearEmptyOrders();
    }

 
   

    //checks what type of order has arrived, adds order to relevant array
    //and calls relevant checkOrders method
    this.receiveOrder = function(order){
        this.allOrders.push(order);
        if (order.action == "BUY") {
            this.buyOrders.push(order);
            //sort the sellOrders by price, lowest first
            this.sellOrders.sort(function(a,b){
                return a.price - b.price
            })
            this.checkSellOrders(order);

        } else if (order.action == "SELL"){
            this.sellOrders.push(order);
            //sort buyOrders by price, highest first
            this.buyOrders.sort(function(a,b){
                return b.price - a.price
            })
            this.checkBuyOrders(order);

        } else {
            throw new Error("ERROR: neither BUY nor SELL")
        }
    }

    //looks through all orders in the relevant array to find an order with suitable price
    this.checkSellOrders = function(order){
        this.sellOrders.forEach(e => {
            if ((order.quantity > 0) && (e.price <= order.price)) {           
                this.trade(order, e, this.sellOrders, this.buyOrders)
            }
        });

    }
    
    //looks through all orders in the relevant array to find an order with suitbale price
    this.checkBuyOrders = function(order){
        this.buyOrders.forEach(e => {
            if ((order.quantity > 0) && (e.price >= order.price)) {
                this.trade(order, e, this.buyOrders, this.sellOrders)
            }
        });


    }

    //makes the exchange between two orders, removes completed orders 
    this.trade = function(newOrder, oldOrder, checkArray, newOrderArray){
        let newOrderQuantityAfterTrade = (newOrder.quantity - oldOrder.quantity);
        let tradePrice
        //to benifit the existing order instead of the new order
        //change 'newOrder.action' to 'oldOrder.action' below!
        //i think
        if (newOrder.action == "BUY") {
            tradePrice = Math.min(newOrder.price, oldOrder.price);
        } else {
            tradePrice = Math.max(newOrder.price, oldOrder.price);
        }

        if (newOrderQuantityAfterTrade > 0) {
             //credit each account????
            this.credit(newOrder, oldOrder.quantity, tradePrice);
            this.credit(oldOrder, oldOrder.quantity, tradePrice);
            //subtract old order from new order
            newOrder.quantity -= oldOrder.quantity;
            //set old order to 0
            oldOrder.quantity = 0;


        } else if (newOrderQuantityAfterTrade < 0) {
            //credit each account
            this.credit(newOrder, newOrder.quantity, tradePrice);
            this.credit(oldOrder, newOrder.quantity, tradePrice);
            //subtract new order value from old order value
            oldOrder.quantity -= newOrder.quantity;
            //set new order value to 0
            newOrder.quantity = 0;

        } else {
            //credit each account
            this.credit(newOrder, newOrder.quantity, tradePrice);
            this.credit(oldOrder, oldOrder.quantity, tradePrice);
            //put both to 0
            newOrder.quantity = 0;
            oldOrder.quantity = 0;
        }
    }

    this.credit = function(order, quantity, price){
        console.log(`Trade: ${order.account}'s trade to ${order.action} ${quantity} coins went through at a price of ${price}, compared to the asking price of ${order.price}.`);
    }

    this.clearEmptyOrders = function(){
        let emptyBuys = []
        this.buyOrders.forEach(order => {
            if (order.quantity == 0) {
                emptyBuys.push(this.buyOrders.indexOf(order));
            }
        });
        emptyBuys.reverse();
        emptyBuys.forEach(index => {
            this.buyOrders.splice(index, 1);
        })
        let emptySells = [];
        this.sellOrders.forEach(order => {
            if (order.quantity == 0) {
                emptySells.push(this.sellOrders.indexOf(order))
            }
        })
        emptySells.reverse();
        emptySells.forEach(index => {
            this.sellOrders.splice(index, 1);
        })
        let emptyAlls = []
        this.allOrders.forEach(order => {
            if (order.quantity == 0) {
                emptyAlls.push(this.allOrders.indexOf(order));
            }
        });
        emptyAlls.reverse();
        emptyAlls.forEach(index => {
            this.allOrders.splice(index, 1);
        })

    }

    //for the API route /trades
    this.getAllOrders = function(){
        return this.allOrders;
    }

    //for the API route /top, 
    //returns 3 largest orders by quantity
    this.getTopOrders = function(){
        let sortedOrders = this.allOrders.sort(function(a, b){
            return a.quantity - b.quantity
        })
        return sortedOrders.slice(0,3);
    }

    //for the API route /trades/recent
    //returns 3 most recent orders that have not been fulfilled
    this.getRecentOrders = function(){
        let recentOrders = this.allOrders.reverse();
        return recentOrders.slice(0,3);
    }

    //for the API route /trades/:name
    this.getAllOrdersByName = function(name){
        let ordersForThisPerson = []
        this.allOrders.forEach(order => {
            if (name.toUpperCase() == order.account.toUpperCase()) {
                ordersForThisPerson.push(order)
            }
        })
        return ordersForThisPerson;
    }

    this.seed = function(){
        //seed the file with data
        this.newOrder("iain", 1.26, 30, "SELL");
        this.newOrder("iain", 1.3, 20, "SELL");
        this.newOrder("benj", 1.27, 5, "SELL");
        this.newOrder("steve", 1.29, 20, "BUY");
        this.newOrder("steve", 1.26, 10, "SELL");
        this.newOrder("benj", 1.3, 12, "BUY");
        this.newOrder("iain", 1.31, 14, "SELL");
        this.newOrder("benj", 1.23, 2, "BUY");
        this.newOrder("iain", 1.25, 20, "BUY");
        this.newOrder("steve", 1.27, 40, "SELL");
        this.newOrder("benj", 1.31, 10, "SELL");
    }


}




module.exports = Matcher;
