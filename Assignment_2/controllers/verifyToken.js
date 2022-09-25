const jwt = require("jsonwebtoken");
const { user } = require("./db");

const verify = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.redirect('/auth/login')
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(verifyToken);
    req.user = await user.findOne({
      where: {
        id: verifyToken.user_id,
      },
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).redirect("/auth/login");
  }
};

module.exports = verify;
