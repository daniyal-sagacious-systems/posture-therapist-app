

const multer = require('multer');
const express = require("express");
const fileUpload = require('express-fileupload')
const path = require('path')

// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());
app.use(fileUpload());
app.use(express.static('FileSystem'));
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route



// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });





// ******************   Multer implementation    *************************


// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, 'public/images')
//   },

//   filename: (req, file, cb) => {
//     cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
//   }
// }
// )

// const upload = multer({ storage: storage })




require("./app/routes/patient_visit.routes.js")(app);
require("./app/routes/patient.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/disease.routes.js")(app);
require("./app/routes/doctor_time_slots.routes.js")(app);
require("./app/routes/scheduled_appointments.routes.js")(app);
require("./app/routes/services.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
