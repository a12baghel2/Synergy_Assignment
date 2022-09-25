const express = require("express");
const { user, logs } = require("../controllers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../controllers/verifyToken");
const forwardAuth = require("../controllers/forwardAuth");
const route = express.Router();

route.get("/login", forwardAuth, (req,res) => {
  res.render("login");
})

route.post("/login", forwardAuth, async (req, res) => {
  try {
    const existUser = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!existUser) {
      return res.status(404).send("user does not exist with this mail.");
    }
    const compare = await bcrypt.compare(req.body.password, existUser.password);
    if (!compare) return res.status(400).send("invalid Credentials");
    const token = await jwt.sign(
      {
        user_id: existUser.id,
        role: existUser.role,
        email: req.body.email,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "5h",
      }
    );
    await logs.create({
      email: existUser.email,
      client_ip: req.ip,
      activity: "login",
    });
    console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });
    if(existUser.role === "user"){
      return res.redirect('/user/');
    }
    res.redirect('/admin/all');
  } catch (err) {
    console.log(err);
  }
});

route.delete("/logout", verify, async (req, res) => {
  try {
    await logs.create({
      email: req.user.email,
      client_ip: req.ip,
      activity: "logout",
    });
    res.clearCookie("token");
    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error persist");
  }
});

module.exports = route;
