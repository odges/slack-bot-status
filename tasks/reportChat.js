const User = require('../models/User');
const request = require("request");
const moment = require('moment');

moment.locale('ru');

const statChatReport = async (participation) => {
    const usersToReport = await User.find({daily_report: true, subscribe: true, on_vacation: false})
    const usersVacation = await User.find({on_vacation: true})
    return await {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: 'GQV78N4TA',
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
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${usersVacation.length ? `В отпуске: ${usersVacation.map((user)=> `@${user.mention_name}`)}` : '' }`
                    },
                }
            ])
    }
}

const reportChatStatistic = async () => {
    const numberUsers = await User.count({on_vacation: false, subscribe: true})
    const reported  = await User.count({daily_report: false, subscribe: true, on_vacation: false})
    const participation = Math.floor((reported/numberUsers) * 100)
    const message = await statChatReport(participation);
    request.post(
        'https://slack.com/api/chat.postMessage', 
        {form: message}
    )
}
 
module.exports = reportChatStatistic;