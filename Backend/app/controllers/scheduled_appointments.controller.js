const Scheduled_appointments = require("../models/scheduled_appointments.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {


  
  // Validate request
  if (!req.body ) {
    res.status(400).send({
      message: "Content can not be empty! "
    });
  }

  else{

  

  // Save Tutorial in the database
  Scheduled_appointments.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Diseases."
      });
    else res.send(data);
  });
}
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Scheduled_appointments.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Diseases."
      });
    else res.send(data);
  });
};


// Retrieve all Tutorials from the database (with condition).
exports.findAllForDoctor = (req, res) => {

  console.log("req query", req.params)

  const id = req.params.id;

  Scheduled_appointments.getAllForDoctor(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Diseases."
      });
    else res.send(data);
  });
};



// Retrieve all appointments scheduled today
exports.findAllScheduledToday = (req, res) => {


  Scheduled_appointments.getAllScheduledToday((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Diseases."
      });
    else res.send(data);
  });

};







// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Scheduled_appointments.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Scheduled_appointments.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Scheduled_appointments.updateById(
    req.params.id,
    new Disease(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Scheduled_appointments.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Scheduled_appointments.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
