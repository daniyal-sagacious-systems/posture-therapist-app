const sql = require("./db.js");

// constructor
const Patient = function (patient) {
  this.first_name = patient.first_name;
  this.middle_name = patient.middle_name;
  this.surname = patient.surname;

  this.date_of_birth = patient.date_of_birth ? patient.date_of_birth :null;
  this.age = patient.age;
  this.gender = patient.gender;
  this.address = patient.address;
  this.mobile_no = patient.mobile_no;
  this.email = patient.email;
  this.cnic = patient.cnic;

  this.date_registered = patient.date_registered;
  this.occupation = patient.occupation;
  this.physiotherapist_seen_before = patient.physiotherapist_seen_before;
  this.patient_concerns_for_previous_physiotherapist = patient.patient_concerns_for_previous_physiotherapist;
  this.patient_satisfactions_for_previous_physiotherapist = patient.patient_satisfactions_for_previous_physiotherapist;

  this.blood_group = patient.blood_group;
  this.medical_status = patient.medical_status;
  this.country = patient.country;
  this.state = patient.state;
  this.city = patient.city;
  



};

Patient.create = (newPatient, diseases, result) => {
  sql.query("INSERT INTO patients SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }


    console.log("array to be inserted", [diseases.map((d)=>[d , res.insertId])])

    sql.query("INSERT INTO patient_diseases (diseaseID, patientID) VALUES ?", [diseases.map((d)=>[parseInt(d) , res.insertId])], (err, res) => {
      console.log("patient_diseases inserted", err)
    })

    console.log("created Patient: ", { id: res.insertId, ...newPatient });
    result(null, { id: res.insertId, ...newPatient });
  });
};

Patient.findById = (id, result) => {
  sql.query(`SELECT * FROM patients WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Patient.getAll =  (title, result) => {
  let query = "SELECT * FROM patients";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  const allp =  sql.query(query, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);



  });


};

Patient.getAllPublished = result => {

  sql.query("SELECT * FROM patients WHERE published=true", (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patient: ", res);
    result(null, res);

  });
};



Patient.updateById = (id, patient, result) => {
  sql.query(
    "UPDATE patients SET first_name = ?, middle_name = ?, surname = ?, cnic = ?, date_of_birth = ?, age = ?, address = ?, email = ?, gender = ?, mobile_no = ?, date_registered = ?, occupation = ?, physiotherapist_seen_before = ?, patient_concerns_for_previous_physiotherapist = ?, patient_satisfactions_for_previous_physiotherapist = ? WHERE id = ?",
    [patient.first_name, patient.middle_name, patient.surname, patient.cnic, patient.date_of_birth, patient.age, patient.address, patient.email, patient.gender, patient.mobile_no, patient.date_registered, patient.occupation, patient.physiotherapist_seen_before, patient.patient_concerns_for_previous_physiotherapist, patient.patient_satisfactions_for_previous_physiotherapist, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { id: id, ...patient });
      result(null, { id: id, ...patient });
    }
  );
};

Patient.remove = (id, result) => {
  sql.query("DELETE FROM patients WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted patients with id: ", id);
    result(null, res);
  });
};

Patient.removeAll = result => {
  sql.query("DELETE FROM patients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} patients`);
    result(null, res);
  });
};

module.exports = Patient;
