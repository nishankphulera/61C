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
      from: "hello@61cstudios.com", // use the actual account
      to: "hello@61cstudios.com",
      subject: "Test",
      text: "Test email",
    });
    console.log("Success:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
