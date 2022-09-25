const jwt = require("jsonwebtoken");
const { user } = require("./db");

const verify = async (req, res, next) => {
  try {
    const token = req.cookies.token;
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
    res.status(401).send("Please login");
  }
};

module.exports = verify;
