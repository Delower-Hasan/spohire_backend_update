const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    couponFor: {
      type: String,
      enum: ["Player", "Coach"],
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
