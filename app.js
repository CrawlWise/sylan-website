require('dotenv').config();
const express = require('express'); // import my express server
const app = express() // initial my express server.
const expressLayout = require('express-ejs-layouts'); //importing my express-ejs-layout
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// import my port
const PORT = 5000 || process.env.PORT;

// Create my Express ejs Layout Template
app.use(expressLayout) // using my default layout
app.set('layout', './layouts/main'); //setting my default layout to use for my developement. 

//setting my view engine
app.set('view engine', 'ejs');

//setting my public folder for js, css, img
app.use(express.static('public'))


//Creating a route to access our main index page
app.use('/', require('./server/routes/main'))

//Create a middleware
app.use(bodyParser.urlencoded({ extended: true}));

// Create my server listener
app.listen(PORT, ()=>{
    console.log(`App Listening on port ${PORT}`)
})