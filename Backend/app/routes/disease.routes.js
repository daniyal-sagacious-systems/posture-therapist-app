module.exports = app => {

  const disease = require("../controllers/disease.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", disease.create);

  // Retrieve all Tutorials
  router.get("/", disease.findAll);

  // Retrieve all published Tutorials
  router.get("/published", disease.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", disease.findOne);

  // Update a Tutorial with id
  router.put("/:id", disease.update);

  // Delete a Tutorial with id
  router.delete("/:id", disease.delete);

  // Delete all Tutorials
  router.delete("/", disease.deleteAll);

  app.use('/api/diseases', router);
  
};
