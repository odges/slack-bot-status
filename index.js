require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const slackRoutes = require('./router/slack-api');
const Initial_user_db = require('./tasks/init_users_db');
const schedule = require('node-schedule');
const alertAllUsers = require('./tasks/dailyAlerts');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./router/routes');
const reportChatStatistic = require('./tasks/reportChat')
reportChatStatistic()
const app = express();
const PORT = 8084;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))

// таски для ежедневнего оповещения пользователей
schedule.scheduleJob('30 15 * * 1-5', () => alertAllUsers()); 
// таск для обновление информации о пользователях из slack
schedule.scheduleJob('10 9 * * 1-5', () => Initial_user_db());
// таск для сообщения отчета сбора статусов
schedule.scheduleJob('45 15 * * 1-5', () => reportChatStatistic());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

// api для взаимодействия с slack
app.use(slackRoutes)
// админка
app.use(router)

async function start() {
    try {
      await mongoose.connect(
        'mongodb+srv://odges:123restart@cluster0-xvks4.mongodb.net/test?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useFindAndModify: false
        }
      )
      app.listen(process.env.PORT || PORT, function() {
        console.log('Bot is listening on port ' + PORT);
      });
    } catch (e) {
      console.log(e)
    }
}
  
start()
