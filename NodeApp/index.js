const express = require("express");
var FormData = require("form-data");
const multer = require("multer");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");
const http = require("http");

// set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, "EX-RAY" + path.extname(file.originalname));
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
        // var img = new Image();
        // img.src = path(req.file.path);
        // console.log(img);
        // fs.readFile(__dirname + "/uploads/EX-RAY.png", function (err, data) {
        //   if (err) throw err;
        //   // const file = new File([data], "image.jpeg", { type: blob.type });
        //   console.log(data, "DATA");
        //   formData.append("IMG", data);
        // });
        // const s = fs.readFileSync(__dirname + "/uploads/EX-RAY.png");
        // formData.append("IMG", s);
        // console.log(formData);
        axios
          .get("http://nodejs.org/images/logo.png")
          .then((res) => {
            formData.append("my_logo", res);
            console.log(formData);
          })
          .catch((err) => console.log(err));
        // http.request("http://nodejs.org/images/logo.png", function (response) {
        //
        // });

        // axios({
        //   method: "post",
        //   url: "http://127.0.0.1:5000/uppp",
        //   data: formData,
        //   headers: { "Content-Type": "multipart/form-data" },
        // })
        //   .then(function (response) {
        //     //handle success
        //     console.log(response);
        //     res.json({ res: "Uploaded Succesfully" });
        //   })
        //   .catch(function (response) {
        //     //handle error
        //     console.log(response);
        //   });
        res.json({ res: "Uploaded Succesfully" });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
