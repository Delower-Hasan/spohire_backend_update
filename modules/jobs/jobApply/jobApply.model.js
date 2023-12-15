const mongoose = require("mongoose");

const jobApplySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    playing_position: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    expected_salary: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId, // job id
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobApply = mongoose.model("JobApply", jobApplySchema);
module.exports = JobApply;
