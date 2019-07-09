const Event = require("../models/Event");

exports.createEvent = (req, res, next) => {
  const { imageUrl, title, category, description, price } = req.body;
  Event.create({
    imageUrl,
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
