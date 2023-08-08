var userRoute = (require('./routes/user'));
var loginRoute = (require('./routes/login'));
var oauthcallbackRoute = (require('./routes/oauth-callback'));
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');
const PORT = process.env.PORT || 3001;


// configure Express app and install the JSON middleware for parsing JSON bodies
const app = express();
app.use(express.json());

app.use(
    session({
        secret: 'gdyeif',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto', maxAge: 3600000 }, // Set cookie options (1 hour expiry in this example)
    }),
);

app.use(cors({
    origin: true,
    credentials: true
}));

// use routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/oauth-callback', oauthcallbackRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});



// start server
app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));
