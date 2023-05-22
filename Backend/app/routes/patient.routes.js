module.exports = app => {
  const patient = require("../controllers/patient.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", patient.create);

  // Retrieve all Tutorials
  router.get("/", patient.findAll);

  // Retrieve all published Tutorials
  router.get("/published", patient.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", patient.findOne);

  // Update a Tutorial with id
  router.put("/:id", patient.update);

  // Delete a Tutorial with id
  router.delete("/:id", patient.delete);

  // Delete all Tutorials
  router.delete("/", patient.deleteAll);

  app.use('/api/patients', router);
};
