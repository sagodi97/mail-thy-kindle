const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = 4000 | process.env.PORT;

app.use(cors());

let transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSW,
  },
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(
    "Santiago's book to kindle last minute add-on to Christmas gift is live!"
  );
});
