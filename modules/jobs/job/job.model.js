const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    club_logo: {
      //company logo
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
    category: {
      type: String,
      required: true,
    },
    paymentMethod: String,
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary"],
      required: true,
    },
    language: { type: String, required: true },
    salary: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    packagechoose: {
      //label
      type: Number,
      required: false,
    },
    tags: {
      //label
      type: String,
      required: false,
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
