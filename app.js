// Imports
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Initiates Nexmo
const nexmo = new Nexmo({

    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,

}, {debug: true});

// Initiates Express
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {

    res.render('index');

});

// Catch form submit
app.post('/', (req, res) => {

    // res.send(req.body);

    // console.log(req.body);

    // The phone number to be posted
    const number = req.body.number;
    // The text message to be posted
    const text = req.body.text;

    // Sends a SMS text message via nexmo
    nexmo.message.sendSms(

        // The API test number the message is sent from
        '18885307047', number, text, { type: 'unicode' },
        (err, responseData) => {

            // If error inform console with error
            if(err) {

                console.log(err);

            }

            // Else give response
            else {

                console.dir(responseData);

            }

        }

    );

});

// Define Port
const port = 3000;

// Start Server
const server = app.listen(port, () => console.log(`Server started on port ${ port }`),);