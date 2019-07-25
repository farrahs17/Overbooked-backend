const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    console.log("Not authenticated");
  }
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "salmawalidhefnawy94");
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    console.log("Not authenticated");
  }
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  req.isAdmin = decodedToken.isAdmin;
  next();
};
