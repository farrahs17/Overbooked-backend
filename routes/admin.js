const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/login-admin", adminController.login);

module.exports = router;
