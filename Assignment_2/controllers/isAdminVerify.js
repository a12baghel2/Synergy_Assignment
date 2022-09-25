const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/");
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(verifyToken);
    if(verifyToken.role !== 'admin') return res.status(401).send("Unauthorized");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Please login");
  }
};

module.exports = isAdmin;
