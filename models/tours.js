const Mongoose = require("mongoose");

const TourSchedma = Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be 3 or lettes long"],
      maxLength: [100, "Name can't be more than 100 letters"],
    },
    image: {
      type: String,
      required: [true, "Tour Image is required"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negetive"],
    },
    unit: {
      type: String,
      enum: {
        values: ["day", "week", "month"],
        message: "unit can't be {VALUE}, must be day/week/month",
      },
    },
    duation: {
      type: Number,
      required: true,
      min: [0, "Duation can't be negetive"],
      valoidate: {
        validator: (val) => {
          const isInteger = Number.isInteger(val);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Duation must be integer",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["available", "booked", "discontinued"],
        message: "invalid status",
      },
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timeStamps: true,
  }
);

TourSchedma.pre("save", function (next) {
  console.log("PRE MIDDELWARE", this.quantity);
  if (this.quantity == 0) this.status = "out-of-stock";
  next();
});
TourSchedma.post("save", function (doc, next) {
  console.log("POST MIDDELWARE", doc);
  // if (this.quantity == 0) this.status = "out-of-stock";
  next();
});

TourSchedma.methods.logger = function () {
  const message = {
    status: "SAVED",
    Tour: this.name,
  };
  console.log(message);
};

const Tour = Mongoose.model("Tour", TourSchedma);

module.exports = Tour;
