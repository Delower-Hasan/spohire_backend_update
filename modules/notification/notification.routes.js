const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createNotification,
  getMyNotification,
  deleteNotification,
  putMyNotificationInSeen,
} = require("./notification.controller");

const router = express.Router();

router.post("/create", isAuth, createNotification);
router.get("/myNotifications", isAuth, getMyNotification);

router.patch("/updateMyNotificationStatus", isAuth, putMyNotificationInSeen);

router.delete("/:id", isAuth, deleteNotification);

module.exports = router;
