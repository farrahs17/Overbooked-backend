const router = require("express").Router();
const ticketController = require("../controllers/ticketController");
const isAuth = require("../middleware/is-auth");
const eventController = require("../controllers/eventController");

router.post("/post-ticket", ticketController.createTicket);
// router.get("/get-tickets", ticketController.getTickets);
router.post("/checkout/:eventId/add", isAuth, ticketController.incQuantity);
router.post(
  "/checkout/:ticketId/subtract",
  isAuth,
  ticketController.decQuantity
);
router.get("/checkout/:eventId", isAuth, ticketController.total);

module.exports = router;
