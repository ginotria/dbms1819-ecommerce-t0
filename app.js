const express = require('express');
const path = require('path');
const { Client } = require('pg');
const exphbs  = require('express-handlebars');

// instantiate client using your DB configurations
const client = new Client({
	database: 'storedb',
	user: 'postgres',
	password: 'admin',
	host: 'localhost',
	port: 5432
});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});

const app = express();
// tell express which folder is a static/public folder
app.use(express.static(path.join(__dirname, 'public')));

// tell express to use handlebars as template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
//	res.send('<h1>About Page</h1>');
		res.sendFile(__dirname + '/public/file.mp3')

});

app.get('/api/products', function(req, res) {

	client.query('SELECT * FROM Products', (req, data)=>{
		console.log(data.rows);
		res.json({
			data: data.rows
		})
	})
});

app.get('/products', function(req, res) {
	res.render('products', {
		title: 'Top Products'
	});
});

app.get('/member/1', function(req, res) {
	res.render('member', {
		name: 'Juan Sipag',
		email: 'juan@gmail.com',
		phone: '099912345678',
		imageUrl: 'https://i.ytimg.com/vi/_npfDhFfaBM/hqdefault.jpg',
		hobbies: ['kain', 'tulog'] // display in <ul>
	})
});
app.get('/member/2', function(req, res) {
	res.render('member', {
		name: 'Pedro Sipag',
		email: 'pedro@gmail.com',
		phone: '099912345678',
		imageUrl: 'http://img.iwantv.com.ph/images/iwantv3/vmsimages/20170726/54887536-4e97-44e0-ac01-8d67a82be134.jpg',
		hobbies: ['takbo', 'kain']
	})
});
app.get('/user/:name', function(req, res) {
	const userName = req.params.name;
	res.send('<h1>Hi,' + userName + '!!</h1>');
});




app.listen(3000, function() {
	console.log('Server started at port 3000');
});