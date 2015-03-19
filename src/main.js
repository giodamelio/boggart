var express = require("express");

var server = express();

server.get("/", function(req, res) {
    res.send("Hello World!");
});

server.listen(3141);
console.log("Server listening on http://localhost:3141");

