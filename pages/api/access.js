import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hello@karapincha.io",
    pass: "bhwtkidouzspcjrn",
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "fail", message: "Method not allowed" });
  }

  const mail = {
    from: "WhatTheHex Feedback <whatthehex@karapincha.io>",
    to: "hello@karapincha.io",
    message: req.body.message,
    subject: "WhatTheHex Feedback - " + new Date(),
    text: req.body.message,
  };

  try {
    await transporter.sendMail(mail);
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "fail" });
  }
}
