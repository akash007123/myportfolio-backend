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
        subject: '🎉 Thank You for Contacting Us! 🎉',
        html: `
          <div style="max-width: 600px; margin: auto; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #007bff, #0056b3); border-radius: 10px; overflow: hidden; color: #fff; padding: 20px; text-align: center;">
            
            <!-- Header -->
            <div style="padding: 20px; animation: fadeInDown 1s ease-in-out;">
              <img src="https://sosapient.in/logo/Dlogo.png" alt="Company Logo" style="max-width: 100px; border-radius: 50%;">
              <h2 style="margin-top: 10px; font-size: 24px;">Thank You for Contacting Us! 🎊</h2>
            </div>
      
            <!-- Body -->
            <div style="background: #fff; color: #333; padding: 20px; border-radius: 10px; animation: fadeInUp 1s ease-in-out;">
              <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
              <p>We appreciate your message and our team will get back to you shortly.</p>
              <p>If your inquiry is urgent, please reach out to us directly using the options below.</p>
      
              <div style="margin: 20px 0;">
                <a href="mailto:akashraikwar763@gmail.com" style="display: inline-block; padding: 12px 24px; background: #007bff; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; transition: all 0.3s ease-in-out;">📧 Email Support</a>
                <a href="https://akashraikwar.netlify.app/" style="display: inline-block; padding: 12px 24px; background: #28a745; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; margin-left: 10px; transition: all 0.3s ease-in-out;">🌍 Visit Website</a>
              </div>
            </div>
      
            <!-- Footer -->
            <div style="padding: 15px; font-size: 14px; animation: fadeIn 1.5s ease-in-out;">
              <p><strong>Akash Raikwar</strong></p>
              <p>Email: <a href="mailto:akashraikwar763@gmail.com" style="color: #fff;">akashraikwar763@gmail.com</a> | Phone: +91-9685533878</p>
              <p>&copy; 2024 Akash Raikwar. All rights reserved.</p>
            </div>
          </div>
    
          <style>
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          </style>
        `,
    };
    
      
      
      // Admin notification email
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: '🚀 New Contact Form Submission Received!',
        html: `
          <div style="max-width: 600px; margin: auto; font-family: 'Arial', sans-serif; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); animation: fadeIn 1.2s ease-in-out;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #dc3545, #ff6b81); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">📩 New Contact Form Submission</h2>
            </div>
    
            <!-- Body -->
            <div style="padding: 20px; color: #333;">
              <p style="font-size: 16px;">You have received a new inquiry from the website contact form:</p>
    
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${mobile}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${message}</td>
                </tr>
              </table>
    
              <div style="text-align: center; margin-top: 25px;">
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 25px; background-color: #dc3545; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background 0.3s;">
                  ✉️ Reply to ${name}
                </a>
              </div>
            </div>
    
            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 14px; color: #555; border-radius: 0 0 10px 10px;">
              <p><strong>Akash Raikwar</strong></p>
              <p>Email: <a href="mailto:akashraikwar763@gmail.com" style="color: #dc3545; text-decoration: none;">akashraikwar763@gmail.com</a> | Phone: <a href="tel:+919685533878" style="color: #dc3545; text-decoration: none;">+91-9685533878</a></p>
              <p>🌐 <a href="https://akashraikwar.netlify.app/" style="color: #dc3545; text-decoration: none;">Visit Website</a></p>
              <p style="margin-top: 10px;">&copy; 2024 Akash Raikwar. All rights reserved.</p>
            </div>
    
          </div>
    
          <style>
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          </style>
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
