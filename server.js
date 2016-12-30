var express = require('express');
var app = express();

app.listen(3000, () => {
	console.log('servidor restfull iniciado na porta 3000');
})

app.get('/', (req, res) => {
	res.end('funcionado...');
})