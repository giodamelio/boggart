var path = require("path");
var express = require("express");

var Api = require("./api");

var server = express();

// Mount our api
server.use("/api", Api);

// Send our frontend
server.use(express.static(path.resolve(__dirname, "../../lib/client/")));

server.listen(3141);
console.log("Server listening on http://localhost:3141");

