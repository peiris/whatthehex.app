const app = require("express")();
const { v4 } = require("uuid");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hello@karapincha.io",
    pass: "bhwtkidouzspcjrn",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

app.post("/access", jsonParser, (req, res, next) => {
  const mail = {
    from: "WhatTheHex Feedback <whatthehex@karapincha.io>",
    to: "hello@karapincha.io",
    message: req.body.message,
    subject: "WhatTheHex Feedback - " + new Date(),
    text: req.body.message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
