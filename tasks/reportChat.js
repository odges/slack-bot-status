const User = require('../models/User');
const request = require("request");
const moment = require('moment');

moment.locale('ru');

const statChatReport = async (participation) => {
    const usersToReport = await User.find({daily_report: true, subscribe: true})

    return await {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: 'GQWTPSTMM',
        blocks: JSON.stringify([
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Отчет о статусах* ${moment().format('MMMM Do YYYY, h:mm:ss a')} `
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Участие в опросе приняли:* ${participation}%`
                    },
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${usersToReport.length ? `Не оставили статус: ${usersToReport.map((user)=> `@${user.mention_name}`)}` : 'Все оставили отчет, так держать!' }`
                    },
                }
            ])
    }
}

const reportChatStatistic = async () => {
    const numberUsers = await User.count({on_vacation: false, subscribe: true})
    const reported  = await User.count({daily_report: false, subscribe: true})
    const participation = Math.floor((reported/numberUsers) * 100)
    const message = await statChatReport(participation);
    request.post(
        'https://slack.com/api/chat.postMessage', 
        {form: message}
    )
}
 
module.exports = reportChatStatistic;