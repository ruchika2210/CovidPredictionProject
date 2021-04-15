const express = require("express");
const port = process.env.PORT || 3000;
require("./config/db.js");
const Covid = require("./models/model");
const app = express();
app.use(express.static(`${__dirname}/uploads`));

app.use("/upload", require("./routes/upload"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/store", async (req, res) => {
  const data = Covid({ name: "roshil" });
  await data.save();
});
