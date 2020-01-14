const alertAllUsers = require('./alertAllUsers');
const Initial_user_db = require('./init_users_db');
const reportChatStatistic= require('./reportChat');
const schedule = require('node-schedule');
const dailyDischarge = require('./dailyDischarge');
const checkERP = require('./ERPApiUsers')

const init_tasks = async () => {
    // таски для ежедневнего оповещения пользователей
    schedule.scheduleJob('30 9 * * 1-5', () => alertAllUsers()); 
    // таск для обновление информации о пользователях из slack
    schedule.scheduleJob('10 9 * * 1-5', () => Initial_user_db());
    // таск для сообщения отчета сбора статусов
    schedule.scheduleJob('30 10 * * 1-5', () => reportChatStatistic());
    // такс для сброса прогресса по опросам 
    schedule.scheduleJob('30 5 * * 1-5', () => dailyDischarge());
    // Initial_user_db()
    checkERP()
}

module.exports = init_tasks