const express = require("express");
const { user } = require("../controllers/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('../controllers/verifyToken');
const route = express.Router();

route.post("/login", async (req, res) => {
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
    if(!compare) return res.status(400).send("invalid Credentials");
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
    console.log(token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "user authenticated successfull", user: existUser });
  } catch (err) {
    console.log(err);
  }
});

route.delete('/logout', verify ,async (req,res) => {
    try{
        res.clearCookie("token");
        res.status(200).send("successfully logout")
    }catch(err){
        console.log(err);
        res.status(500).send("Some error persist")
    }
})


module.exports = route;
