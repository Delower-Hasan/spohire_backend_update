const mongoose = require("mongoose");

const jobApplySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    // birth_date: {
    //   type: Date,
    //   required: false,
    // },
    // region: {
    //   type: String,
    //   required: true,
    // },
    // expected_salary: {
    //   type: String,
    //   required: false,
    // },
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
    // creator: {
    //   type: mongoose.Schema.Types.ObjectId, // person who created the job
    //   ref: "User",
    //   required: true,
    // },
    job_description: {
      type: String,
      required: true,
    },

    // contentType: { type: String, required: false },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId, // users
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
