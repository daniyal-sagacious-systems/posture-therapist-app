const Invoice = require("../models/invoice.model.js");

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
  const invoice = new Invoice({


    date : req.body.date,
    sub_total : req.body.sub_total,
    patient : req.body.patient,
    doctor : req.body.doctor,
    discount : req.body.discount,
    tax_rate : req.body.tax_rate,
    items : req.body.items,
    // invoice : req.body.invoice,
    price : req.body.price,


  });

  // Save Tutorial in the database
  Invoice.create(invoice, (err, data) => {
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
