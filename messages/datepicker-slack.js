require('dotenv').config();
const moment = require('moment');

moment.locale('ru');

const datepicker = {
    token: process.env.SLACK_AUTH_TOKEN,
    view: JSON.stringify({
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "slack bot daily status",
            "emoji": true
        },
        "submit": {
            "type": "plain_text",
            "text": "Принять",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "Отмена",
            "emoji": true
        },
        "blocks": [
            {
                "type": "input",
                "element": {
                    "type": "datepicker",
                    "initial_date": moment().format("YYYY-MM-DD"),
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a date",
                        "emoji": true
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "Выбери дату выхода",
                    "emoji": true
                }
            }
        ]
    })
}

module.exports = datepicker;