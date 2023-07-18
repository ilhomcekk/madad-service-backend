const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const dbConnect = require("./database");
require("dotenv").config();
const port = process.env.PORT || 5000;
const routes = require("./routes/index");

app.set("view engine", "ejs");

dbConnect();

const server = http.createServer(app);

// config
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Language", "ru");
  res.setHeader("Content-Type", "multipart/form-data");
  next();
});

app.use("/", routes);
app.use("/", express.static("uploads"));

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// "mongoose": "^7.3.1",
