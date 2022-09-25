const express = require("express");
const bcrypt = require("bcrypt");
const verify = require("../controllers/isAdminVerify");
const { user } = require("../controllers/db");

const route = express.Router();

route.get("/all", verify, async (req, res) => {
  try {
    const data = await user.findAll({
      where: {
        role: "user",
      },
    });
    console.log(req.ip);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error occurred");
  }
});

route.post("/create/user", verify, async (req, res) => {
  try {
    const email = req.body.email;
    const userExist = await user.findOne({ where: { email: email } });
    if (userExist) return res.status(402).send("User already exist");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send({ message: "user added successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

route.put("/edit/password/:id", verify, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await user.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send("Password updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

route.put("/edit/details/:id", verify, async (req, res) => {
  try {
    const email = req.body.email;
    const userExist = await user.findOne({ where: { email: email } });
    console.log(userExist.id !== req.params.id);
    if (userExist && userExist.id != req.params.id) return res.status(402).send("User already exist with this mail");
    await user.update(
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send("User updated sucessfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

route.delete("/delete/:id", verify, async (req, res) => {
  try {
    await user.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.status(500).send("Cannot delete");
  }
});

module.exports = route;
