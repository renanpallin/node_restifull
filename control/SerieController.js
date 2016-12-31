var db = require('../model/Serie.js');

module.exports.listAll = callback => {
	db.Serie.find({}, (error, series) => {
		if (error) return callback({error: error});

		callback(series);
	});
};

module.exports.getSerieById = (id, callback) => {
	db.Serie.findById(id, (error, serie) => {
		if (error) return callback({error: error});

		callback(serie);
	});
};

module.exports.save = (data, callback) => {
	new db.Serie(data).save((error, serie) => {
		if (error) return callback({error: error});
		// console.log('OOP ======');
		// console.log(serie instanceof Serie); // true
		// console.log('OOP ======');

		callback(serie);
	});

};

module.exports.update = (id, newSerie, callback) => {
	/*
	Salvamos tudo que vem na requisição. Caso não venha algum field ou venha lagum que não está no Schema, ele será ignorado =)
	*/
	db.Serie.findByIdAndUpdate(id, {$set: newSerie}, {new: true}, (error, serie) => {
		if (error) callback({error: error});

		callback(serie);
	});
};

module.exports.delete = (id, callback) => {
	db.Serie.findByIdAndRemove(id, (error, deletedSerie) => {
		if (error) callback({error: error});
		callback(deletedSerie);
	});
};