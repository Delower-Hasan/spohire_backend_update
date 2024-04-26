const express = require("express");
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
} = require("./blog.controller");
const { isAdmin } = require("../../utils/middleware");

const router = express.Router();

// create new blog
router.post("/", isAdmin, createBlog);

// update blog by blog id
router.patch("/:id", isAdmin, updateBlog);

// get all blogs
router.get("/all", getAllBlogs);

// get single blog by blog id
router.get("/:id", getBlogById);

// get all blogs
router.delete("/:id", isAdmin, deleteBlog);

module.exports = router;
