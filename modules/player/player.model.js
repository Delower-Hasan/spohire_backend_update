const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // user id
      ref: "User",
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    additional_passport: {
      type: String,
      required: true,
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
    date_of_birth: {
      type: Object,
      day: Number,
      month: Number,
      year: Number,
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
    belong_to_the_club: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    social_media: {
      type: [String],
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
      required: true,
    },
    about_me: {
      type: String,
      required: true,
    },
    expectations_from_new_club: {
      type: String,
      required: false,
    },
    gallery: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
