const express = require("express");
const {
  createJobApply,
  getJobsApply,
  getJobApplyById,
  UpdateJobApplyById,
  DeleteJobApplyById,
} = require("./jobApply.controller");
const { handleMulterError } = require("../../../config/multerConfig");
const router = express.Router();

router.post("/create", handleMulterError, createJobApply);
router.get("/", getJobsApply);
router.get("/:id", getJobApplyById);
router.patch("/:id", handleMulterError, UpdateJobApplyById);
router.delete("/:id", DeleteJobApplyById);

module.exports = router;
