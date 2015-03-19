var path = require("path");
var fs = require("fs");

var express = require("express");

var Api = require("./api");

var server = express();

// Mount our api
server.use("/api", Api);

// Serve our static assets
var staticPath = path.resolve(__dirname, "../../lib/client/");
server.use("/static", express.static(staticPath));

// Serve our index on any other path
var indexPath = path.resolve(__dirname, "../../lib/client/index.html");
server.get("/**", function(req, res) {
    res.sendFile(indexPath);
});

server.listen(3141);
console.log("Server listening on http://localhost:3141");

