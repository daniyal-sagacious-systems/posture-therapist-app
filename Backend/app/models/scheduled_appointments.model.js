const sql = require("./db.js");

constructor
const Scheduled_appointments = function(scheduled_appointments) {
  // this.start_time = doctor_time_slots.start_time;
  // this.end_time = doctor_time_slots.end_time;
  // this.doctor = doctor_time_slots.doctor;
};

Scheduled_appointments.create = (scheduled_appointments, result) => {

  // console.log("first", scheduled_appointments)
  // console.log("second", scheduled_appointments.map(ds => [ds.start_time, ds.end_time]))
  console.log("scheduled appointments", scheduled_appointments)

  sql.query("INSERT IGNORE INTO scheduled_appointments (date, start_time, end_time, doctor, patient, title) VALUES ?",





    [(scheduled_appointments.map(ds => [ds.date, ds.start_time, ds.end_time, ds.doctor, ds.patient, ds.title ]))],


    //  [ ['02-02-2023',    '03-03-2023']],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created scheduled_appointments: ", { id: res.insertId, ...scheduled_appointments });
      result(null, { id: res.insertId, ...scheduled_appointments });
    });
};

Scheduled_appointments.findById = (id, result) => {
  sql.query(`SELECT * FROM scheduled_appointments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found disease: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};


//INNER JOIN users on scheduled_appointments.doctor = users.id 

Scheduled_appointments.getAll = (title, result) => {
  let query = "SELECT scheduled_appointments.id, date, start_time,	end_time,	title,	doctor, users.first_name as doctorName, patients.first_name as patient  FROM scheduled_appointments INNER JOIN patients on scheduled_appointments.patient = patients.id INNER JOIN users on scheduled_appointments.doctor = users.id";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("diseases: ", res);
    result(null, res);
  });
};



Scheduled_appointments.getAllForDoctor = (id, result) => {
  let query = "SELECT scheduled_appointments.id, date, start_time,	end_time,	title,	doctor, first_name as patient  FROM scheduled_appointments INNER JOIN patients on scheduled_appointments.patient = patients.id";


    query += ` WHERE doctor = ${id}`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("diseases: ", res);
    result(null, res);
  });
};




// Get all today's scheduled appointments 

Scheduled_appointments.getAllScheduledToday = ( result) => {
  let query = "SELECT scheduled_appointments.id, date, start_time,	end_time,	title,	users.first_name as doctor, patients.first_name as patient, users.id as doctorId, patients.id as patientId  FROM scheduled_appointments INNER JOIN patients on scheduled_appointments.patient = patients.id INNER JOIN users on scheduled_appointments.doctor = users.id";


    query += ` WHERE DATE(start_time) = CURDATE();`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("diseases: ", res);
    result(null, res);
  });
};









Scheduled_appointments.getAllPublished = result => {
  sql.query("SELECT * FROM scheduled_appointments WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scheduled_appointments: ", res);
    result(null, res);
  });
};

Scheduled_appointments.updateById = (id, scheduled_appointments, result) => {
  sql.query(
    "UPDATE scheduled_appointments SET name = ? WHERE id = ?",
    [scheduled_appointments.name,  id],
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

      console.log("updated scheduled_appointments: ", { id: id, ...scheduled_appointments });
      result(null, { id: id, ...scheduled_appointments });
    }
  );
};

Scheduled_appointments.remove = (id, result) => {
  sql.query("DELETE FROM scheduled_appointments WHERE id = ?", id, (err, res) => {
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

    console.log("deleted scheduled_appointments with id: ", id);
    result(null, res);
  });
};

Scheduled_appointments.removeAll = result => {
  sql.query("DELETE FROM scheduled_appointments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} scheduled_appointments`);
    result(null, res);
  });
};

module.exports = Scheduled_appointments;
