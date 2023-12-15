const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  target_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  target_type: {
    type: String,
    enum: ["Announcement", "Job", "Player"],
    required: true,
  },
});

const Observation = mongoose.model("Observation", observationSchema);
module.exports = Observation;
