const mongoose = require("mongoose");
const { userRoleEnum, userSportsEnum } = require("./user.constant");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: userRoleEnum,
      required: true,
    },
    referral: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
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
    additional_passport: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      enum: ["Left", "Right", "Ambidextrous"],
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    dominant_hand: {
      type: String,
      required: false,
    },
    social_media: {
      type: [String],
      required: false,
    },
    belong_to_the_club: {
      type: String,
      enum: ["Yes", "No"],
      required: false,
    },
    club_name: {
      type: String,
      required: false,
    },
    club_position: {
      type: String,
      required: false,
    },
    experience: {
      type: [Object],
      start_year: {
        type: Number,
        required: true,
      },
      end_year: {
        type: Number,
        required: true,
      },
      club_name: {
        type: String,
        required: true,
      },
      required: false,
    },
    strengths_advantage: {
      type: String,
      required: false,
    },
    about_me: {
      type: String,
      required: false,
    },
    expectations_from_new_club: {
      type: String,
      required: false,
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
    gallary: {
      type: Array,
      required: false,
      default: [],
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
      type: String,
      required: false,
    },
    isCreatedProfile: {
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
