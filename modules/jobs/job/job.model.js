const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    club_logo: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    workplaceType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      required: true,
    },
    job_location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // enum: ["Coach", "Player"],
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary"],
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
