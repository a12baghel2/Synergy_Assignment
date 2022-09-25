const express = require("express");
const { db, user } = require("./controllers/db");
const method_override = require("method-override")
const authRoute = require("./route/auth");
const adminRoute = require("./route/admin");
const userRoute = require("./route/user");
const forwardAuth = require("./controllers/forwardAuth");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(method_override("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);


app.get("/", forwardAuth, (req, res) => {
  res.render('index')
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
