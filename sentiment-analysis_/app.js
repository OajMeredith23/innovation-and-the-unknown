var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var nlpRouter = require('./routes/nlp');

var app = express();

const PORT = process.env.PORT || 4000
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/nlp', nlpRouter);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
module.exports = app;