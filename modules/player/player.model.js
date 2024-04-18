const mongoose = require("mongoose");
const { userRoleEnum, userSportsEnum } = require("../user/user.constant");

// schema for adding player/coach to the marketplace
const playerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: userRoleEnum,
      required: true,
    },
    referral: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: undefined,
    },
    fullName: {
      type: String,
      required: true,
    },
    gender: String,
    phone_number: String,
    country: String,
    city: String,
    nationality: {
      type: String,
      required: true,
    },
    additional_passport: {
      type: String,
      required: false,
    },
    mainPosition: {
      type: String,
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
    alterPosition: {
      type: String,
      required: false,
    },
    dominantHand: {
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
    expirationDate: {
      type: String,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    packageChoosed: {
      //1 months, 2 months, 3 months
      type: Number,
      required: true,
    },
    isRenewable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
