require("dotenv").config({ path: "./.env" });
const nodemailer = require("nodemailer");

async function test() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Test User" <test@yahoo.com>',
      replyTo: "test@yahoo.com",
      to: "hello@61cstudios.com",
      subject: "Test New Form Submission",
      text: "Test email from test@yahoo.com",
    });
    console.log("Success:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
