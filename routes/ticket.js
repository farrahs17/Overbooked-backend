const router = require("express").Router();
const ticketController = require("../controllers/ticketController");

router.post("/post-ticket", ticketController.createTicket);

module.exports = router;
