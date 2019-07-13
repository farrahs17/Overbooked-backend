const router = require("express").Router();
const eventController = require("../controllers/eventController");

router.post("/post-event", eventController.createEvent);
router.get("/get-events", eventController.getEvents);
router.put("/edit-event/:eventId", eventController.editEvent);
router.delete("/edit-delete/:eventId", eventController.deleteEvent);
router.get("/get-event/:eventId", eventController.getOneEvent);

module.exports = router;
