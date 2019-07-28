const models = require("../models");
const Ticket = models.Ticket;

exports.createTicket = (req, res, next) => {
  const { price, TicketType } = req.body;
  Ticket.create({
    price,
    TicketType
  })
    .then(ticket => {
      res.status(200).json({ message: "created successfully" });
    })
    .catch(err => {
      res.status(400).json({ message: "creation failed" });
      console.log(err);
    });
};
