const nodemailer = require('nodemailer')

sendEmail = async (msg) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sanjanadholariya926@gmail.com',
        pass: "mtblartxjuobkvnn",
      },
    });

    return await transporter.sendMail(msg);
  } catch (error) {
    console.log(error);
  }
}


module.exports = sendEmail;