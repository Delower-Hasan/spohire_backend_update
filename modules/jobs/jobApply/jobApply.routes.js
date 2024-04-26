const express = require("express");
const {
  createJobApply,
  getJobsApply,
  getJobApplyById,
  UpdateJobApplyById,
  DeleteJobApplyById,
  // getAppliedJobsByCreator,
  getPdfView,
  getMyAppliedJobs,
  getApplyJobsByJobId,
} = require("./jobApply.controller");
const { handleMulterError } = require("../../../config/multerConfig");
const multer = require("multer");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  isAuth,
  upload.single("cv"),
  handleMulterError,
  createJobApply
);
router.get("/", isAuth, getJobsApply);
router.get("/myAppliedJobs", isAuth, getMyAppliedJobs);
// router.get("/appliedJobs", isAuth, getAppliedJobsByCreator);
router.get("/appliedJobsByJobId/:id", isAuth, getApplyJobsByJobId);
router.get("/viewPdf/:id", isAuth, getPdfView);
router.get("/:id", isAuth, getJobApplyById);
router.patch("/:id", isAuth, handleMulterError, UpdateJobApplyById);
router.delete("/:id", isAuth, DeleteJobApplyById);

module.exports = router;
