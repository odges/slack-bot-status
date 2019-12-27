require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const slackRoutes = require('./router/slack-api');
const schema = require('./graphql');
const graphqlHTTP = require('express-graphql');
const init_tasks = require('./tasks')

const app = express();
const PORT = 8084;
// фоновые задачи 
// init_tasks();


// админка 
// const exphbs = require('express-handlebars');
// const path = require('path');
// const router = require('./router/routes');
// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   extname: 'hbs'
// })
// app.engine('hbs', hbs.engine)
// app.set('view engine', 'hbs')
// app.set('views', 'views')
// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/static', express.static(__dirname + '/public'));
// app.use('/api', router)
// app.use('/', (_, res) => res.redirect('/api'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
  next();
});

app.use("/api/graph", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/api/graph', graphqlHTTP({
  schema,
  graphiql: true
})); 

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
// api для взаимодействия с slack
app.use('/api', slackRoutes)

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