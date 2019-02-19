let appRouter = function (app) {
    app.get("/", function(req, res){
        res.status(200).send("welcome to the restful API :) This is a GET request on / ");
    });
    app.get("/trades", function (req, res){
        let data = "This is the list of trades. in brackets and curlybois put some aobjects or arrays"
        res.status(200).send(data);
    });

}

module.exports = appRouter;