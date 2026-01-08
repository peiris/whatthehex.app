import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "hello@karapincha.io",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const mail = {
      from: "WhatTheHex Feedback <whatthehex@karapincha.io>",
      to: "hello@karapincha.io",
      subject: "WhatTheHex Feedback - " + new Date().toISOString(),
      text: message,
    };

    await transporter.sendMail(mail);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error sending feedback:", error);
    return NextResponse.json({ status: "fail" }, { status: 500 });
  }
}
