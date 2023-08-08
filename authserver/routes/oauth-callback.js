const express = require('express');
const router = express.Router();
const config = require('../config');
const request = require('request');


router.get('/', (req, res) => {
    request(
        // POST request to /token endpoint
        {
            method: 'POST',
            uri: `http://${config.fusionHost}:${config.fusionAuthPort}/oauth2/token`,
            form: {
                'client_id': config.clientID,
                'client_secret': config.clientSecret,
                'code': req.query.code,
                'grant_type': 'authorization_code',
                'redirect_uri': config.redirectURI
            }
        },

        // callback lambda
        (error, response, body) => {
            // save token to session
            req.session.token = JSON.parse(body).access_token;

            // redirect to the React app
            res.redirect(`http://4.158.32.9/material-cra`);
        }
    );
});

module.exports = router;
