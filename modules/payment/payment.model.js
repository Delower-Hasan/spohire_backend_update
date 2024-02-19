const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Denied"],
      required: false,
      default: "Paid",
    },
    purpose: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
