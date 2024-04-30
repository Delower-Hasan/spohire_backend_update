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
  updateUserSubscriptionPlan,
  getFilteredUsers,
  updateUSerCreatedProfile,
  cancleSubscription,
  getUserReferallProfile,
} = require("./user.controller");
const { isAuth } = require("../../utils/middleware");
const { upload } = require("../../config/multerConfig");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/verifyEmail", emailVerification);
router.get("/filteredUsers", getFilteredUsers);
router.post("/login", loginUser);
// router.patch("/:id", upload.single("image"), updateUserInfo);

router.delete("/delete/:id", isAuth, deleteUser);
router.patch("/subscriptionStatus/:id", isAuth, updateUserSubscriptionPlan);
router.get("/userReferrals", isAuth, getUserReferallProfile);
router.get("/:id", getUser);
router.get("/user-info/me", isAuth, getUserInfo);
router.post("/forgot-password", forgetPassword);
router.post("/change-password", isAuth, changePassword);

router.patch("/cancleSubscription", isAuth, cancleSubscription);
router.patch("/updateAddProfile/:id", isAuth, updateUSerCreatedProfile);
router.patch(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallary", maxCount: 3 },
  ]),
  updateUserInfo
);

// admin
router.get("/", isAuth, getAllUsers); //admin

module.exports = router;
