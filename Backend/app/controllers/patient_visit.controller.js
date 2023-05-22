const Patient_visit = require("../models/patient_visit.model.js");







// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }



  // console.log("audio file", req.files.audioFile.mv(__dirname + '/../../FileSystem/test.mp4'))




  const uniqueFileName = (new Date()).getTime()






  // Create a Tutorial
  const patient_visit = new Patient_visit({
    // title: req.body.title,
    // description: req.body.description,
    // published: req.body.published || false


    patient: req.body.patient,
    personal_conditions: req.body.personal_conditions,
    current_treatment: req.body.current_treatment,
    remarks: req.body.remarks,
    AssTrauma_diseases: req.body.AssTrauma_diseases,
    ROMstatus: req.body.ROMstatus,
    muscle_status: req.body.muscle_status,
    skin_soft_tissues_pain: req.body.skin_soft_tissues_pain,
    cardio_vascular_status: req.body.cardio_vascular_status,
    general_mobility: req.body.general_mobility,
    transfers: req.body.transfers,
    balance: req.body.balance,
    upper_limb_functions: req.body.upper_limb_functions,
    daily_life_activities: req.body.daily_life_activities,


    // Fields for doctor prescription
    DiagnosisICD10code: req.body.DiagnosisICD10code,
    BriefMedicalHistory: req.body.BriefMedicalHistory,
    WeightBearingPrecautions: req.body.WeightBearingPrecautions,
    ActivityRestrictions: req.body.ActivityRestrictions,
    OtherMedicalConsiderations: req.body.OtherMedicalConsiderations,
    PhysicalTherapyEvaluationTreatment: req.body.PhysicalTherapyEvaluationTreatment,
    Other: req.body.Other,
    AnticipatedFrequencyDuration: req.body.AnticipatedFrequencyDuration,
    SpecialInstructions: req.body.SpecialInstructions,
    audioFile: req.files && `${uniqueFileName}.mp3`



  });

  // Save Tutorial in the database
  Patient_visit.create(patient_visit, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });

    else res.send(data);
  });


  // Saving the audio file of doctor prescription

  if (req.files) {

    let filePath = __dirname + '/../../FileSystem/' + uniqueFileName + '.mp4';
    let fileUpload = req.files.audioFile;

    await fileUpload.mv(filePath, function (err) {

      if (err) { console.log("Error while uploading file.", err) }
      else { console.log("File uploaded successfully!") }

    })

  }


};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {

  const title = req.query.title;

  Patient_visit.getAll(title, (err, data) => {
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
  Patient_visit.findById(req.params.id, (err, data) => {
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
