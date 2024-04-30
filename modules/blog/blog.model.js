const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    type: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
    },
    short_description: {  
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fb: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
