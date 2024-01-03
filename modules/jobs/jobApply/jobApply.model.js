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
    region: {
      type: String,
      required: true,
    },
    expected_salary: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    cv: {
      type: Buffer,
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId, // job id
      ref: "Job",
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId, // job id
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobApply = mongoose.model("JobApply", jobApplySchema);
module.exports = JobApply;
