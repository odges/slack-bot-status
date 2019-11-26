const { Router } = require('express');
const message = require('../messages/actions-select');
const Modal = require('../messages/modal-slack');
const router = Router()
const request = require("request");
const User = require('../models/User');
const redirectMessage = require('../messages/redirect-message');

router.post('/', (req, res) => {  
    const data = {
        form: {
            channel: req.body.user_id,
            ...message,
        }
    };
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        res.json();
    });
});

router.post('/slack/events', async (req, res) => {
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

router.post('/interactive', async (req, res) => {
    // интерактивные элементы диалога
    const { type } = JSON.parse(req.body.payload);
    console.log(type)
    switch (type){
        case 'view_submission':
            // данные из диалогового окна
            const { view, user } = JSON.parse(req.body.payload)
            console.log(JSON.parse(req.body.payload))
            console.log(view.state.values)
            messageRedirect = await redirectMessage('CQXN7117X', view.state.values, user)
            request.post('https://slack.com/api/chat.postMessage', {form: messageRedirect}, function (error, response, body) {
                console.log(response.body)
                res.json();
            })
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
                    request.post('https://slack.com/api/views.open', { form: { trigger_id, ...Modal } }, function (error, response, body) {
                        res.json();
                    });
                    break
                default:
                    break
            }
        default:
            break
    }
})

module.exports = router;