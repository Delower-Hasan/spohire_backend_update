const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In_Progress", "Completed", "Denied"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
