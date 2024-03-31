const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

//Create a middleware
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json())

// Creating my routes
router.get('',(req, res)=>{
    res.render('index')
});

//Project page router
router.get('/project', (req, res) => {
    res.render('project');
});

//About us page router
router.get('/about', (req, res) => {
    res.render('about')
});

// Handle the form submission
router.post('/send-mail', (req, res) => {
    const message = "Your Request has been submitted successfully"
    // Destructure the necessary fields from the request body
    const { subject } = req.body;
   
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crawlerd01@gmail.com',
            pass: 'riusjoe_iakobzhdobxtos_'
        }
    });

    // Define mail options
    const mailOptions = {
        from: req.body.email, // Use the email provided in the form as the sender
        to: 'internetreg123@gmail.com', // Define the recipient's email address
        subject,
        text: req.body.message
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error); // Log any error that occurs
            res.status(500).json({ error: 'Failed to send email' }); // Send error response
        } else {
            res.redirect('/contact?success=true')
            // console.log('Email sent:', info.response); // Log confirmation message
            // res.status(200).json({ message: 'Email sent successfully' }); // Send success response
        }
    });
});

// Contact page router
router.get('/contact', (req, res) => {
    const message = req.query.success;
    res.render('contact', {message})
})




// Handle the form submission
// router.post('/send-mail', (req, res) => {
//     const firstname = req.body.f_name;
//     const lname = req.body.l_name;
//     const email = req.body.email;
//     const subject = req.body.subject;
//     const message = req.body.message;

//     console.log(`First Name: ${firstname}\nLast Name: ${lname}\nEmail Address: ${email}\nSubject: ${subject}\nMessage: ${message}`);
//     res.json({ message: 'Message sent successfully' });
// });
module.exports = router;