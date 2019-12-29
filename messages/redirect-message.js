require('dotenv').config();
const { Question, User } = require('../models')

const redirectMessage = async (channel, answers, user) => {
    const que = await Question.find({});
    const colors = ['#5ca2a5', '#3e8083', '#b02f30', '#466796', '#305283']
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
        channel: 'GPGM1J28G',
        text: 'Пользователь оставил статус',
        icon_url: userObj.link_ava,
        username: userObj.name,
        attachments: JSON.stringify(
            text.map( (el, counter) => { return { "color": colors[counter], ...el } } )
        )
    };
}
module.exports = redirectMessage;
