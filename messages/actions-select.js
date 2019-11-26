require('dotenv').config();

// default message - edit to include actual ToS
const message = {
    token: process.env.SLACK_AUTH_TOKEN,
    link_names: true,
    text: 'Привет, выбери нужное действие',
    as_user: true,
    attachments: JSON.stringify([{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Доброе утро, время для ежедневного статуса."
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Выберете",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Пропустить",
                                "emoji": true
                            },
                            "value": "skip"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Тоже самое что вчера",
                                "emoji": true
                            },
                            "value": "same_last_time"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Оставить статус",
                                "emoji": true
                            },
                            "value": "give_status"
                        }
                    ]
                }
            }
        ]
    }])
};

module.exports = message;
