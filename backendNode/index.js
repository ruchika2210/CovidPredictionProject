const express = require("express");
const port = process.env.PORT || 3000;
require("./config/db.js");
const Covid = require("./models/model");
const app = express();
const auth=require('./routes/auth')
app.use(express.static(`${__dirname}/uploads`));

//using auth
app.use(auth)

app.use("/upload", require("./routes/upload"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/store", async (req, res) => {
  const data = Covid({ name: "roshil" });
  await data.save();
});
