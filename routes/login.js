const router = require('express').Router();
const Usuario = require('../models/usuarios');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validadorDeSesion } = require('../services/validad');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/uslog', (req, res) => {
	res.render('login');
});

router.post('/uslog', async (req, res) => {
	const { error } = validadorDeSesion(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//? ////////////////////////////////validador si el usuario existe////////////////////////////////////

	const usuario = await Usuario.findOne({
		claveDeUsuario: req.body.claveDeUsuario
	});
	if (!usuario) return res.status(400).send('Usuario y/o contraseña incorrectos');

	//? ////////////////////////////////validador si la contraseña esta bien/////////////////////////////
	const validarContraseña = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
	if (!validarContraseña) return res.status(400).send('contraseña incorrectos');

	//? crear y asignar una ficha

	const ficha = jwt.sign({ _id: usuario._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', ficha).send('Inicio De Sesion Exitoso');
});
module.exports = router;
