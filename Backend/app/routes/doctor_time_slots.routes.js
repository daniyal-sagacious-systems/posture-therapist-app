module.exports = app => {
  const doctor_time_slots = require("../controllers/doctor_time_slots.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", doctor_time_slots.create);


  router.post("/weeklyschedule", doctor_time_slots.weeklySchedule);


  // Retrieve all Tutorials
  router.get("/", doctor_time_slots.findAll);

  // Retrieve all published Tutorials
  router.get("/published", doctor_time_slots.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", doctor_time_slots.findOne);

  // Update a Tutorial with id
  router.put("/:id", doctor_time_slots.update);

  // Delete a Tutorial with id
  router.delete("/:id", doctor_time_slots.delete);

  // Delete all Tutorials
  router.delete("/", doctor_time_slots.deleteAll);

  app.use('/api/doctortimeslots', router);
};
