const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    job_position: {
      type: String,
      required: true,
    },
    offered_salary: {
      type: String,
      required: false,
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
      required: true,
    },
    club_logo: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
