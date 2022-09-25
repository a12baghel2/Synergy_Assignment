const jwt = require("jsonwebtoken");

const forwardAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if(verifyToken.role === "admin") return res.redirect("/admin/all");
    res.redirect('/user/');
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not process request");
  }
};

module.exports = forwardAuth;