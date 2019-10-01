const router = require('express').Router();
const Usuario = require('../models/usuarios');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validadorDeRegistro } = require('../services/validad');
const bcrypt = require('bcryptjs');

router.get('/usreg', (req, res) => {
	res.send('entrando a registro');
});

router.post('/usreg', async (req, res) => {
	//? ////////////////////////////////Validador de registro/////////////////////////////////////////////
	const { error } = validadorDeRegistro(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//? ////////////////////////////////validador si el usuario existe////////////////////////////////////

	const usuarioExistente = await Usuario.findOne({
		claveDeUsuario: req.body.claveDeUsuario
	});
	if (usuarioExistente) return res.status(400).send('Este usuario ya esta registrado');

	///? ///////////////////////////validar si el correo existe///////////////////////////////////////////

	const correoExistente = await Usuario.findOne({
		correo: req.body.correo
	});
	if (correoExistente) return res.status(400).send('Este correo ya esta en uso');

	//? a///////////////////////////////////Encriptar contraseñ////////////////////////////////////////////

	const sal = await bcrypt.genSalt(10);
	const contraseñaEncriptada = await bcrypt.hash(req.body.contraseña, sal);

	//? ////////////////////////////// crear un nuevo usuario/////////////////////////////////////////////
	const usuario = new Usuario({
		primerNombre: req.body.primerNombre,
		apellido: req.body.apellido,
		claveDeUsuario: req.body.claveDeUsuario,
		contraseña: contraseñaEncriptada,
		correo: req.body.correo,
		genero: req.body.genero,
		direccion: req.body.direccion,
		fecha: req.body.fecha
	});
	console.log(claveDeUsuario);
	try {
		const salvarUsuario = await usuario.save();
		res.send({
			claveDeUsuario
		});
	} catch (err) {
		res.status(400).send(err);
	}
	console.log('Registrado');
});

module.exports = router;
