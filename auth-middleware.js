const jwt = require("jsonwebtoken");

const authMware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.send("no token in header");

  const decodedToken = jwt.verify(token, process.env.JWTSECRET);
  if (decodedToken) {
    next();
  } else {
    res.send("invalid token");
  }
};
module.exports = authMware;
