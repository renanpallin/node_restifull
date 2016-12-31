var mongoStringConnection = 'mongodb://localhost/seriesDb/series';
var mongoose = require('mongoose').connect(mongoStringConnection);
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
	var serieSchema = mongoose.Schema({
		nome: String,
		genero: String,
		temporadas: Number,
		ano: Number,
		episodios: Number,
		inserteded_at: Date
	});

	exports.Serie = mongoose.model('Serie', serieSchema);
});
