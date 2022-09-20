const Tour = require("../models/tours");

exports.gettourservice = async (filters) => {
  const tours = await Tour.find({});
  return tours;
};
exports.getTourByIdService = async (id) => {
  const Tour = await Tour.findById(id);
  return Tour;
};
exports.deleteTourByIdService = async (id) => {
  const Tour = await Tour.deleteOne({ _id: id });
  return Tour;
};

exports.createTourService = async (data) => {
  const Tour = await Tour.create(data);
  return Tour;
};

exports.updateTour = async (TourId, data) => {
  const updatedTour = await Tour.updateOne(
    { _id: TourId },
    { $inc: data },
    { runValidators: true }
  );
  return updatedTour;
  // const Tour = await Tour.findById(TourId);
  // const result = await Tour.set(data).save();
  // return result;
};
exports.bulkUpdateTourservice = async (data) => {
  // const result = await Tour.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const TourPromices = [];
  data.tours.forEach((tour) =>
    TourPromices.push(
      Tour.updateOne({ _id: tour.id }, tour.data, {
        runValidators: true,
      })
    )
  );
  const result = Promise.all(TourPromices);
  return result;
};
