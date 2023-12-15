require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = async (user) => {
  return jwt.sign(
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      _id: user?._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7days",
    }
  );
};

const sendVerificationCode = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user?.email,
    subject: "Verify Your Email Address with OTP",
    html: `
    <button
    style="
      text-align:center; width: fit-content;min-width: 100px;    display: block;
      padding: 14px 44px 13px;
      line-height: 120%; margin: 30px auto; background-color: #037d41 ; color:#ffff; border:none;border-radius: 5px;">${otp}</button>
    `,
  };

  let status = true;
  transporter.sendMail(mailOptions, (error, info) => {
    if (info) {
      status = true;
    }
    if (error) {
      status = false;
    }
  });
  return status;
};

module.exports = {
  generateToken,
  sendVerificationCode,
};
