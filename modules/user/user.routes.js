const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
  getUser,
  getUserInfo,
  forgetPassword,
  changePassword,
  updateUserInfo,
} = require("./user.controller");
const { isAuth } = require("../../utils/middleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/verifyEmail", emailVerification);
router.post("/login", loginUser);
router.patch("/:id", updateUserInfo);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUser);
router.get("/user-info/me", isAuth, getUserInfo);
router.post("/forgot-password", forgetPassword);
router.post("/change-password", isAuth, changePassword);

// admin
router.get("/", isAuth, getAllUsers); //admin

module.exports = router;
