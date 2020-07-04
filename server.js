var express = require('express'),
	app = express(),
	port = process.env.PORT || 5566;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routes = require('./api/routes/counter_route.js');
routes(app);

app.listen(port);
console.log('Counter server started on: ' + port);
