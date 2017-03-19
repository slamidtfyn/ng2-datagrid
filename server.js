var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var storage = require('node-storage');


var data = path.join(__dirname, 'data', 'data.json');

var store = new storage(data);

var app = express();

var wwwroot = path.join(__dirname, 'public');
var data = path.join(__dirname, 'data');

console.log(`Server is starting at ${wwwroot}`);

app.use(express.static(wwwroot));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {

    var file = path.join(wwwroot, 'index.html')
    console.log(`Servering ${file}`);
    res.sendFile(file);
});

app.get('/data', function (req, res) {
    //res.setHeader('Content-Type', 'application/json');
    res.json(loadrows());
});

app.post('/data', jsonParser, function (req, res) {
    console.log(req.body);
    store.put('rows',req.body);
    res.json(loadrows());

});


app.listen(8080);

console.log("Server is running");

function loadrows() {
    var rows = store.get('rows');
    if (!rows) rows = [];
    return rows;
}