const express = require("express");
const {
  addMessage,
  getMessagesByChat,
  getMessageById,
  updateMessageById,
  deleteMessageById,
  setMessagesSeen,
} = require("./message.controller");
const router = express.Router();

router.post("/add-message", addMessage);
router.get("/:chatId", getMessagesByChat);
router.get("/:id", getMessageById);
router.patch("/:chatId", setMessagesSeen);
router.patch("/:id", updateMessageById);
router.delete("/:id", deleteMessageById);

module.exports = router;
