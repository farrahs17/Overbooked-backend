const stripe = require("stripe")("sk_test_fZdwtyvNiGY69eNm9fsluWXi00dYJW06sO");
const models = require("../models");

const userTicket_rel = models.userTicket_rel;

exports.checkout = (req, res, next) => {
  const token = req.body.token.id;
  const amount = req.body.total * 100;
  let tickets = req.body.tickets;
  console.log(token, amount);
  const charge = stripe.charges
    .create({
      amount: amount,
      currency: "usd",
      description: "Ticket",
      source: token
    })
    .then(res => {
      const userId = req.userId;
      tickets = tickets.map(ticket => {
        ticket.user_id = userId;
        return ticket;
      });
      debugger;
      userTicket_rel.bulkCreate(tickets).then(result => {
        console.log(result);
      });
    })
    .catch(err => {
      res.status(422).json({ message: err.message });
      console.log("nooo");
      console.log(err.message);
    });
};
