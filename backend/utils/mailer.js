const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // your Gmail address
    pass: process.env.EMAIL_PASS,      // Gmail App Password (not regular password)
  },
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: `"Kinango Technical & Vocational College" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Admin Login OTP - Kinango TVC',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #760478; margin-bottom: 16px;">Admin Login Verification</h2>
        <p style="color: #374151; font-size: 14px;">You requested to log in to the <strong>Kinango TVC Admin Panel</strong>.</p>
        <p style="color: #374151; font-size: 14px;">Your One-Time Password (OTP) is:</p>
        <div style="background: #ecfdf5; border: 2px dashed #b224bf; padding: 16px; text-align: center; margin: 20px 0; border-radius: 6px;">
          <span style="font-size: 32px; font-weight: bold; color: #781587; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="color: #6b7280; font-size: 12px;">This OTP will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">If you did not request this login, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #9ca3af; font-size: 11px; text-align: center;">Kinango Technical & Vocational College</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendOTP };