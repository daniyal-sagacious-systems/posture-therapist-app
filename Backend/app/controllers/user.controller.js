const User = require("../models/user.model.js");

// const bcrypt = require('bcrypt')

// Create and Save a new Tutorial
exports.create = async (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const uniqueFileName = (new Date()).getTime()

  // const salt =await  bcrypt.genSalt()

  // const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create a Tutorial
  const user = new User({
    // title: req.body.title,
    // description: req.body.description,
    // published: req.body.published || false
    surname: req.body.surname,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    // password: hashedPassword,
    cnic: req.body.cnic,
    date_of_birth: req.body.date_of_birth,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    home_phone: req.body.home_phone,
    work_phone: req.body.work_phone,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    practitioner_type: req.body.practitioner_type,
    designation: req.body.designation,
    role: req.body.role,
    remarks: req.body.remarks,
    password: req.body.password,
    specialization: req.body.specialization,
    engagement_terms: req.body.engagement_terms,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    picture: req.files && `${uniqueFileName}.jpg`
  });

  // Saving the audio file of doctor prescription

  if (req.files) {
    let filePath = __dirname + '/../../FileSystem2/' + uniqueFileName + '.jpg';
    let fileUpload = req.files.picture;
    await fileUpload.mv(filePath, function (err) {
      if (err) { console.log("Error while uploading file.", err) }
      else { console.log("File uploaded successfully!") }
    })
  }

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
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
