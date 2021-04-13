const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const path = require("path");

set storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

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
  console.log("successful");
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } 
      
    }
  });
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
