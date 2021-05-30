const express = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet')
app.use(helmet())


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
})

app.use('/', indexRouter);
app.use('/topic',topicRouter);

app.use(function (request, response, next) {
  response.status(404).send('Sorry cant find that!');
});

app.use(function (err, request, response, next) {
  console.error(err.stack)
  response.status(500).send('Something broke!')
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))



