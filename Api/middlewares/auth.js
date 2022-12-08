const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.autorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      next();
    } else {
      console.log("auth failed.");
    }
  });
};
