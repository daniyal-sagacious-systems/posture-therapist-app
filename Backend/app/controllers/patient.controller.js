const Patient = require("../models/patient.model.js");

const Redis = require('redis')

const redisClient = Redis.createClient()

function getOrSetCache(key) {
  return new Promise(async (resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err)
      if (data != null) return resolve(JSON.parse(data))
      // const freshData = await cb()
      // redisClient.set(key , freshData)
    })
  })
}




// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const patient = new Patient({

    surname: req.body.lastname,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    cnic: req.body.cnic,
    date_of_birth: req.body.date_of_birth,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    date_registered: req.body.date_registered,
    occupation: req.body.occupation,
    physiotherapist_seen_before: req.body.physiotherapist_seen_before,
    patient_concerns_for_previous_physiotherapist: req.body.patient_concerns_for_previous_physiotherapist,
    patient_satisfactions_for_previous_physiotherapist: req.body.patient_satisfactions_for_previous_physiotherapist,


    blood_group : req.body.blood_group,
    medical_status : req.body.medical_status,
    country : req.body.country,
    state : req.body.state,
    city : req.body.city

  });

  // Save Tutorial in the database
  Patient.create(patient,req.body.diseases, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {

  const title = req.query.title;

  // const cache = await getOrSetCache('patients')

  Patient.getAll(title, async(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else {
      res.send(data)
      // await redisClient.set('patients', data)
    }
  });




  //  const allPatients = await Patient.getAll(title)


};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Patient.findById(req.params.id, (err, data) => {
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
  Tutorial.getAllPublished((err, data) => {
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

  Patient.updateById(
    req.params.id,
    new Patient(req.body),
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
  Patient.remove(req.params.id, (err, data) => {
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
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
