module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/login", auth.signin);
  
    // Retrieve all Tutorials
    router.get("/", auth.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", auth.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", auth.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", auth.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", auth.delete);
  
    // Delete all Tutorials
    router.delete("/", auth.deleteAll);
  
    app.use('/api/auth', router);
  };
  