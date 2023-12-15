const User = require("../user/user.model");
const Setting = require("./setting.model");

const getNewNotificationsEmails = async () => {
  const result = await Setting.distinct("user_id", {
    "emails_notification.new_notifications": true,
  });
  const sortedEmails = await User.distinct("email", {
    _id: { $in: result },
    isVerified: true,
  });
  return sortedEmails;
};

const getUpdateNotificationsEmails = async () => {
  const result = await Setting.distinct("user_id", {
    "emails_notification.update_notifications": true,
  });
  const sortedEmails = await User.distinct("email", {
    _id: { $in: result },
    isVerified: true,
  });
  return sortedEmails;
};

const getChatNotificationsEmails = async () => {
  const result = await Setting.distinct("user_id", {
    "emails_notification.chat_notifications": true,
  });
  const sortedEmails = await User.distinct("email", {
    _id: { $in: result },
    isVerified: true,
  });
  return sortedEmails;
};

const getTeamNewNotificationsEmails = async () => {
  const result = await Setting.distinct("user_id", {
    "team_notification.new_notifications": true,
  });
  const sortedEmails = await User.distinct("email", {
    _id: { $in: result },
    isVerified: true,
  });
  return sortedEmails;
};

const getTeamChatNotificationsEmails = async () => {
  const result = await Setting.distinct("user_id", {
    "team_notification.chat_notifications": true,
  });
  const sortedEmails = await User.distinct("email", {
    _id: { $in: result },
    isVerified: true,
  });
  return sortedEmails;
};

module.exports = {
  getNewNotificationsEmails,
  getUpdateNotificationsEmails,
  getChatNotificationsEmails,

  // team
  getTeamNewNotificationsEmails,
  getTeamChatNotificationsEmails,
};
