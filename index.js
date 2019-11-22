require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

// default message - edit to include actual ToS
const message = {
    token: process.env.SLACK_AUTH_TOKEN,
    link_names: true,
    text: 'Welcome to the team! We\'re glad you\'re here.',
    as_user: true,
    attachments: JSON.stringify([
      "trigger_id": "156772938.1827394",
      "view": {
        "type": "modal",
        "callback_id": "modal-identifier",
        "title": {
          "type": "plain_text",
          "text": "Just a modal"
        },
        "blocks": [
          {
            "type": "section",
            "block_id": "section-identifier",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome* to ~my~ Block Kit _modal_!"
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Just a button",
              },
              "action_id": "button-identifier",
            }
          }
        ],
      }
    ]
    ),
};

  
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const data = {
        form: {
            token: process.env.SLACK_AUTH_TOKEN,
            channel: "#random",
            text: "Hi! :wave: \n I'm your new bot."
        }
    };
    console.log(req.body)
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        res.json();
    });
});

app.post('/slack/events', (req, res) => {
    console.log(req.body)
    const { event } = req.body;
    const data = {
        form: {
            channel: event.channel,
            ...message,
        }
    };
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        res.json();
    });
});