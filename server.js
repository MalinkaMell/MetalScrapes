require("dotenv").config(); //enviroment vars
const express = require("express"); //express
const mongoose = require("mongoose"); //mongoose (like sequelize, remember?)
const exphbs = require("express-handlebars"); //handlebars template engine
var logger = require("morgan"); //nice colored debug

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrappies"; //db connection URL
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }); //connect to db
const db = mongoose.connection; //create db variable
db.on("error", console.error.bind(console, "Connection error:")); //if any error occurs

const app = express(); //naming my express instance
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false })); //for my POSTs
app.use(express.json()); //for my Jsons
app.use(express.static("public")); //client side basically
app.use(logger("dev")); //morgan

app.engine("handlebars", exphbs({defaultLayout: "main"})); //my template engine
app.set("view engine", "handlebars");

const routes = require("./controller/index");
app.use(routes);


db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(PORT, function () {
    console.log(`App running on port http://localhost:${PORT}`);
  });
})
