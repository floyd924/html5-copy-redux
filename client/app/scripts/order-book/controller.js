'use strict';

export default class OrderBookController {
    constructor(socket) {
        console.log("websocket library", socket);
        
        this.orders = [
            { action: "Buy", price: 15.5, quantity: 32.5 },
            { action: "Buy", price: 22.3, quantity: 55.1 },
            { action: "Sell", price: 25.5, quantity: 159.5 },
            { action: "Buy", price: 6.5, quantity: 8.5 },
            { action: "Buy", price: 6.5, quantity: 10.5 },
            { action: "Sell", price: 30.1, quantity: 15.7 }
        ];
    }
};

OrderBookController.$inject = ["socket"];