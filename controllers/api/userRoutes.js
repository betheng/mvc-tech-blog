const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models/");
const bcrypt = require("bcrypt");

// Fetch all users with their blogs and comments
router.get("/", async (req, res) => {
  try {
    const dbUsers = await User.findAll({ include: [Blog, Comment] });
    res.json(dbUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

// Logout user
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Fetch a user by ID with their blogs and comments
router.get("/:id", async (req, res) => {
  try {
    const dbUser = await User.findByPk(req.params.id, { include: [Blog, Comment] });
    res.json(dbUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

// User signup
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body, { individualHooks: true });
    req.session.user = {
      id: newUser.id,
      username: newUser.username
    };
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ where: { username: req.body.username } });

    if (!foundUser) {
      return res.status(400).json({ msg: "Wrong login credentials" });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (passwordMatch) {
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      };
      res.json(foundUser);
    } else {
      res.status(400).json({ msg: "The username or password you entered is incorrect!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const delUser = await User.destroy({
      where: { id: req.params.id }
    });
    res.json(delUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred; please try again later.", err });
  }
});

module.exports = router;