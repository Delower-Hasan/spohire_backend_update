const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: false,
    },
    job_position: {
      type: String,
      required: false,
    },
    offered_salary: {
      type: Number,
      required: true,
    },
    job_location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Coach", "Player"],
      required: true,
    },
    formation: {
      type: String,
      required: false,
    },
    club_logo: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
