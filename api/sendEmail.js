const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'mutangwe@outlook.com',
        subject: `Contact Form Submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong.');
    }
};
