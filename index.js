require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router/slack-api');
const Initial_user_db = require('./utils/init_users_db');
// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server
 
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

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
      Initial_user_db();
    } catch (e) {
      console.log(e)
    }
}
  
start()
