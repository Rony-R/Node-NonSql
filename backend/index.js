var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

//Routers
var clientsRouter = require("./routers/clients-router");
var accountsRouter = require("./routers/accounts-router");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/clients", clientsRouter);
app.use("/accounts", accountsRouter);

app.listen(8888, () => {
  console.log("Server listening on port 8888");
});
