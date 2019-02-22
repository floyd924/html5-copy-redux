let Matcher = require("../matcher.js");
let matcher = new Matcher;
matcher.seed();

let appRouter = function (app) {
    app.get("/", function(req, res){
        res.status(200).send("welcome to the restful API :) This is a GET request on / ");
    });

    //maybe change this to buy and sell?
    app.get("/orders", function (req, res){
        let data = matcher.getAllPendingOrders();
        res.status(200).send(data);
    });


    app.post("/orders", function (req, res){
        let newData = req.body;
        matcher.newOrder(newData.account, newData.price, newData.quantity, newData.action);
        res.status(201).send(matcher.getAllPendingOrders());
    })


    app.get("/users/:name", function (req, res){
        let data = matcher.getAllOrdersByName(req.params.name);
        res.status(200).send(data);
    });


    //need this
    //has been tested
    app.get("/trades", function(req, res){
        let data = matcher.getRecentTrades();
        res.status(200).send(data);
    })

}

module.exports = appRouter;