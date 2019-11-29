const { Router } = require('express');
const message = require('../messages/actions-select');
const modalQuestions = require('../messages/modal-slack');
const slackRoutes = Router()
const request = require("request");
const User = require('../models/User');
const redirectMessage = require('../messages/redirect-message');
const Answers = require('../models/Answer');
const Status = require('../models/Status');

slackRoutes.post('/slack/actions', (req, res) => {  
    const data = {
        form: {
            channel: req.body.user_id,
            ...message,
        }
    };
    request.post(
        'https://slack.com/api/chat.postMessage',
        data,
        (error, response, body) => res.json()
    );
});

slackRoutes.post('/slack/events', async (req, res) => {
    // const { event } = req.body;
    // switch(event.type){
    //     case 'member_joined_channel':
    //         if (!User.exists({slack_id: event.user})){
    //             const user = new User({
    //                 slack_id: event.user
    //             });
    //             await user.save();
    //         }
    // }
    res.json(req.body)
});

slackRoutes.post('/slack/interactive', async (req, res) => {
    // интерактивные элементы диалога
    const { type } = JSON.parse(req.body.payload);

    switch (type){
        case 'view_submission':
            // данные из диалогового окна
            const { view, user } = JSON.parse(req.body.payload)
            const db_user = await User.find({slack_id: user.id})
            const status = new Status({
                user: db_user[0]._id
            })
            const quesitonAnswer = new Array;
            const answers = new Array;
            for (let [key, value] of Object.entries(view.state.values)){
                let id = Object.keys(value)[0];
                let obj = Object.values(value)[0];
                quesitonAnswer.push({answer: obj.value, question: id})
                let answer = new Answers({text: obj.value, question: id})
                await answer.save()
                answers.push(answer.id)
                
            }
            status.answers.push(...answers)
            await status.save()

            messageRedirect = await redirectMessage('GQV78N4TA', quesitonAnswer, user)
            request.post(
                'https://slack.com/api/chat.postMessage', 
                {form: messageRedirect},
                (error, response, body) => res.json()
            )
            break
        case 'block_actions':
            const actions = JSON.parse(req.body.payload).actions[0]
            switch (actions.selected_option.value) {
                case 'same_last_time':
                    break
                case 'skip':
                    break
                case 'give_status':
                    const { trigger_id } = JSON.parse(req.body.payload);
                    const Modal = await modalQuestions();
                    request.post(
                        'https://slack.com/api/views.open', 
                        { form: { trigger_id, ...Modal } }, 
                        (error, response, body) => res.json()
                    );
                    break
                default:
                    break
            }
        default:
            break
    }
    res.json()
})

module.exports = slackRoutes;