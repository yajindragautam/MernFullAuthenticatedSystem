const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Unauthorized Token" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRRET, (err, user) => {
      if (err) return res.status(401).json({ msg: "Invalid Token" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ msg: err.message });
  }
};

//! Export module
module.exports = auth;