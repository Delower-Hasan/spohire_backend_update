const { sendNotificationMail } = require("../../../utils/sendEmailHelpers");
const { getChatNotificationsEmails } = require("../../setting/setting.utiles");
const Message = require("./message.model");

const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const result = await newMessage.save();
    const data = await getChatNotificationsEmails();
    await sendNotificationMail(data);
    res.status(200).json({
      success: true,
      message: "Message Send Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Message Send Failed",
      error_message: error.message,
    });
  }
};

const getMessagesByChat = async (req, res) => {
  try {
    const result = await Message.find({ chat: req.params.chatId });
    res.status(200).json({
      success: true,
      message: "Messages Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Messages Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const result = await Message.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Message Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Message Retrieve Failed",
      error_message: error.message,
    });
  }
};

const setMessagesSeen = async (req, res) => {
  try {
    const result = await Message.find(
      { $and: [{ chat: req.params.chatId }, { isSeen: false }] },
      { isSeen: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Messages Seen Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Messages Seen Failed",
      error_message: error.message,
    });
  }
};

const updateMessageById = async (req, res) => {
  try {
    const result = await Message.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Message Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Message Update Failed",
      error_message: error.message,
    });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const result = await Message.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Message Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Message Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  addMessage,
  getMessagesByChat,
  getMessageById,
  setMessagesSeen,
  updateMessageById,
  deleteMessageById,
};
