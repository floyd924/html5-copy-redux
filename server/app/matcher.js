//this matcher benefits the newest order created.
//to change this, see the 'this.trade' method

function Matcher() {

    //storing all our orders in arrays
    this.allOrders = [];
    this.buyOrders = [];
    this.sellOrders = [];

    //creates a new order and calls the receiveOrder method
    this.newOrder = function(acc, prix, volume, act){
        let order = {
            account: acc,
            price: prix,
            quantity: volume,
            action: act
        }
        this.receiveOrder(order);
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
            console.log("buyOrders sorted:", this.buyOrders)

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
            //check origial items in array
            // console.log("buyOrders:", this.buyOrders)
            // console.log("sellOrders:", this.sellOrders)
            //delete old order
            let ind = checkArray.indexOf(oldOrder);
            checkArray.splice(ind, 1);
            // console.log("array has been spliced? is:", checkArray)


        } else if (newOrderQuantityAfterTrade < 0) {
            //TODO: credit each account????
            this.credit(newOrder, newOrder.quantity, tradePrice);
            this.credit(oldOrder, newOrder.quantity, tradePrice);
            //subtract new order value from old order value
            oldOrder.quantity -= newOrder.quantity;
            //set new order value to 0
            newOrder.quantity = 0;
            //delete new order
            let ind = newOrderArray.indexOf(newOrder);
            newOrderArray.splice(ind, 1);
            // console.log("did it work? new order array", newOrderArray)
            // console.log("did it work? old order array", checkArray)


        } else {
            //TODO: credit each account????
            this.credit(newOrder, newOrder.quantity, tradePrice);
            this.credit(oldOrder, oldOrder.quantity, tradePrice);
            //put both to 0
            newOrder.quantity = 0;
            oldOrder.quantity = 0;
            //delete them from the array?
            let newInd = newOrderArray.indexOf(newOrder);
            newOrderArray.splice(newInd, 1);
            let oldInd = checkArray.indexOf(oldOrder);
            checkArray.splice(oldInd, 1);
            // console.log("check array:", checkArray);
            // console.log("new array:", newOrderArray);
        }
    }

    this.credit = function(order, quantity, price){
        console.log(`Trade: ${order.account}'s trade to ${order.action} ${quantity} coins went through at a price of ${price}, compared to the asking price of ${order.price}.`);
    }


}




module.exports = Matcher;
