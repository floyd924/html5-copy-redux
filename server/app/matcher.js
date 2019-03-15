//this matcher benefits the newest order created.
//to change this, see the 'this.trade' method

function Matcher() {

    //storing all our orders in arrays
    this.allPendingOrders = [];
    this.buyOrders = [];
    this.sellOrders = [];
    this.completedTrades = [];

    //creates a new order and calls the receiveOrder method
    //which triggers any possible trades
    //empty orders are then cleared once trades have taken place
    this.newOrder = function(acc, prix, volume, act){
        let order = {
            account: acc,
            price: parseFloat(prix),
            quantity: parseFloat(volume),
            action: act
        }
        this.receiveOrder(order);
        this.clearEmptyOrders();
    }


    //checks what type of order has arrived, adds order to relevant array
    //and calls relevant checkOrders method
    this.receiveOrder = function(order){
        this.allPendingOrders.push(order);
        if (order.action === "BUY") {
            this.buyOrders.push(order);
            //sort the sellOrders by price, lowest first
            this.sellOrders.sort(function(a,b){
                return a.price - b.price
            })
            this.checkSellOrders(order);

        } else if (order.action === "SELL"){
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
                this.trade(order, e)
            }
        });

    }
    
    //looks through all orders in the relevant array to find an order with suitbale price
    this.checkBuyOrders = function(order){
        this.buyOrders.forEach(e => {
            if ((order.quantity > 0) && (e.price >= order.price)) {
                this.trade(order, e)
            }
        });
    }

    //makes the exchange between two orders, removes completed orders 
    this.trade = function(newOrder, oldOrder){
        let newOrderQuantityAfterTrade = (newOrder.quantity - oldOrder.quantity);
        let tradePrice
        //to benifit the existing order instead of the new order
        //change 'newOrder.action' to 'oldOrder.action' below!
        //i think
        if (newOrder.action === "BUY") {
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

    //add to completed trades
    this.credit = function(order, quantity, prix){
        if (order.action.toUpperCase() === "BUY") {
            let trade = {size: quantity, price: prix}
            this.completedTrades.push(trade);
        }
    }

    this.clearEmptyOrders = function(){
        this.buyOrders = this.buyOrders.filter(order => order.quantity > 0);
        this.sellOrders = this.sellOrders.filter(order => order.quantity > 0);
        this.allPendingOrders = this.allPendingOrders.filter(order => order.quantity > 0);
    }

    //for the API route /trades
    this.getAllPendingOrders = function(){
        return this.allPendingOrders;
    }

    //returns 15 most recent trades that have been fulfilled
    this.getRecentTrades = function(){
        let recentTrades = this.completedTrades.reverse();
        return recentTrades.slice(0,15);
    }

    //returns all the pending orders for this user
    this.getAllOrdersByName = function(name){
        let ordersForThisPerson = this.allPendingOrders.filter(order => name.toUpperCase() === order.account.toUpperCase());
        return ordersForThisPerson;
    }

    this.sortByLowestPrice = function(array){
        array.sort(function(a,b){
            return a.price - b.price
        })
        return array;
    }

    //return one object with market depth data for full range of buy and sell prices
    this.getMarketDepth = function(){
        
        const sortedBuyOrders = this.sortByLowestPrice(this.buyOrders); 
        const buys = this.createUniqueKeys(sortedBuyOrders)
        for (const key in buys){
            sortedBuyOrders.forEach(order => {
                if (key <= order.price) {
                    buys[key] = Math.round(((buys[key] + order.price)*100)/100)
                }
            })
        }
        
        const sortedSellOrders = this.sortByLowestPrice(this.sellOrders)

        const sells = this.createUniqueKeys(sortedSellOrders)
        for (const key in sells){
            sortedSellOrders.forEach(order => {
                if (key >= order.price) {
                    sells[key] = Math.round(((sells[key] + order.price)*100)/100)
                }
            })
        }

        const objectToExport = {
            "buyData": buys,
            "sellData": sells
        }

        return this.getMarketDepthInNewForm(objectToExport);
        
    }

    //used to create an object of key:value pairs used for market depth
    this.createUniqueKeys = function(array){
        const keyObject = {};
        array.forEach(item => {
            keyObject[item.price] = 0;
        });
        return keyObject
    }


    //return one object with market depth data for full range of buy and sell prices
    this.getMarketDepthInNewForm = function(keyValueObject){
            
        const arrayOfBuyCoordinates = []
        const arrayOfSellCoordinates = []
        
        for (const [key, value] of Object.entries(keyValueObject.buyData)) {
            arrayOfBuyCoordinates.push({price: key, depth: value})
        }
        
        for (const [key, value] of Object.entries(keyValueObject.sellData)) {
            arrayOfSellCoordinates.push({price: key, depth: value})
        }
                    
        const objectToBeReturned = { buys: arrayOfBuyCoordinates, sells: arrayOfSellCoordinates }

        return objectToBeReturned;
    }


    //seed the file with data
    this.seed = function(){
        const names = ["iain","benj", "steve", "laurie", "al", "gavin", "pete"];
        names.forEach(name => {
            this.generateOrdersFor(name)
        })
    }

    this.generateOrdersFor = function(name){
        //setting the size of data for buy and sell, 
        //so I can control graph size, for testing
        const randomSellPrice = ((Math.floor((Math.random()*5)*10))/10) + 1
        const randomSellQuantity = (Math.floor(Math.random()*2)) + 1;
        const randomBuyPrice = ((Math.floor((Math.random()*5)*10))/10) + 1
        const randomBuyQuantity = (Math.floor(Math.random()*6)) + 1;


        //for each user, create 10 random orders
        for (let i = 0; i < 10; i++) {    
            const randomIndex = Math.floor(Math.random()*1.99)
            if (randomIndex === 0) {
                const price = randomBuyPrice;
                const quantity = randomBuyQuantity;
                this.newOrder(name, price, quantity, "BUY")     
            } else {
                const price = randomSellPrice;
                const quantity = randomSellQuantity;
                this.newOrder(name, price, quantity, "SELL")   
            }
        }
    }
}


module.exports = Matcher;
