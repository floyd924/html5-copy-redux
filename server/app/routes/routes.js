let appRouter = function (app) {
    app.get("/", function(req, res){
        res.status(200).send("welcome to the restful API :) This is a GET request on / ");
    });
    app.get("/trades", function (req, res){
        // let data = ({
        //     data: "here",
        //     another: "attribute"
        // })
        // res.status(200).send(data);
        res.status(200).send("this is where all trades will appear");
    });

}

module.exports = appRouter;