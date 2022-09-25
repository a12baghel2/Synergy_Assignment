const express = require("express");
const bcrypt = require("bcrypt");
const { logs } = require("../controllers/db");
const verify = require("../controllers/verifyToken");
const route = express.Router();

route.get("/", verify, (req, res) => {
  res.render("user/home", { data: req.user });
});

route.get("/view/logs", verify, async (req, res) => {
  try {
    const data = await logs.findAll({
      where: {
        email: req.user.email,
      },
    });
    res.render("user/logs",{data : data});
  } catch (err) {
    console.log(err);
    res.status(500).redirect("/user/");
  }
});

route.get("/reset/password", verify,  (req, res) => {
  res.render("user/reset");
});

route.put("/reset/password", verify, async (req, res) => {
  try {
    const resetPass = await bcrypt.hash(req.body.password, 10);
    await req.user.update({
      password: resetPass,
    });
    await logs.create({
      email: req.user.email,
      client_ip: req.ip,
      activity: "Password change",
    });
    res.status(200).redirect("/user/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not process the request");
  }
});

module.exports = route;
