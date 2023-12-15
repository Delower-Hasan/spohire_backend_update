const mongoose = require("mongoose");
const { userRoleEnum, userSportsEnum } = require("./user.constant");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: userRoleEnum,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Object,
      country_code: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Object,
      day: Number,
      month: Number,
      year: Number,
      required: true,
    },
    sports: {
      type: String,
      enum: userSportsEnum,
      required: true,
    },
    // otp: {
    //   type: String,
    //   required: true,
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
