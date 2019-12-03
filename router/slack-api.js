const { Router } = require('express');
const message = require('../messages/actions-select');
const modalQuestions = require('../messages/modal-slack');
const slackRoutes = Router()
const request = require("request");
const User = require('../models/User');
const redirectMessage = require('../messages/redirect-message');
const Answers = require('../models/Answer');
const Status = require('../models/Status');
const datepicker_slack = require('../messages/datepicker-slack');

slackRoutes.post('/slack/actions', (req, res) => {
    // обработчик команд /dailystatus 
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
    // обработчик событий в слаке 
    // https://api.slack.com/events
    const { event } = req.body;
    switch(event.type){
        case 'member_joined_channel':
            if (!User.exists({slack_id: event.user})){
                const user = new User({
                    slack_id: event.user
                });
                await user.save();
            }
    }
    res.json()
});

slackRoutes.post('/slack/interactive', async (req, res) => {
    // обработчик интерактивных сообщений с пользователем 
    const { type, user } = JSON.parse(req.body.payload);
    switch (type){
        case 'view_submission':
            // данные из диалогового окна
            const { view } = JSON.parse(req.body.payload)
            switch (view.callback_id){
                case 'date_picker_user':
                    const { private_metadata } = view
                    let picked_date
                    for (let [_, value] of Object.entries(view.state.values)){
                        picked_date = new Date(Object.values(value)[0].selected_date)
                    }
                    await User.updateOne({ slack_id: user.id }, {status: private_metadata, date_comeback:picked_date})
                    break
                default:
                    const db_user = await User.find({slack_id: user.id})
        
                    // обновление пользователя, что он оставил ежедневный отчет
                    await User.updateOne({slack_id: user.id}, { daily_report: false });
        
                    const status = new Status({
                        user: db_user[0]._id
                    })
                    const answers = new Array;
                    for (let [_, value] of Object.entries(view.state.values)){
                        let id = Object.keys(value)[0];
                        let obj = Object.values(value)[0];
                        answers.push({text: obj.value, question: id})
                    }
                    
                    const answer = await Answers.create(answers)
                    const idsAnswer = answer.map((element) => element._id)
        
                    status.answers.push(...idsAnswer)
                    await status.save()
        
                    messageRedirect = await redirectMessage('GQWTPSTMM', answers, user)
                    request.post(
                        'https://slack.com/api/chat.postMessage', 
                        {form: messageRedirect},
                        (error, response, body) => res.json()
                    )
            }

            break
        case 'block_actions':
            const { message, channel } = JSON.parse(req.body.payload);
            request.post(
                'https://slack.com/api/chat.delete',
                {
                    form: {		
                        token: process.env.SLACK_AUTH_TOKEN,
                        channel: channel.id,
                        ts: message.ts,
                        as_user: true
                    } 
                },
                (error, response, body) => res.json()
            )

            const { trigger_id } = JSON.parse(req.body.payload);
            const actions = JSON.parse(req.body.payload).actions[0]
            switch (actions.selected_option.value){
                case 'same_last_time':
                    const current_user = await User.find({slack_id: user.id})
                    const lastStatus = await Status.find({user: current_user[0]._id}).sort({"date": -1}).limit(1)
                    const answers = await Answers.find({'_id': { $in: lastStatus[0].answers}})
                    const Modal_with_init = await modalQuestions(answers);
                    request.post(
                        'https://slack.com/api/views.open', 
                        { form: { trigger_id, ...Modal_with_init } }, 
                        (error, response, body) => res.json()
                    );
                    break
                case 'give_status':
                    const Modal = await modalQuestions();
                    request.post(
                        'https://slack.com/api/views.open', 
                        { form: { trigger_id, ...Modal } }, 
                        (error, response, body) => res.json()
                    );
                    break
                case 'skip':
                case 'vacation':
                case 'sick':
                    datepicker = datepicker_slack(actions.selected_option.value)
                    const datepicker_modal = { form: { trigger_id, ...datepicker } }
                    request.post(
                        'https://slack.com/api/views.open',
                        datepicker_modal,
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