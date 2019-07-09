const router = require("express").Router();
const eventController = require("../controllers/eventController");

router.post("/post-ticket", eventController.createEvent);
router.get("/get-tickets", eventController.getEvents);
router.put("/edit-event/:eventId", eventController.EditEvent);

module.exports = router;
