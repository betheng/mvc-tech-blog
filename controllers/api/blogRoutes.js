// Import required modules and utilities
const express = require("express");
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../util/auth.js");

// Initialize the router
const router = express.Router();

// Get all blogs along with associated users and comments
router.get("/", (req, res) => {
  Blog.findAll({ include: [User, Comment] })
    .then(dbBlogs => res.json(dbBlogs))
    .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Get a single blog by ID along with associated user and comment
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, { include: [User, Comment] })
    .then(dbBlog => res.json(dbBlog))
    .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Create a new blog post
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to create a new blog post!" });
  }

  Blog.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.session.user.id
  })
  .then(newBlog => res.json(newBlog))
  .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Update an existing blog post
router.put("/:id", withAuth, (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedBlog => res.json(updatedBlog))
  .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Delete a blog post by ID
router.delete("/:id", withAuth, (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(delBlog => res.json(delBlog))
  .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Export the router
module.exports = router;