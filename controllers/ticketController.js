const models = require("../models");
const Ticket = models.Ticket;
const User = models.User;
const userTicket_rel = models.userTicket_rel;
const Event = models.Event;

exports.createTicket = (req, res, next) => {
  const { price, TicketType } = req.body;
  Ticket.create({
    price,
    TicketType
  })
    .then(ticket => {
      res.status(200).json({ message: "created successfuly" });
    })
    .catch(err => {
      res.status(400).json({ message: "creation failed" });
      console.log(err);
    });
};

exports.incQuantity = (req, res, next) => {
  const ticketId = req.params.ticketId;
  // const { quantity, ticketId } = req.body;
  // const userId = req.userId;

  userTicket_rel
    .increment("quantity", {
      where: {
        id: ticketId
      }
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "ticket added" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "something went wrong" });
    });
};
