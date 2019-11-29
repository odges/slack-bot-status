const User = require('../models/User');
const request = require("request");

const message = 
const reportChatStatistic = async () => {
    const users = await User.find({on_vacation: false})

    users.map(async (element) => {
        let data = await {
            form: {
                channel: element.slack_id,
                ...message,
            }
        };
    })
    request.post(
        'https://slack.com/api/chat.postMessage', 
        {form: messageRedirect},
        (error, response, body) => res.json()
    )
}

module.exports = reportChatStatistic;