const router = require("express").Router();
const adminController = require("../controllers/adminController");
const ticketController = require("../controllers/ticketController");

router.post("/login-admin", adminController.login);
// router.get("/event-stats", ticketController.eventStats);

module.exports = router;
