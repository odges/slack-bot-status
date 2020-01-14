const axios = require('axios');
const moment = require('moment');
const { User } = require('../models')

const checkERP = async () => {
    const url_auth = 'https://inside.digitalwand.ru/availabilityCalendar/rest/v1/auth';
    // const url_calendar = `https://inside.digitalwand.ru/availabilityCalendar/rest/v1/?date=${moment().format('YYYY-MM-DD')}`
    // a.martinov@ddemo.ru p.seligor@ddemo.ru
    const url_calendar = `https://inside.digitalwand.ru/availabilityCalendar/rest/v1/?date=2020-01-9&email=p.seligor@ddemo.ru`
    const data = { email:"a.volkov@digitalwand.ru", password:"bGYYLCwiP4bi1G" }
    const auth_response = await axios.post(url_auth, data).then((response) => response)

    if (auth_response.data.success){
        const config = {
            headers: {Authorization: "Bearer " + auth_response.data.token}
        };

        const response = await axios.get(url_calendar, config ).then((response) => response).catch(function (error) {
            console.log(error);
        });        
        for (i=0; i < response.data.length; i++){
            const { email, event_type, event_end } = response.data[i]
            const date_comeback = moment(event_end).valueOf()
            let status = 'work'
            switch (event_type) {
                case 'holiday':
                    status = "vacation"
                    break;
                case 'hospital':
                    status = "sick"
                    break;
                case 'offtime':
                    status = "skip"
                    break
            }

            await User.updateOne({email: email }, {date_comeback, status })
        }
    }
}

module.exports = checkERP