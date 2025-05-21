const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing required fields: to, subject, text');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shailjdave72000@gmail.com',       // Replace with your email
        pass: 'tppa mnve vthv rylk'         // Replace with your password or app password
      }
    });

    const mailOptions = {
      from: 'shailjdave72000@gmail.com',         // Replace with your email
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    res.send({ message: 'Email sent', info });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});