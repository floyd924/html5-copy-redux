let express = require('express');
let bodyParser = require('body-parser');
let Connector = require('./connector');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let server = app.listen(3001, function () {
    console.log('app running on port.', server.address().port);
});


let connector = new Connector;
connector.connect(server)