// Import required modules and models
const express = require("express");
const { User, Blog, Comment } = require("../../models");

// Initialize the router
const router = express.Router();

// Get all comments along with associated users and blogs
router.get("/", (req, res) => {
  Comment.findAll({ include: [User, Blog] })
    .then(dbComments => res.json(dbComments))
    .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Get a single comment by ID, along with associated user and blog
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, { include: [User, Blog] })
    .then(dbComment => res.json(dbComment))
    .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Create a new comment
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login first; you need to be logged in to comment!" });
  }

  Comment.create({
    body: req.body.body,
    userId: req.session.user.id,
    blogId: req.body.blogId
  })
  .then(newComment => res.json(newComment))
  .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
});

// Update an existing comment & ensure user updating is original author
router.put("/:id", (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login first; you need to be logged in to make updates!" });
    }
  
    // Fetch the existing comment to check the original author
    Comment.findByPk(req.params.id)
      .then(comment => {
        // Check if the user making the request is the original author of the comment
        if (comment.userId === req.session.user.id) {
          Comment.update(req.body, {
            where: {
              id: req.params.id
            }
          })
          .then(updatedComment => res.json(updatedComment))
          .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
        } else {
          res.status(403).json({ msg: "Only the original poster can update this comment." });
        }
      })
      .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
  });
  

// Delete a comment by ID & Ensure user deleting is original author
router.delete("/:id", (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Please login first; you need to be logged in to delete a comment!" });
    }
  
    Comment.findByPk(req.params.id)
      .then(comment => {
        // Check if the user making the request is the original author of the comment
        if (comment.userId === req.session.user.id) {
          Comment.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(delComment => res.json(delComment))
          .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
        } else {
          res.status(403).json({ msg: "Only the original poster can delete this comment." });
        }
      })
      .catch(err => res.status(500).json({ msg: "An error occurred; please try again.", err }));
  });

// Export the router
module.exports = router;