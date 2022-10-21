const express = require("express");
const {
  getTour,
  createTour,
  updateTour,
  getTourById,
  bulkUpdateTour,
  deleteTourById,
} = require("../controllers/tour.controller");

const TourRoute = express.Router();

TourRoute.route("/").get(getTour).post(createTour);

TourRoute.route("/bulk-update").patch(bulkUpdateTour);
TourRoute
  .route("/:id")
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTourById);


module.exports = TourRoute;
