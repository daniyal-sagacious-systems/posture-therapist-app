module.exports = app => {

  const patient_visit = require("../controllers/patient_visit.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", patient_visit.create);

  // Retrieve all Tutorials
  router.get("/", patient_visit.findAll);

  // Retrieve all published Tutorials
  router.get("/published", patient_visit.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", patient_visit.findOne);

  // Update a Tutorial with id
  router.put("/:id", patient_visit.update);

  // Delete a Tutorial with id
  router.delete("/:id", patient_visit.delete);

  // Delete all Tutorials
  router.delete("/", patient_visit.deleteAll);

  app.use('/api/patientvisits', router);
  
};
