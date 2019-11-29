const User = require('../models/User');
const message = require('../messages/actions-select');
const request = require("request");

const alertAllUsers = async () => {
    User.update({}, { daily_report: false })
    const users = await User.find({})
    users.map(async (element) => {
        console.log(element)
    //   let data = await {
    //     form: {
    //         channel: element.slack_id,
    //         ...message,
    //     }
    //   };
    //   request.post('https://slack.com/api/chat.postMessage', data);
    })
}

module.exports = alertAllUsers;