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
  res.render('forum.html');
});

app.post('/send', function(req,res){
  const content = req.body.content;
  const user_id = req.session.user.id;
  /*Messages.create({
    content : content,
  })*/
});

app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});
