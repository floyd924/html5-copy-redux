const socket = require('socket.io');
let Matcher = require('./matcher');


function Connector(){

    this.connect = function(server) {
        
        const io = socket(server)
        let matcher = new Matcher;
        matcher.seed();
        let nameToUse = "test"
        let tradesSocket = null;
        let depthSocket = null;
        let myOrdersSocket = null;
        let pendingOrdersSocket = null;




        io.on('connection', function(socket){

            socket.on('newOrder', function(data){
                matcher.newOrder(data.newOrder.account, data.newOrder.price, data.newOrder.quantity, data.newOrder.action)
                sendRecentTrades();
                sendMarketDepth();
                sendMyOrders();
                sendPendingOrders();
            })

            socket.on('updateName', function(name){
                nameToUse = name;
                sendMyOrders();
            })

            socket.on('getRecentTrades', function(){
                tradesSocket = socket;
                sendRecentTrades()
            })

            socket.on('getMarketDepth', function(){
                depthSocket = socket;
                sendMarketDepth()
            })

            socket.on('getMyOrders', function(name){
                nameToUse = name
                myOrdersSocket = socket;
                sendMyOrders();
            })

            socket.on('getPendingOrders', function(){
                pendingOrdersSocket = socket;
                sendPendingOrders();
            })
        })


        //method to send data(socket)
        let sendMyOrders = () => {
            const data = matcher.getAllOrdersByName(nameToUse)
            myOrdersSocket.emit('receiveMyOrders', data);
        }

        let sendPendingOrders = () => {
            const data = matcher.getAllPendingOrders()
            pendingOrdersSocket.emit('receiveOrderData', data)
        }

        let sendRecentTrades = () => {
            const data = matcher.getRecentTrades()
            tradesSocket.emit('receiveTradeData', data)
        }

        let sendMarketDepth = () => {
            const data = matcher.getMarketDepth()
            depthSocket.emit('receiveMarketDepth', data)
        }
    }

}

module.exports = Connector