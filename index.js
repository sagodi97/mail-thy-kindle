const express = require("express");
const app = express();
const cors = require("cors");

const port = 4000 | process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(
    "Santiago's book to kindle last minute add-on to Christmas gift is live!"
  );
});
