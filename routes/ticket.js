const router = require("express").Router();
const ticketController = require("../controllers/ticketController");

router.post("/post-ticket", ticketController.createTicket);
// router.get("/get-tickets", ticketController.getTickets);

module.exports = router;
