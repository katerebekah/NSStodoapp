var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  // yay!
  console.log("we have connected");
});



//make pretty with bootstrap, validate form, post to database

var todoSchema = mongoose.Schema({
  due_date: Date,
  timestamp: {
    type: Date,
    default: Date.now
  },
  description: String,
  title: String,
  priority: Number,
  complete: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

//get todo page
router.get('/', function(req, res, next) {
  return Todo.find(function(err, titles) {
    if (!err) {
      res.render('todo', {
        greeting: "Howdy!",
        titles: titles
      });
      console.log(titles);
    } else {
      return console.log(err);
    }
  });
});

//post to database
router.post('/', function(req, res) {
  new Todo({
    due_date: req.body.due_date,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority
      //complete: false
  }).save(function(err, title) {
    if (err) {
      return console.error(err);
    }
    console.log(title);
  });
  
  res.redirect('todo');
});


module.exports = router;
