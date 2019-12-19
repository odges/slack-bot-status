const { User } = require('../models')
const message = require('../messages/actions-select');
const request = require("request");

const alertAllUsers = async () => {
    await User.updateMany({}, { daily_report: true })
    const users = await User.find({ subscribe: true })

    users.map(async (element) => {

      let data = await {
        form: {
            channel: element.slack_id,
            ...message,
        }
      };
      request.post('https://slack.com/api/chat.postMessage', data);
    })
}

module.exports = alertAllUsers;