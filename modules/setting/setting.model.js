const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  emails_notification: {
    type: Object,
    new_notifications: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    update_notifications: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    chat_notifications: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    required: false,
  },
  team_notification: {
    type: Object,
    new_notifications: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    chat_notifications: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    required: false,
  },
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
