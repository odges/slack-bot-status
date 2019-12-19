require('dotenv').config();
const request = require("request");
const User = require('../models/User');

const Initial_user_db = async () => {
    const data = {
        form: {
            token: process.env.SLACK_AUTH_TOKEN,
        }
    };
    request.post('https://slack.com/api/users.list', data, async function (error, response, body) {
        const { members } = JSON.parse(response.body);
        members.map(async (element)=>{
            let { is_bot, deleted } = element;
            let exist = await User.exists({slack_id: element.id});
            if ( (!is_bot) && (!exist) && (!deleted) && (element.id !== 'USLACKBOT') ){
                let user = new User({
                    slack_id: element.id,
                    name: element.real_name,
                    mention_name: element.name,
                })
                await user.save();
            }
        });
    });
}

module.exports = Initial_user_db;