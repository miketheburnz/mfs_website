const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: 'mutangwe@outlook.com', // your Outlook email
            pass: 'yourpassword' // your Outlook email password
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Nodemailer Contact" <mutangwe@outlook.com>', // sender address
        to: 'mutangwe@outlook.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        html: output // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/contact.html?message=sent');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
