require('dotenv').config();
const { Question, User } = require('../models')

const redirectMessage = async (channel, answers, user) => {
    const que = await Question.find({});
    const colors = ['#ff4d4d', '#6699ff', '#00e6e6', '#80ffe5']
    let text = [];
    for (obj of answers){
        if (obj.text){
            let question = que.filter((element) => element.id === obj.question)
            text.push({title: question[0].text, text: obj.text})
        }
    }
    const userObj = await User.findOne({ slack_id: user.id})
    return {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: 'GQWTPSTMM',
        text: 'Пользователь оставил статус',
        icon_url: userObj.link_ava,
        username: userObj.name,
        attachments: JSON.stringify(
            text.map( (el, counter) => { return { "color": colors[counter], ...el } } )
        )
    };
}
module.exports = redirectMessage;
