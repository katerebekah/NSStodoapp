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
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  priority: Number,
  complete: {
    type: Boolean,
    default: false
  }
});

var Todo = mongoose.model('Todo', todoSchema);

//get todo page and updated item
router.get('/:id', function(req, res) {
  console.log(req.params.id);
  //to edit an item
  return Todo.find({
      _id: req.params.id
    },
    function(err, item) {
      var thisItem = item[0];
      if (err) {
        console.log(err);
      } else {
        res.render('index', {
          title: "Kate's Awesome Page",
          header: "The Most Wonderful Page",
          description: "the page dedicated to javscript templating",
          itemProps: thisItem
        });
      }
    });
});


  //this is to call all the items on initial page render
router.get('/', function(req, res, next) {
  return Todo.find(function(err, titles) {
    if (!err) {
      res.render('todo', {
        greeting: "Howdy!",
        titles: titles
      });
    }
    console.log(titles);
  });
});

//post to database
router.post('/', function(req, res) {
  new Todo({
    due_date: req.body.due_date,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    complete: req.body.complete,
    //complete: false
  }).save(function(err, title) {
    if (err) {
      res.render('error', {
        error: {
          status: 500,
          stack: JSON.stringify(err.errors)
        },
        message: "You are a failure. Read the directions."
      });
    }
    res.redirect('todo');
  });

});



router.delete('/', function(req, res) {
  console.log(req.body.title_id);
  Todo.remove({
      _id: req.body.title_id
    },
    function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send('SUCCESS');
      }
    });
});

module.exports = router;
