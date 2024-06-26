const mongoose = require("mongoose");
const { userRoleEnum, userSportsEnum } = require("../user/user.constant");

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
);

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
      required: false,
    },
    image: {
      type: String,
      required: false,
      default: undefined,
    },
    age: Number,
    fullName: {
      type: String,
      required: false,
    },
    gender: String,
    phone_number: String,
    country: String,
    city: String,
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    additional_passport: {
      type: String,
      required: false,
      default: "N/A",
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
    facebook: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    belong_to_the_club: {
      type: String,
      enum: ["yes", "no"],
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
    // experience: {
    //   type: [Object],
    //   start_year: {
    //     type: String,
    //     required: true,
    //   },
    //   end_year: {
    //     type: String,
    //     required: true,
    //   },
    //   club_name: {
    //     type: String,
    //     required: true,
    //   },
    //   required: false,
    // },
    experience: {
      type: [experienceSchema],
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
      required: true,
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
      type: Date,
      required: false,
    },
    isCreatedProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
    expirationDate: {
      type: Date,
      required: false,
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
