let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/routes.js');
let app = express();
// require socket
const socket = require('socket.io');
let Matcher = require('./matcher');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    //to allow get requests from port 3000
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes(app);

let server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});

// socket setup
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