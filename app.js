const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
//const orderController = require('./controller/orderController');

//config
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: 'fruit_LAPTOPyelp%HULU3coffee_7usaHULU7SKYPECOFFEE hulu'
	})
);
app.use(expressLayouts);
app.set('view engine', 'ejs');

//*Middlewares
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
require('dotenv/config');
//!Routes
const stockRoute = require('./routes/libros');
app.use('/api/libros', stockRoute);

const rutaDeRegistro = require('./routes/registration');
app.use('/api/usuarios', rutaDeRegistro);
const rutaDeSesion = require('./routes/login');
app.use('/api/usuarios', rutaDeSesion);
app.get('/', (req, res) => {
	res.send('Entering Piero Letters');
});
app.use(express.static(__dirname + '/public'));
//TODO Mongo Connection
mongoose.connect(
	process.env.MONGOLAB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log('connect to DB');
	}
);

//?Server Listener
app.listen(3000);
//app.use('/', orderController);
