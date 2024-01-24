const User = require("../../user/user.model");
const Message = require("../message/message.model");
const Chat = require("./chat.model");

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (chat) {
      res.status(200).send({
        message: "Conversation exists!",
        conversationId: chat?._id,
      });
      return;
    }

    const newChat = new Chat({
      members: [senderId, receiverId],
    });

    const result = await newChat.save();
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const userChats = async (req, res) => {
  try {
    const result = await Chat.find({
      members: { $in: [req.params.userId] },
    });

    // console.log(result, "rsss");

    const userArray = result.map((i) =>
      i?.members.find((j) => j !== req.params.userId)
    );

    const userDetailsArray = await User.find({ _id: { $in: userArray } });

    // console.log(userDetailsArray, "dddd");

    res.status(200).send(userDetailsArray);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findChat = async (req, res) => {
  // console.log(req.params);
  try {
    const result = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getChatById = async (req, res) => {
  try {
    const result = await Chat.findOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
      message: "Chat Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Chat Retrieve Failed",
      error_message: error.message,
    });
  }
};

const updateChatById = async (req, res) => {
  try {
    const result = await Chat.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Chat Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Chat Update Failed",
      error_message: error.message,
    });
  }
};

const deleteChatById = async (req, res) => {
  try {
    const result = await Chat.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Chat Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Chat Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createChat,
  userChats,
  findChat,
  getChatById,
  updateChatById,
  deleteChatById,
};
