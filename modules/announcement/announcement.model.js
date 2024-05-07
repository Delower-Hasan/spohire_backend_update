const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sports: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentMathod: {
      type: String,
      required: false,
      default: "Card",
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: true,
    },
    subscriptionDate: {
      type: Date,
      required: false,
    },
    expirationDate: {
      type: Date,
      required: false,
      default: false,
    },
    packagechoose: {
      //label
      type: Number,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },

    // status: {
    //   type: String,
    //   enum: ["In Progress", "Published", "Denied"],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
