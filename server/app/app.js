let express = require("express");
let bodyParser = require("body-parser");
let routes = require("./routes/routes.js");
let app = express();

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