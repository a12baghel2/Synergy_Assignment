const express = require("express");
const verify = require("../controllers/verifyToken");
const route = express.Router();

route.put("/reset/password", verify, async (req, res) => {
  try {
    const resetPass = req.body.password;
    await req.user.update({
      password: resetPass,
    });
    res.status(200).send("Password change was sucessful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not process the request");
  }
});

module.exports = route;
