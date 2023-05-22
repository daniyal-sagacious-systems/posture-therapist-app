const sql = require("./db.js");

// constructor
const Disease = function(disease) {
  this.name = disease.name;

};

Disease.create = (newDisease, result) => {
  sql.query("INSERT INTO diseases SET ?", newDisease, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created newDisease: ", { id: res.insertId, ...newDisease });
    result(null, { id: res.insertId, ...newDisease });
  });
};

Disease.findById = (id, result) => {
  sql.query(`SELECT * FROM diseases WHERE id = ${id}`, (err, res) => {
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

Disease.getAll = (title, result) => {
  let query = "SELECT * FROM diseases";

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

Disease.getAllPublished = result => {
  sql.query("SELECT * FROM diseases WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("diseases: ", res);
    result(null, res);
  });
};

Disease.updateById = (id, disease, result) => {
  sql.query(
    "UPDATE diseases SET name = ? WHERE id = ?",
    [disease.name,  id],
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

      console.log("updated diseases: ", { id: id, ...disease });
      result(null, { id: id, ...disease });
    }
  );
};

Disease.remove = (id, result) => {
  sql.query("DELETE FROM diseases WHERE id = ?", id, (err, res) => {
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

    console.log("deleted diseases with id: ", id);
    result(null, res);
  });
};

Disease.removeAll = result => {
  sql.query("DELETE FROM diseases", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} diseases`);
    result(null, res);
  });
};

module.exports = Disease;
