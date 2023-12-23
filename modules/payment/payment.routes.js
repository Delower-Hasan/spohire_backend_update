const express = require("express");
const {
  createPayment,
  getAllPayments,
  getUserPayments,
  deletePayment,
} = require("./payment.controller");

const router = express.Router();

router.post("/create", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getUserPayments);
router.delete("/:id", deletePayment);

module.exports = router;
