const express = require("express");
const { upload, handleMulterError } = require("../../config/multerConfig");
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
  buySubscriptionForPlayer,
  updatePlayerInfo,
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
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  updatePlayerInfo
);
router.delete("/:id", DeletePlayerById);

module.exports = router;
