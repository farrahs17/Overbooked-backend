const Ticket = require("../models/Ticket");

exports.createTicket = (req, res, next) => {
  const { imageUrl, title, category, description, price } = req.body;
  Ticket.create({
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

exports.getTickets = (req, res, next) => {
  Ticket.findAll()
    .then(tickets => {
      res.status(200).json({
        tickets
      });
    })
    .catch(err => {
      res.status(400).json({ message: "loading tickets failed" });
      console.log(err);
    });
};
