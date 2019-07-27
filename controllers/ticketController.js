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
      res.status(200).json({ message: "created successfully" });
    })
    .catch(err => {
      res.status(400).json({ message: "creation failed" });
      console.log(err);
    });
};

exports.incQuantity = (req, res, next) => {
  // const ticketId = req.params.ticketId;
  const { quantity, ticketId } = req.body;
  const userId = req.userId;
  console.log(ticketId);
  console.log(userId);
  userTicket_rel
    .findOne({
      where: { ticket_id: ticketId, user_id: userId }
    })
    .then(result => {
      if (!result) {
        return userTicket_rel
          .create({ quantity: quantity, ticket_id: ticketId, user_id: userId })
          .then(result => {
            console.log(result);
            res
              .status(200)
              .json({ message: "ticket created for user" })
              .catch(err => {
                console.log(err);
                res.status(400).json({ message: "ticket creation failed" });
              });
          });
      }

      userTicket_rel
        .increment("quantity", {
          where: { ticket_id: ticketId, user_id: userId }
        })
        .then(result => {
          res.status(200).json({ message: "ticket added" });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ message: "something went wrong" });
        });

      res.status(200).json({ message: "ticket added" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "something went wrong try again later" });
    });
};

exports.decQuantity = (req, res, next) => {
  // const ticketId = req.params.ticketId;
  const { quantity, ticketId } = req.body;
  const userId = req.userId;
  console.log(ticketId);
  console.log(userId);
  userTicket_rel
    .findOne({
      where: { quantity: quantity, ticket_id: ticketId, user_id: userId }
    })
    .then(result => {
      userTicket_rel.decrement("quantity", {
        where: { ticket_id: ticketId, user_id: userId }
      });
      // .then(result => {
      //   console.log(result);
      //   res.status(200).json({ message: "ticket added" });
      // })
      // .catch(err => {
      //   console.log(err);
      //   res.status(400).json({ message: "something went wrong" });
      // });
      console.log(result);
      res.status(200).json({ message: "ticket added" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "something went wrong" });
    });
};
exports.total = (req, res, next) => {
  // const eventId = req.params.eventId;

  const { quantity, ticketId } = req.query;
  const eventId = req.params.eventId;
  const userId = req.userId;
  console.log(quantity, ticketId);
  console.log(eventId);
  console.log(userId);
  Ticket.findAll({
    where: { event_id: eventId },
    // include: [{ association: userTicket_rel }]
    through: [
      {
        model: userTicket_rel
      },

      { where: { user_id: userId } }
    ]
  })
    .then(result => {
      console.log("==================" + result[0]);
      // res.status(200).json(result);
      // Ticket.findAll({ where: { event_id: eventId } })
      // .then(result => {
      //   console.log("Tickets ============================" + result);
      // })
      // .catch(err => console.log(err));
      let tickets = result.map(item => ({ id: item.id, price: item.price }));
      console.log(tickets);
      let ticketsids = tickets.map(ticket => ticket.id);
      let ticketsprice = tickets.map(ticket => ticket.price);
      // console.log(ticketsids);
      userTicket_rel
        .findAll({
          where: {
            ticket_id: ticketsids
          }
        })
        .then(result => {
          // console.log(result);

          let quantity = result.map(item => item.quantity);
          console.log(ticketsprice);
          console.log(quantity);
          let total = 0;
          for (let i = 0; i < quantity.length; i++) {
            total += ticketsprice[i] * quantity[i];
          }
          console.log(total);
          res.status(200).json(total);
        });
    })
    .catch(err => console.log(err));
};
