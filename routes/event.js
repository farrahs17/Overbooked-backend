const router = require("express").Router();
const eventController = require("../controllers/eventController");

router.post("/post-ticket", eventController.createEvent);
router.get("/get-tickets", eventController.getEvents);

module.exports = router;
