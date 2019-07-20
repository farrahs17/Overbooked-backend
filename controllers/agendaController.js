const models = require("../models");
const Agenda = models.Agenda;

exports.getAgenda = (req, res, next) => {
  const eventId = req.params.eventId;
  console.log(eventId);

  Agenda.findAll({
    where: { event_id: eventId }
  })
    .then(agenda => {
      console.log(agenda);
      res.status(200).json({
        agenda
      });
    })
    .catch(err => {
      res.status(400).json({ message: "fetching events failed" });
      console.log(err);
    });
};
