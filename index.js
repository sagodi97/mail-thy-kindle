const express = require("express");
const app = express();
const fs = require("fs");
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

const pathToConde = `${__dirname}/books/conde.mobi`;
const conde = fs.readFileSync(pathToConde).toString("base64");

const pathToAnalista = `${__dirname}/books/analista.mobi`;
const analista = fs.readFileSync(pathToAnalista).toString("base64");

const pathToMichell = `${__dirname}/books/michell.mobi`;
const michell = fs.readFileSync(pathToMichell).toString("base64");

const pathToStories = `${__dirname}/books/stories.mobi`;
const stories = fs.readFileSync(pathToStories).toString("base64");

const emailText = Buffer.from(process.env.MSG, "base64").toString("utf8");

let message = {
  from: "santiago@memlernado.com",
  to: "",
  cc: process.env.KASIA_EMAIL,
  bcc: process.env.BCC,
  subject: "Books books books!",
  text: emailText,
  attachments: [
    {
      content: conde,
      filename: "El Conde de Montecristo - Alexandre Dumas.mobi",
      disposition: "attachment",
      encoding: "base64",
    },
    {
      content: analista,
      filename: "El Psicoanalista - John Katzenbach.mobi",
      disposition: "attachment",
      encoding: "base64",
    },
    {
      content: michell,
      filename: "Mi historia - Michelle Obama.mobi",
      disposition: "attachment",
      encoding: "base64",
    },
    {
      content: stories,
      filename:
        "Spanish Short Stories For Intermediate Learners_Olly Richards.mobi",
      disposition: "attachment",
      encoding: "base64",
    },
  ],
};

app.get("/", (req, res) => {
  message.to = req.query.email;
  transport
    .sendMail(message)
    .then(() => res.send("OK"))
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

app.listen(port, () => {
  console.log(`Probando, un dos, tres, we live yet?`);
});
