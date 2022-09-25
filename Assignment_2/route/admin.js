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
    res.render('admin/home', {data : data});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error occurred");
  }
});

route.get('/create/user', verify, (req,res) => {
  res.render('admin/create');
})

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
    res.status(200).redirect("/admin/all");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

route.get("/edit/password/:id", verify,  async (req,res) => {
  const data = await user.findOne({where : {
    id  : req.params.id,
  }})
  res.render("admin/reset", {data : data});
})

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
    res.status(200).redirect("admin/all");
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});


route.get("/edit/details/:id", verify, async (req, res) => {
  const data = await user.findOne({where : {
    id  : req.params.id,
  }})
  res.render("admin/edit", {data : data});
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
    res.status(200).redirect("admin/all");
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
    res.status(200).redirect("admin/all");
  } catch (err) {
    res.status(500).send("Cannot delete");
  }
});

module.exports = route;
