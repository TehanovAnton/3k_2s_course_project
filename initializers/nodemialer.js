require('dotenv').config()

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
}, {
  from:process.env.MAILER_USERNAME,
})

module.exports = transporter
