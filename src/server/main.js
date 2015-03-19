var express = require("express");

var Api = require("./api");

var server = express();

// Mount our api
server.use(Api);

// Send our frontend
server.get("/", function(req, res) {
    res.send("Hello World!");
});

server.listen(3141);
console.log("Server listening on http://localhost:3141");

