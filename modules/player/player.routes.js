const express = require("express");
const { upload, handleMulterError } = require("../../config/multerConfig");
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
  buySubscriptionForPlayer,
} = require("./player.controller");
const { isAuth } = require("../../utils/middleware");
const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  isAuth,
  createPlayer
);

router.patch("/buySubscriptionForPlayer", isAuth, buySubscriptionForPlayer);
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
