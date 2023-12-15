const express = require("express");
const {
  createAnnouncement,
  getAnnouncementById,
  getAnnouncements,
  UpdateAnnouncementById,
  DeleteAnnouncementById,
} = require("./announcement.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");
const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  handleMulterError,
  createAnnouncement
);
router.get("/", getAnnouncements);
router.get("/:id", getAnnouncementById);
router.patch(
  "/:id",
  upload.single("image"),
  handleMulterError,
  UpdateAnnouncementById
);
router.delete("/:id", DeleteAnnouncementById);

module.exports = router;
