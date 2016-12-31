var app = require('./config/app.js');
var serieController = require('./control/SerieController.js');

app.get('/', (req, res) => {
	res.end('funcionado...');
})

// List all series
app.get('/series', (req, res) => {
	serieController.listAll(data => {
		res.json(data);
	})
})


// Show one specific serie by given ID
app.get('/series/:id', (req, res) => {
	var id = req.params.id;
	serieController.getSerieById(id, data => {
		res.json(data);
	});
});

// Create new serie
app.post('/series', (req, res) => {
	console.log('req.body => ', req.body);
	serieController.save(req.body, data => {
		res.json(data);
	});
});

// Update a serie
app.put('/series/:id', (req, res) => {
	var id = req.params.id;

	serieController.update(id, req.body, data => {
		res.json(data);
	});
});

// Delete a serie
app.delete('/series/:id', (req, res) => {
	var id = req.params.id;

	serieController.delete(id, data => {
		// Caso algo seja deletado, é retornado. Se não deletado, null é retornado.
		// Aqui verificamos se algo ofi deletado e, caso não, enviamos uma mensagem.
		res.json(data || {
			message: "Não foi possível deletar (não encontrado)",
			id: id
		});
	})
});
