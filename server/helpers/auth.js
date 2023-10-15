const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (to, subject, msg) => {
  //   to = "hkjal1605@gmail.com";
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
      },
      (error, info) => {
        if (error) {
          // console.log(error);
          reject(error);
        } else {
          // console.log("Email sent: " + info.response);
          resolve(info.response);
        }
      }
    );
  });
};

const AddMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports = {
  sendEmail,
  AddMinutesToDate,
};
