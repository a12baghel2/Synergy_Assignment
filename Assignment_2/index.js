const express = require("express");
const { db, user } = require("./controllers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoute = require("./route/auth");
const adminRoute = require("./route/admin");
const userRoute = require("./route/user");
const verify = require('./controllers/verifyToken')
const cookieParser = require("cookie-parser");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);


app.get("/", verify, async (req, res) => {
  console.log(req.cookies.token);
  res.status(200).send("successful")
});

db.sync()
  .then(() => {
    app.listen(4567, () => {
      console.log("server started at http://localhost:4567");
    });
  })
  .catch((err) => {
    throw err;
  });
