const express = require("express");
const port = process.env.PORT || 5000;
require("./config/db.js");
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
