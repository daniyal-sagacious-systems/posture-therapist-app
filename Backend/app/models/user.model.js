const sql = require("./db.js");

// constructor
const User = function(user) {

  this.first_name = user.first_name;
  this.middle_name = user.middle_name;
  this.surname = user.surname;
  this.password = user.password;
  this.date_of_birth = user.date_of_birth;
  this.age = user.age;
  this.gender = user.gender;
  this.address =user.address;
  this.home_phone = user.home_phone;
  this.work_phone = user.work_phone;
  this.mobile_no = user.mobile_no;
  this.email = user.email;
  this.practitioner_type = user.practitioner_type;
  this.cnic = user.cnic;
  this.role = user.role;  
  this.remarks = user.remarks;

  this.specialization = user.specialization;
  this.engagement_terms = user.engagement_terms;
  this.country = user.country;
  this.state = user.state;
  this.city = user.city;
  this.picture = user.picture;


};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM users where  isnull(role)";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

User.getAllPublished = result => {

  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);

  });
};



User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, middle_name = ?, surname = ?, cnic = ?, date_of_birth = ?, age = ?, address = ?, email = ?, gender = ?, home_phone = ?, mobile_no = ?, practitioner_type = ?, work_phone = ?, remarks = ? WHERE id = ?",
    [user.first_name, user.middle_name, user.surname, user.cnic, user.date_of_birth, user.age, user.address, user.email, user.gender, user.home_phone, user.mobile_no, user.practitioner_type, user.work_phone, user.remarks,  id],
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

      console.log("updated patient: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};




User.findByEmail=(email, result) =>{
  sql.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {


    console.log("query",res)



      if (err) {
          console.log("err of query",err.message);
          result(err, null);
          return;
      }
      if (res.length) {
          result(null, res[0]);
          return;
      }
      result({ kind: "not_found" }, null);
  })
}

module.exports = User;
