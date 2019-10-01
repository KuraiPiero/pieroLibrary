const mongoose = require('mongoose');
const esquemaDeLibro = mongoose.Schema({
	Titulo: String,
	Autor: String,
	ISBN: String,
	Categoria: String,
	FechaDeLanzamiento: String,
	Sipnosis: String,
	Formato: String,
	Precio: Number,

	PlatforOfSelling: String,
	img: String
});

module.exports = mongoose.model('Libros', esquemaDeLibro);
