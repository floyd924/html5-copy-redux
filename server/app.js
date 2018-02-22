var nodeStatic = require( 'node-static' );
var http = require( 'http' );
var socketIO = require( 'socket.io' );
var Order = require('./app/order');
var Matcher = require("./app/matcher");
var Aggregator = require("./app/aggregator");
var Trade = require("./app/trade");


// order processing stuff
var trade = new Trade();
var matcher = new Matcher(trade);
var aggregator = new Aggregator();

// set up initial orders
const BUY = 'BUY';
const SELL = 'SELL';

tradedBuy1 = new Order(1, 100, 1, BUY);
tradedBuy2 = new Order(2, 120, 1.2, BUY);
tradedBuy3 = new Order(3, 105, 1.05, BUY);
tradedBuy4 = new Order(4, 130, 1.3, BUY);
tradedBuy5 = new Order(1, 100, 1, BUY);
tradedSell1 = new Order(4, 100, 1, SELL);
tradedSell2 = new Order(3, 120, 1.2, SELL);
tradedSell3 = new Order(1, 105, 1.05, SELL);
tradedSell4 = new Order(2, 120, 1.3, SELL);
tradedSell5 = new Order(2, 100, 1, SELL);

// Extra improved the asthetic of price chart because it doesn't draw lines encapsulating the area fill
orderBuyExtra = new Order(1, 100, 1.2, BUY);
orderBuy1 = new Order(1, 104, 1.05, BUY);
orderBuy2 = new Order(2, 95, 1.20, BUY);
orderBuy3 = new Order(3, 90, 1.45, BUY);
orderBuy4 = new Order(2, 85, 1.50, BUY);
orderBuy5 = new Order(3, 80, 1.50, BUY);
orderBuy6 = new Order(4, 75, 1.60, BUY);
orderBuy7 = new Order(4, 70, 1.75, BUY);
orderSell1 = new Order(1, 105, 1.05, SELL);
orderSell2 = new Order(2, 110, 1.1, SELL);
orderSell3 = new Order(3, 115, 1.20, SELL);
orderSell4 = new Order(4, 120, 1.37, SELL);
orderSell5 = new Order(2, 125, 1.50, SELL);
orderSell6 = new Order(4, 130, 1.9, SELL);
orderSell7 = new Order(1, 135, 2, SELL);

matcher.receiveOrder(tradedBuy1);
matcher.receiveOrder(tradedSell1);
matcher.receiveOrder(tradedBuy2);
matcher.receiveOrder(tradedSell2);
matcher.receiveOrder(tradedBuy3);
matcher.receiveOrder(tradedSell3);
matcher.receiveOrder(tradedBuy4);
matcher.receiveOrder(tradedSell4);
matcher.receiveOrder(tradedBuy5);
matcher.receiveOrder(tradedSell5);

matcher.receiveOrder(orderBuyExtra);
matcher.receiveOrder(orderBuy1);
matcher.receiveOrder(orderBuy2);
matcher.receiveOrder(orderBuy3);
matcher.receiveOrder(orderBuy4);
matcher.receiveOrder(orderBuy5);
matcher.receiveOrder(orderBuy6);
matcher.receiveOrder(orderBuy7);
matcher.receiveOrder(orderSell1);
matcher.receiveOrder(orderSell2);
matcher.receiveOrder(orderSell3);
matcher.receiveOrder(orderSell4);
matcher.receiveOrder(orderSell5);
matcher.receiveOrder(orderSell6);
matcher.receiveOrder(orderSell7);

const aggregateOrderBook = function(id) {
	if(id > 0) {
		return aggregator.privateOrders(matcher.getAllOrders(), id);
	} else {
		return aggregator.allOrders(matcher.getAllOrders());
	}
}

const aggregateTradeBook = function(id) {
	const tradeHistory = aggregator.allOrders(trade.book);
	return tradeHistory;
}

var createOrder = function(data) {
	var orderForMatcher = new Order(parseInt(data.accountId), parseFloat(data.price), parseFloat(data.quantity), data.action);
	return orderForMatcher;
}

var processOrder = function(orderForMatcher) {
	return matcher.receiveOrder(orderForMatcher);
}



// create our file server config
var file = new nodeStatic.Server( 'bin', { // bin is the folder containing our html, etc
	cache:0,	// don't cache
	gzip:true	// gzip our assets
});

// create our server
var httpServer = http.createServer( function( request, response ) {
	request.addListener( 'end', function() {
		file.serve( request, response );
	});
	request.resume();
}).listen( 4000 );

var sio = socketIO();
sio.serveClient( true ); // the server will serve the client js file
sio.attach( httpServer );

const updateAllOrderBooks = (data) => {
	sio.emit("orderBook", aggregateOrderBook(-1));
	sio.emit("orderBookPrivate", aggregateOrderBook(data.accountId));
}

// listen for a connection
sio.on( 'connection', function( socket ) {
    console.log( 'User ' + socket.id + ' connected' );
	
	// listen for orders
	socket.on( 'placeOrder', function( data ) {
		var orderReceived = createOrder(data);
		if(processOrder(orderReceived)) {
			sio.emit("tradeBook", trade.exportBook());
			sio.emit("marketAverage", trade.marketAveragePrice);
		}
		updateAllOrderBooks(data.accountId);
	});

	socket.on( 'requestOrderBook', function(data) {
		if(data.private === true) {
			sio.emit("orderBookPrivate", aggregateOrderBook(data.accountId));
		} else {
			sio.emit("orderBook", aggregateOrderBook(-1));
		}
	});

	socket.on( 'requestTradeBook', function(data) {
		if(Number.isInteger(data.accountId) && data.accountId > 0) {
			// send specific message to exact user
		}
		sio.emit("tradeBook", trade.exportBook());
		if(trade.marketAveragePrice != undefined) {
			sio.emit("marketAverage", trade.marketAveragePrice);
		}
	});
});