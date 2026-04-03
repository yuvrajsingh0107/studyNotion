const nodemailer = require('nodemailer');
const clgDev = require('./clgDev');

const emailSender = async (toEmail, subject, body) => {
  try {
    const host = process.env.MAIL_HOST;
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    if (!host || !user || !pass) {
      const msg =
        'Missing MAIL_HOST, MAIL_USER, or MAIL_PASS (set them in Render Environment, not only in local config.env)';
      console.error('[emailSender]', msg);
      throw new Error(msg);
    }

    const port = parseInt(process.env.MAIL_PORT || '587', 10);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // // For testing / development purpose
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    // send mail
    const info = await transporter.sendMail({
      from: `${process.env.FROM_NAME} | sunny8080 <${process.env.FROM_EMAIL}>`,
      to: toEmail,
      subject: subject,
      html: body,
    });

    return info;
  } catch (err) {
    clgDev(err.message);
    console.error('[emailSender] SMTP failed:', err.message);
    throw err;
  }
};

module.exports = emailSender;
