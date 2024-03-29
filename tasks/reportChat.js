const { User } = require('../models')
const request = require("request");
const moment = require('moment');

moment.locale('ru');

const statChatReport = async (participation) => {
    const usersToReport = await User.find({daily_report: true, subscribe: true, status: 'work'})
    const usersVacation = await User.find({status : "vacation"})
    const sick = await User.find({status : "sick"})
    const skip = await User.find({status : "skip"})

    return await {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: 'GPGM1J28G',
        text: `*Отчет о статусах* ${moment().format('MMMM Do YYYY, h:mm:ss a')} `,
        attachments: JSON.stringify([
                {
                    "color": "#ff4d4d",
                    "text": `*Участие в опросе приняли:* ${participation}%`,
                },
                {
                    "color": "#6699ff",
                    "text": `${usersToReport.length ? `*Не оставили статус*: ${usersToReport.map((user)=> ` <@${user.mention_name}> `)} ` : 'Все оставили отчет, так держать!' }`
                },
                {   
                    "color": "#00e6e6",
                    "text": `${usersVacation.length ? `*В отпуске*: ${usersVacation.map((user)=> ` <@${user.mention_name}> `+ ` (${moment(user.date_comeback).format('MMMM Do')}) `)}` : '' }`
                },
                {
                    "color": "#80ffe5",
                    "text": `${sick.length ? `Больничный: ${sick.map((user)=> ` <@${user.mention_name}> `+ ` (${moment(user.date_comeback).format('MMMM Do')}) `)}` : '' }`
                },
                {
                    "color": "#00e6e6",
                    "text": `${skip.length ? `Отгул: ${skip.map((user)=> ` <@${user.mention_name}> `+ ` (${moment(user.date_comeback).format('MMMM Do')}) `)}` : '' }`
                },
            ])
    }
}

const reportChatStatistic = async () => {
    const numberUsers = await User.count({ status: 'work', subscribe: true})
    const reported  = await User.count({daily_report: false, subscribe: true, on_vacation: false})
    const participation = Math.floor((reported/numberUsers) * 100)
    const message = await statChatReport(participation);
    request.post(
        'https://slack.com/api/chat.postMessage', 
        {form: message} 
    )
}
 
module.exports = reportChatStatistic;