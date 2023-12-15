const express = require("express");
const { upload, handleMulterError } = require("../../config/multerConfig");
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
} = require("./player.controller");
const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "gallery", maxCount: 6 }]),
  handleMulterError,
  createPlayer
);
router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.patch(
  "/:id",
  upload.fields([{ name: "gallery", maxCount: 6 }]),
  handleMulterError,
  UpdatePlayerById
);
router.delete("/:id", DeletePlayerById);

module.exports = router;
