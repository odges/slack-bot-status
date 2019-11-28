require('dotenv').config();
const User = require('../models/User');
const Question = require('../models/Question');

const redirectMessage = async (channel, quesitonAnswer, user) => {
    const que = await Question.find({});
    let text = '';

    for (obj of quesitonAnswer){
        let question = que.filter((element) => element.id === obj.question)
        text += "* " + question[0].text + ":*\n " + obj.answer + "\n"
    }

    const userObj = await User.find({ slack_id: user.id})

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
                        "text": text
                    },
                }
            ])
    };
}
module.exports = redirectMessage;
