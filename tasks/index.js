const alertAllUsers = require('./alertAllUsers');
const Initial_user_db = require('./init_users_db');
const reportChatStatistic= require('./reportChat');
const schedule = require('node-schedule');
const dailyDischarge = require('./dailyDischarge');
// const axios = require('axios');

const init_tasks = async () => {
    // таски для ежедневнего оповещения пользователей
    schedule.scheduleJob('30 9 * * 1-5', () => alertAllUsers()); 
    // таск для обновление информации о пользователях из slack
    schedule.scheduleJob('10 9 * * 1-5', () => Initial_user_db());
    // таск для сообщения отчета сбора статусов
    schedule.scheduleJob('30 10 * * 1-5', () => reportChatStatistic());
    // такс для сброса прогресса по опросам 
    schedule.scheduleJob('30 5 * * 1-5', () => dailyDischarge());
}

// const checkERP = async () => {
//     const url_auth = 'http://dev2.erp.dw.dev0.ddemo.ru/availabilityCalendar/rest/v1/auth';
//     const url_calendar = 'http://dev3.erp.dw.dev0.ddemo.ru/availabilityCalendar/rest/v1/?date=2020-01-14'
//     const data = { email:"a.volkov@digitalwand.ru", password:"bGYYLCwiP4bi1G" }
//     const auth_response = await axios.post(url_auth, data).then((response) => response)

//     if (auth_response.data.success){
//         const config = {
//             headers: {Authorization: "Bearer " + auth_response.data.token}
//         };
//         console.log(config)
//         // const data_calendar = {date: '2020-01-14', email:'a.abramenko@ddemo.ru'}
//         const response = await axios.get(url_calendar, config ).then((response) => response).catch(function (error) {
//             console.log(error);
//         });        
//         console.log(response)
//     }
// }
// checkERP()
module.exports = init_tasks