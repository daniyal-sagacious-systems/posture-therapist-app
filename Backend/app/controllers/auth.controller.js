const User = require("../models/user.model.js");
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');

// const bcrypt = require('bcrypt')


// Create and Save a new Tutorial
exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { email, password } = req.body;
  console.log("req.body", req.body)

  User.findByEmail(email.trim(), async (err, data) => {

    console.log("data", data)

    if (err) {


      if (err.kind === "not_found") {
        res.status(404).send({
          status: 'error',
          message: `User with email ${email} was not found`
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;

    }







    if (data) {
      if (
        
        
        // await bcrypt.compare(password, data.password)
        true
        
        ) {
        // const token = generateToken(data.id);
        res.status(200).send({
          status: 'success',
          data: {
            // token,
            // firstname: data.firstname,
            // lastname: data.lastname,
            // email: data.email


            age: 25,
            avatar: "/assets/images/face-6.jpg",
            email: data.email,
            id: data.id,

            name: data.first_name,
            role: data.role,
            username: data.surname








          }
        });
        return;
      }
      res.status(401).send({
        status: 'error',
        message: 'Incorrect password'
      });
    }
  })


















};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
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
  User.getAllPublished((err, data) => {
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

  User.updateById(
    req.params.id,
    new User(req.body),
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
  User.remove(req.params.id, (err, data) => {
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
