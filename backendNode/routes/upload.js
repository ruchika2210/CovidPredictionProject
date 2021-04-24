const express = require("express");
var FormData = require("form-data");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");
const Hospitaluser = require("../models/hospitalUser");
const sendSms = require("../sms/sms");
const testtaken = require("../models/testTaken");
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
app.use(express.static(`${process.cwd()}/uploads`));

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
router.post("/", async (req, res) => {
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
        const body = JSON.parse(JSON.stringify(req.body));
        console.log(body, Object.keys(body));
        const userType = body.usertype;
        const id = body.id;
        const name = body.name;
        console.log(name);
        console.log("Image is uploaded successfully");
        var formData = new FormData({ maxDataSize: 10000000000 });

        // process.cwd() gives root directory
        formData.append(
          "IMG",
          fs.createReadStream(process.cwd() + "/uploads/X-RAY" + extension)
        );

        axios
          .post("http://127.0.0.1:5000/uppp", formData, {
            headers: formData.getHeaders(),
          })
          .then(async (response) => {
            if (userType == "Hospital") {
              SENDSMSTOUSERS(id, response.data.result, name);
            }
            res.json(response.data);

            try {
              const entry = await testtaken({ name, userID: id });
              await entry.save();
            } catch (err) {
              console.log(err);
            }
            //For deleting the used File
            fs.unlinkSync(process.cwd() + "/uploads/X-RAY" + extension);
          });
      }
    }
  });
});

const SENDSMSTOUSERS = async (id, text, name) => {
  try {
    let user = await Hospitaluser.findOne({ _id: id });
    const numbers = user.staff.map((person) => String(person.number));
    console.log(numbers);

    const response = await sendSms(getMessage(text, name) + "Report", numbers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;

const getMessage = (text, name) => `${name} Covid test report is ${text}`;
