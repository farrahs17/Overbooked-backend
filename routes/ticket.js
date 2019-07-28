const router = require("express").Router();
const ticketController = require("../controllers/ticketController");
const isAuth = require("../middleware/is-auth");
const eventController = require("../controllers/eventController");
const checkoutController = require("../controllers/checkoutController");

router.post("/post-ticket", ticketController.createTicket);
// router.get("/get-tickets", ticketController.getTickets);
router.post("/checkout/", isAuth, checkoutController.checkout);

module.exports = router;
