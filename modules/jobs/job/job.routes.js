const express = require("express");
const { handleMulterError, upload } = require("../../../config/multerConfig");
const {
  createJob,
  getJobs,
  getJobById,
  UpdateJobById,
  DeleteJobById,
  getMyJobOffers,
} = require("./job.controller");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

router.post(
  "/create",
  upload.single("club_logo"),
  handleMulterError,
  createJob
);
router.get("/", getJobs);

router.get("/:id", getJobById);
router.get("/getMyJobOffers", isAuth, getMyJobOffers);
router.patch(
  "/:id",
  upload.single("club_logo"),
  handleMulterError,
  UpdateJobById
);
router.delete("/:id", DeleteJobById);

module.exports = router;
