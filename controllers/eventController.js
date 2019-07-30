const models = require("../models");
const Event = models.Event;
const Ticket = models.Ticket;
const Agenda = models.Agenda;

exports.createEvent = (req, res, next) => {
  const { title, category, description, startsAt, endsAt } = req.body;

  let tickets = JSON.parse(req.body.tickets);
  let agendas = JSON.parse(req.body.agendas);
  let image = req.file.path;
  console.log(tickets);
  Event.create(
    {
      image,
      title,
      description,
      category,
      startsAt,
      endsAt,
      tickets,
      agendas
    },
    {
      include: [Ticket, Agenda]
    }
  )
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(400).json({ message: "Event creation failed" });
    });
};

exports.getEvents = (req, res, next) => {
  Event.findAll()
    .then(events => {
      console.log(events);
      res.status(200).json({
        events
      });
    })
    .catch(err => {
      res.status(400).json({ message: "Loading events failed" });
      console.log(err);
    });
};

exports.getOneEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findByPk(eventId, { include: [Ticket, Agenda] })
    .then(event => res.status(200).json(event))
    .catch(err => {
      res.status(400).json({ message: "Event not found" });
      console.log(err);
    });
};

exports.editEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  const { title, category, description, startsAt, endsAt } = req.body;
  Event.findByPk(eventId).then(event => {
    debugger;
    if (!event) {
      res.status(400).json({ message: "Event not found" });
    }
    event
      .update({
        title: title,
        category: category,
        description: description,
        startsAt: startsAt,
        endsAt: endsAt
      })
      .then(result => res.status(200).json({ result }))
      .catch(err => {
        res.status(400).json({ message: "Event updating failed" });
        console.log(err);
      });
  });
};

exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findByPk(eventId)
    .then(event => {
      if (!event) {
        res.status(400).json({ message: "No event found" });
      }
      return event.destroy();
    })
    .then(result => res.status(200).json({ message: "Event deleted" }))
    .catch(err => {
      res.status(400).json({ message: "Deleting failed" });
      console.log(err);
    });
};

exports.filterEvents = (req, res, next) => {
  const category = req.params.category;
  Event.findAll({
    where: { category: category }
  })
    .then(events => {
      console.log(events);
      res.status(200).json({
        events
      });
    })
    .catch(err => {
      res.status(400).json({ message: "Filtering events failed" });
      console.log(err);
    });
};
