//Make web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Set view folder
app.set('views', './views_comments');
//Set view engine
app.set('view engine', 'jade');
//Set static folder
app.use(express.static('public_comments'));
//Set body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Set DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comment');

//Make DB schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String,
    created_at: { type: Date, default: Date.now }
});
//Make DB model
var Comment = mongoose.model('Comment', commentSchema);

//Set router
app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) return res.status(500).send({ error: 'DB failure' });
        res.render('index', { comments: comments });
    });
});
app.post('/comments', function(req, res) {
    Comment.create(req.body, function(err, comment) {
        if (err) return res.status(500).send({ error: 'DB failure' });
        res.redirect('/comments');
    });
});

//Start server
app.listen(3000, function() {
    console.log('Server On!');
});

