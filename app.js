const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const {
  getTour,
  createTour,
} = require("./controllers/tour.controller");
const TourRoute = require("./routes/tour.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("API HITTED!!");
  res.send("Route is working!");
});

app.use("/api/v1/tour", TourRoute);


module.exports = app;
