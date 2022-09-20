const Tour = require("../models/tours");
const {
  gettourservice,
  createTourService,
  updateTour,
  getTourByIdService,
  bulkUpdateTourservice,
  deleteTourByIdService,
} = require("../services/tourService");

exports.getTour = async (req, res, next) => {
  const queryies = req.query;
  console.log("queryies:", queryies);
  const options = ["sort", "limit", "skip"];
  options.map((item) => delete queryies[item]);
  console.log("queryies:", queryies);
  try {
    const result = await gettourservice();
    res.status(200).json({
      status: "Successful",
      message: "Tour found",
      data: result,
    });
    // const result = await Tour.where("name")
    //   .equals(/\w/)
    //   .where("price")
    //   .gt(500)
    //   .where("quantity")
    //   .lt(30)
    //   .limit(5);
    // const result = await Tour.find(
    //   {
    //     // $or: [{ price: 10 }, { status: "out-of-stock" }],
    //     price: { $gt: 100 },
    //   },
    //   "name createdAt -_id"
    // ).sort({ createdAt: -1 });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Tour Found",
      error: err.message,
    });
  }
};
exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getTourByIdService(id);
    res.status(200).json({
      status: "Successful",
      message: "Tour found",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Tour Found",
      error: err.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    console.log(req.body);
    // const Tour = new Tour(req.body);
    // if (Tour.quantity == 0) Tour.status = "out-of-stock";
    // const result = await Tour.save();
    const result = await createTourService(req.body);
    result.logger();
    // console.log("result====>", result);
    res.json({
      status: "Successful",
      message: "Tour Inserted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Tour insertion Failed",
      error: err.message,
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data(req.body):", data);
    const result = await updateTour(id, data);
    // result.logger();
    // console.log("result====>", result);
    res.json({
      status: "Successful",
      message: "Tour Updated Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Tour insertion Failed",
      error: err.message,
    });
  }
};
exports.deleteTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteTourByIdService(id);
    res.json({
      status: "Successful",
      message: "Tour Deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to delete Tour",
      error: err.message,
    });
  }
};

exports.bulkUpdateTour = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data(req.body):", data);
    const result = await bulkUpdateTourservice(data);
    // result.logger();
    // console.log("result====>", result);
    res.status(200).json({
      status: "Successful",
      message: "Tour Updated Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Tour insertion Failed",
      error: err.message,
    });
  }
};
