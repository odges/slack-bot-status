require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const slackRoutes = require('./router/slack-api');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./router/routes');
const schema = require('./graphql');
const graphqlHTTP = require('express-graphql');
const init_tasks = require('./tasks')

const app = express();
const PORT = 8084;

// init_tasks();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/graph', graphqlHTTP({
  schema,
  graphiql: true
})); 

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

// api для взаимодействия с slack
app.use('/api', slackRoutes)
// админка
app.use('/api', router)

app.use('/', (_, res) => res.redirect('/api'))

async function start() {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/statusbot?retryWrites=true&w=majority',
        { useNewUrlParser: true, useFindAndModify: false }
      )
      app.listen(process.env.PORT || PORT, function() {
        console.log('Bot is listening on port ' + PORT);
      });
    } catch (e) {
      console.log(e)
    }
}

start()
