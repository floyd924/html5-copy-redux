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

console.log(routes)

let server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});

// socket setup
const io = socket(server)


let matcher = new Matcher;
matcher.seed();

io.on('connection', function(socket){
    console.log("made socket connection", socket.id);

    socket.on('seed', function(){
      console.log("seed has been called")
    })
    socket.on('newOrder', function(data){
      console.log("made it here with a post request", data)
    })

    socket.on('getRecentTrades', function(){
      console.log("give me recent trades in the back end!", matcher.getRecentTrades())
    })

    socket.on('getMarketDepth', function(){
      console.log("give me market depth in the back end!", matcher.getMarketDepth())
    })

    socket.on('getMyOrders', function(){
      console.log("give me my orders in the back end!")
    })

    socket.on('getPendingOrders', function(){
      console.log("give me pending orders in the back end!")
    })
})
