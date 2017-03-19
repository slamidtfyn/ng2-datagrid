var express= require("express");

console.log("Starting server...");

var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(8080);

console.log("Server is running");
