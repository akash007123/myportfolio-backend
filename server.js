const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Confirmation email to the user
    const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Contacting Us!',
        html: `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: #007bff; padding: 20px; text-align: center;">
              <img src="https://sosapient.in/logo/Dlogo.png" alt="Your Company Logo" style="max-width: 120px;">
              <h2 style="color: #ffffff; margin-top: 10px;">Thank You for Contacting Us!</h2>
            </div>
      
            <!-- Body -->
            <div style="padding: 20px; color: #333;">
              <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">We appreciate you reaching out to us. Our team has received your message and will get back to you shortly.</p>
              <p style="font-size: 16px;">If your inquiry is urgent, please feel free to contact us directly using the details below.</p>
      
              <div style="text-align: center; margin: 20px 0;">
                <a href="mailto:support@yourdomain.com" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Contact Support</a>
              </div>
            </div>
      
            <!-- Footer -->
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 14px; color: #555;">
              <p><strong>Your Company Name</strong></p>
              <p>Email: <a href="mailto:support@yourdomain.com" style="color: #007bff;">support@yourdomain.com</a> | Phone: +91-9685533878</p>
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
            
          </div>
        `,
      };
      
      

    // Admin notification email
    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: #dc3545; padding: 20px; text-align: center;">
              <img src="https://sosapient.in/logo/Dlogo.png" alt="Your Company Logo" style="max-width: 120px;">
              <h2 style="color: #ffffff; margin-top: 10px;">New Contact Form Submission</h2>
            </div>
      
            <!-- Body -->
            <div style="padding: 20px; color: #333;">
              <p style="font-size: 16px;">A new message has been submitted through the contact form:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Mobile:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${mobile}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
                </tr>
              </table>
      
              <div style="text-align: center; margin: 20px 0;">
                <a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Reply to ${name}</a>
              </div>
            </div>
      
            <!-- Footer -->
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 14px; color: #555;">
              <p><strong>Your Company Name</strong></p>
              <p>Email: <a href="mailto:support@yourdomain.com" style="color: #dc3545;">support@yourdomain.com</a> | Phone: +91-9685533878</p>
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
            
          </div>
        `,
      };
      
      

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
