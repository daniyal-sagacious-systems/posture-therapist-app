module.exports = app => {
  const scheduled_appointments = require("../controllers/scheduled_appointments.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", scheduled_appointments.create);

  // Retrieve all Tutorials
  router.get("/", scheduled_appointments.findAll);

  // Retrieve all published Tutorials
  router.get("/published", scheduled_appointments.findAllPublished);

  
  // Retrieve all appointments scheduled today
  router.get("/current", scheduled_appointments.findAllScheduledToday);

  // Retrieve a single Tutorial with id
  router.get("/:id", scheduled_appointments.findAllForDoctor);

  // Update a Tutorial with id
  router.put("/:id", scheduled_appointments.update);

  // Delete a Tutorial with id
  router.delete("/:id", scheduled_appointments.delete);

  // Delete all Tutorials
  router.delete("/", scheduled_appointments.deleteAll);

  app.use('/api/scheduledappointments', router);
};
