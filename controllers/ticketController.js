const models = require("../models");
const Ticket = models.Ticket;
const Event = models.Event;
const userTicket_rel = models.userTicket_rel;

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

// exports.eventStats = (req, res, next) => {
//   let eventTitles = [];
//   let tickets = [];
//   Event.findAll()
//     .then(result => {
//       console.log(result);
//       result.map(event => {
//         eventTitles.push(event.title);
//       });
//     })
//     .catch(err => console.log(err));
// };
