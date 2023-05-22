const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.getConnection((err, connection) => {
  
  if (err) throw err;
  
  var sql = "CREATE TABLE IF NOT EXISTS patients (id int NOT NULL AUTO_INCREMENT, first_name VARCHAR(255), middle_name VARCHAR(255), surname VARCHAR(255), date_of_birth date, age VARCHAR(255), gender VARCHAR(255), address VARCHAR(255), mobile_no VARCHAR(255), email VARCHAR(255), occupation VARCHAR(255), designation VARCHAR(255), ";
  sql += "physiotherapist_seen_before TINYINT(1), patient_concerns_for_previous_physiotherapist VARCHAR(255), patient_satisfactions_for_previous_physiotherapist VARCHAR(255))"
  
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
  // Database related queries here ...
  // It means:             query 1
  //           related sub-query 2
  //           related sub-query 3
  //           ...
  // After all queres call:
  //           connection.release();

});

module.exports = connection;