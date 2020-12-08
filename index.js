console.log("inside demo8dec index.js");

const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

//server.listen(3000);
server.listen(process.env.PORT || 3000);
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
