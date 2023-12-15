const express = require("express");
const {
  createChat,
  userChats,
  findChat,
  updateChatById,
  deleteChatById,
  getChatById,
} = require("./chat.controller");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
router.patch("/:id", getChatById);
router.patch("/:id", isAuth, updateChatById);
router.delete("/:id", isAuth, deleteChatById);

module.exports = router;
