var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoStringConnection = 'mongodb://localhost/seriesDb/series';
var mongoose = require('mongoose').connect(mongoStringConnection);
var db = mongoose.connection;

//Model
var Serie; 

db.on('error', console.error);
db.once('open', () => {
	var serieSchema = mongoose.Schema({
		nome: String,
		genero: String,
		temporadas: Number,
		ano: Number,
		inserteded_at: Date
	});

	Serie = mongoose.model('Serie', serieSchema);
});

// Midleware para trocar JSON no servidor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
	console.log('servidor restfull iniciado na porta 3000');
})

app.get('/', (req, res) => {
	res.end('funcionado...');
})

// List all series
app.get('/series', (req, res) => {
	Serie.find({}, (error, series) => {
		if (error) return res.json({error: error});

		res.json(series);
	})
})


// Show one specific serie by given ID
app.get('/series/:id', (req, res) => {

	var id = req.params.id;
	Serie.findById(id, (error, serie) => {
		if (error) return res.json({error: error});

		res.json(serie);
	});
});

// Create new serie
app.post('/series', (req, res) => {
	// Para parametros em POST (ou outro com body),
	// utilize o objeto body
	console.log('req.body => ', req.body);
	new Serie({
		nome: req.body.nome,
		genero: req.body.genero,
		temporadas: req.body.temporadas,
		ano: req.body.ano,
		inserteded_at: new Date()
	}).save((error, serie) => {
		if (error) return res.json({error: error});
		console.log(error || serie.nome + " foi salvo...");
		// console.log('OOP ======');
		// console.log(serie instanceof Serie); // true
		// console.log('OOP ======');

		res.json(serie);
	});
});

// Update a serie
app.put('/series/:id', (req, res) => {
	var id = req.params.id;

	/*
	Salvamos tudo que vem na requisição. Caso não venha algum field ou venha lagum que não está no Schema, ele será ignorado =)
	 */
	Serie.findByIdAndUpdate(id, {$set: req.body}, {new: true}, (error, serie) => {
		if (error) res.json({error: error});

		res.json(serie);
	});
});

// Delete a serie
app.delete('/series/:id', (req, res) => {
	var id = req.params.id;

	Serie.findByIdAndRemove(id, error => {
		if (error) res.json({error: error});
		res.json({message: "Serie excluída!"});
	});
});
