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
const homeRoute = require('./routes/home')
app.use('/home', homeRoute)
const stockRoute = require('./routes/libros');
app.use('/api/libros', stockRoute);
app.use('/home')
const rutaDeRegistro = require('./routes/registration');
app.use('/api/usuarios', rutaDeRegistro);
const rutaDeSesion = require('./routes/login');
app.use('/api/usuarios', rutaDeSesion);

app.use(express.static(__dirname + '/public'));
//TODO Mongo Connection
if(process.env.MONGODB_URI){
	mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log('connect to DB');
	  }
	
)}else{mongoose.connect(
	process.env.DB_CONNECTION,
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	},
	() => {
	  console.log('connect to DB');
	}
)}

//?Server Listener
app.listen(process.env.PORT || 3000);
//app.use('/', orderController);
