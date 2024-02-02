require("dotenv").config();
const nodemailer = require("nodemailer");

const sendForgotOTPMail = async (user, otp) => {
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
    subject: "Forgot Password - Reset Your Password",
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

const sendWelcomeMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: data?.email,
    subject: `Welcome to Sphire – `,
    html: `
    <small style="color: #0f0f0f;">Hello <strong>${data?.first_name} ${data?.last_name}</strong>,</small>
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

const sendNotificationMail = async (emails) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_USER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: emails,
    subject: `Welcome to Sphire – `,
    html: `
    <small style="color: #0f0f0f;">Hello <strong>Hello</strong>,</small>
  `,
  };

  let status = true;
  transporter.sendMail(mailOptions, (error, info) => {
    // console.log(info, error);
    if (info) {
      status = true;
    }
    if (error) {
      status = false;
    }
  });
  return status;
};
const sendAddProfileMail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: data?.email,
    subject: `Welcome to Sphire`,
    html: `
    <div>
    <p>Here is your login credentials</p>
    <p>Email: ${data?.email}</p>
    <p>Email: ${data?.password}</p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};

module.exports = {
  sendForgotOTPMail,
  sendWelcomeMail,
  sendNotificationMail,
  sendAddProfileMail,
};
