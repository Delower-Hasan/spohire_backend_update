const express = require("express");
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
} = require("./blog.controller");
const { isAdmin } = require("../../utils/middleware");
const { upload } = require("../../config/multerConfig");


const router = express.Router();

// create new blog
router.post("/",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "cover_image", maxCount:1 },
]), isAdmin, createBlog);

// update blog by blog id
router.patch("/:id",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "cover_image", maxCount:1 },
]), isAdmin, updateBlog);

// get all blogs
router.get("/all", getAllBlogs);

// get single blog by blog id
router.get("/:id", getBlogById);

// get all blogs
router.delete("/:id", isAdmin, deleteBlog);

module.exports = router;
