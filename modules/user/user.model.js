const mongoose = require("mongoose");
const { userRoleEnum, userSportsEnum } = require("./user.constant");

const experienceSchema = new mongoose.Schema(
  {
    start_year: {
      type: String,
      required: true,
    },
    end_year: {
      type: String,
      required: true,
    },
    club_name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // _id: false to prevent creation of an _id field for each sub-document

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: userRoleEnum,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: undefined,
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
    about_me: {
      type: String,
      required: false,
    },
    gallary: {
      type: Array,
      required: false,
      default: [],
    },
    experience: {
      type: [experienceSchema],
      required: false,
    },
    social_media: {
      type: [String],
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Object,
      country_code: {
        type: String,
        required: false,
      },
      number: {
        type: Number,
        required: false,
      },
      required: false,
    },
    nationality: {
      type: String,
      required: true,
    },

    date_of_birth: {
      type: String,
      required: false,
    },
    sports: {
      type: String,
      enum: userSportsEnum,
      required: true,
    },
    isSubsCribed: {
      type: Boolean,
      required: false,
      default: false,
    },
    subscriptionName: {
      type: String,
      required: false,
      enum: ["Gold", "Silver", "Bronze", ""],
      default: undefined,
    },
    subscriptionDate: {
      type: Date,
      required: false,
    },
    expirationDate: {
      type: Date,
      required: false,
    },
    packageChoosed: {
      type: Number,
      required: false,
    },
    isRenewable: {
      type: Boolean,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
