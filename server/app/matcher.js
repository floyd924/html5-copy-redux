class Matcher {
    constructor() {
        this.orders = [];
    }

    processNewOrder(account, price, quantity, action) {
        this.createOrder(account, price, quantity, action);
        this.processOrders();
    }

    createOrder(account, price, quantity, action) {
        this.orders.push({account, price, quantity, action});
    }

    // Loop through all orders, see if any match up then reduce and delete appropriately
    processOrders() {

        // Sort by price so cheapest orders are compared first
        this.orders.sort(function (a, b) {
            return a.price - b.price;
        })

        //for (var buyerIndex = this.orders.length-1; buyerIndex>=0; buyerIndex--) {
        this.orders.filter(order => order.action === "buy").forEach(buyer => {
            
            //for (var sellerIndex = this.orders.length-1; sellerIndex>=0; sellerIndex--) {
            this.orders.filter(order => order.action === "sell").forEach(seller => {

                // we're now comparing a buyer and a seller
                if (buyer.price >= seller.price) {
                    
                    console.log("compatable trade at price £", seller.price);

                    // TODO: if some money quantity was passing, using -ve numbers like this wouldn't cut it
                    let originalSellerQuantity = seller.quantity;

                    seller.quantity -= buyer.quantity;
                    buyer.quantity -= originalSellerQuantity;

                    console.log("new buyer q:", buyer.quantity);
                    console.log("new seller q:", seller.quantity);
                } else {
                    console.log("incompatable trade at price £", seller.price);
                }
            })
        })

        // remove orders without quantity remaining
        this.orders = this.orders.filter(order => order.quantity > 0);

        console.log(this.orders);
    }
}

exports.Matcher = Matcher;
