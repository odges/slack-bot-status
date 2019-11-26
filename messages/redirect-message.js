require('dotenv').config();
const User = require('../models/User');

// default message - edit to include actual ToS
const redirectMessage = async (channel, answers, user) => {
    const problems = answers.problems_block.problems.value;
    const tasks = answers.tasks_block.tasks.value;
    const today = answers.today_block.today.value;
    const yesterday = answers.yesterday_block.yesterday.value;
    console.log(user)
    const userObj = await User.find({ slack_id: user.id})
    console.log(userObj[0].name)
    return {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: channel,
        text: ' ',
        username: userObj[0].name,
        blocks: JSON.stringify([
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Пользователь оставил статус"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Что делали вчера:*\n " + yesterday + "\n*Что планируете делать сегодня:*\n"+ today + "\n*Есть проблема с текущими задачами?:*\n "+ problems +"\n*Хватает задач на неделю?*\n" + tasks
                    },
                }
            ])
    };
}
module.exports = redirectMessage;
