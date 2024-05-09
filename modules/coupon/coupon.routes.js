const express = require("express");
const {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("./coupon.controller");

const router = express.Router();

router.post("/add", addCoupon);
router.get("/", getCoupons);
router.put("/update/:id", updateCoupon);
router.delete("/delete/:id", deleteCoupon);

module.exports = router;
