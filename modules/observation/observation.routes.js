const express = require("express");
const {
  cdToggleObservation,
  getMyObservations,
  getObservationById,
  getAllObservations,
  updateObservationById,
  deleteObservationById,
} = require("./observation.controller");
const { isAuth } = require("../../utils/middleware");
const router = express.Router();

router.post("/cd", isAuth, cdToggleObservation);
router.get("/my-observations", isAuth, getMyObservations);
router.get("/", isAuth, getAllObservations);
router.get("/:id", isAuth, getObservationById);
router.patch("/:id", isAuth, updateObservationById);
router.delete("/:id", isAuth, deleteObservationById);

module.exports = router;
