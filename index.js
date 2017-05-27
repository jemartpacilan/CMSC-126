const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const consolidate = require('consolidate');
const database = require('./database');
const User = require('./models').User;
const Topics = require('./models').Topics;
const Messages = require('./models').Messages;

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(cookieparser('secret-cookie'));
app.use(session({ resave: false, saveUninitialized: false, secret: 'secret-cookie' }));
app.use(flash());


app.use('/static', express.static('./static'));
app.use(require('./routes/route'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/signup', function(req, res){
	const name = req.body.name;
	console.log(req.body);
});

app.get('/forum', function(req,res){
  Topics.findAll().then(function(result){
    res.render('forum.html',{
      topics : result
    });
  });
});

app.post('/send', retrieveSignedInUser, function(req,res){
  const content = req.body.content;
  const user = req.user;

    Messages.create({
      content : content,
      topic_id : req.session.topic_id,
      sender: user.username,
      votes: 0
    }).then(function(){
      //req.flash('postTopicMessage', 'Successfully posted a topic!');
      res.redirect('/forum');
    });
});

app.post('/viewTopic', retrieveSignedInUser, function(req,res){
  req.session.topic_id = req.body.topic_id;
  res.redirect('/forum');
  console.log(req.topic_id);
});

app.post('/createTopic',retrieveSignedInUser, function(req,res){
  const headline = req.body.headline;
  const user = req.user;

  console.log(headline);
  console.log(user.id);

  Topics.create({
    headline : headline,
    user_id : user.id,
    votes: 0
  }).then(function(){
    req.flash('postTopicMessage', 'Successfully posted a topic!');
    res.redirect('/forum');
  });
});

function retrieveSignedInUser(req, res, next) {
		req.user = req.session.user;
    next();
}

/*function getName(id){
    const topic_id = id;
    console.log(topic_id);
}*/

app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});
