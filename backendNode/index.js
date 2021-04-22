const express = require("express");
const port = process.env.PORT || 5000;
require("./config/db.js");
const Covid = require("./models/model");
const app = express();
const auth = require("./routes/auth");
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads`));

app.use(cors());

//using auth
app.use(auth);

app.use("/upload", require("./routes/upload"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Temp for database check
app.get("/store", async (req, res) => {
  const data = Covid({ name: "roshil" });
  await data.save();
});

// Temp for sms
const sendSms = require("./sms/sms");
app.get("/hello", async (req, res) => {
  const response = sendSms("Hello User", ["9429669754", "9265083859"]);
  res(response);
});
