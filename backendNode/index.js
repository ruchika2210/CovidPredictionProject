const express = require("express");
var FormData = require("form-data");
const multer = require("multer");
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");
const Covid = require("./MongoDB/model");
const mongoose = require("mongoose");

let extension = "";

// set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    extension = path.extname(file.originalname);
    cb(null, "X-RAY" + path.extname(file.originalname));
  },
});

// Init app
const app = express();
app.use(express.static(`${__dirname}/uploads`));
// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("IMG");

//check file
function checkFileType(file, cb) {
  //allowed file extensions
  const filetypes = /jpeg|jpeg|png|gif|jpg/;
  //check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check the mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:Images only");
  }
}

// Post request
app.post("/upload", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.json({
          msg: "Error: No File Selected!",
        });
      } else {
        console.log("Image is uploaded successfully");
        var formData = new FormData({ maxDataSize: 10000000000 });

        formData.append(
          "IMG",
          fs.createReadStream(__dirname + "/uploads/X-RAY" + extension)
        );

        axios
          .post("http://127.0.0.1:5000/uppp", formData, {
            headers: formData.getHeaders(),
          })
          .then((response) => {
            res.json(response.data);
            //For deleting the used File
            fs.unlinkSync(__dirname + "/uploads/X-RAY" + extension);
          });
      }
    }
  });
});

//Sample mongo Test
app.post("/send", async (req, res) => {
  const covidd = new Covid({
    name: "Ruchika",
  });

  covidd.save();
  
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
