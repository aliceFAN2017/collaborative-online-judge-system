var express = require('express')
const app = express()
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://coj:coj@ds229690.mlab.com:29690/coj');
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', indexRouter);
app.use('/api/v1', restRouter);

app.listen(3000, () => console.log('App listening on port 3000!'))
