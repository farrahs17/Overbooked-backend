const models = require("../models");
const Event = models.Event;

exports.createEvent = (req, res, next) => {
  const { image, title, category, description, price } = req.body;
  Event.create({
    image,
    title,
    description,
    price,
    category
  })
    .then(ticket => {
      res.status(200).json({ message: "created successfuly" });
    })
    .catch(err => {
      res.status(400).json({ message: "creation failed" });
      console.log(err);
    });
};

exports.getEvents = (req, res, next) => {
  Event.findAll()
    .then(events => {
      res.status(200).json({
        events
      });
    })
    .catch(err => {
      res.status(400).json({ message: "loading tickets failed" });
      console.log(err);
    });
};

exports.EditEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  const { image, title, category, description, startAt, endAt } = req.body;
  Event.findByPk(eventId).then(event => {
    if (!event) {
      res.status(400).json({ message: "no event found" });
    }
    event
      .update({ image, title, category, description, startAt, endAt })
      .then(result => res.status(200).json({ result }))
      .catch(err => {
        res.status(400).json({ message: "updating failed" });
        console.log(err);
      });
  });
};
