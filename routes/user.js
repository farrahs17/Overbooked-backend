const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
