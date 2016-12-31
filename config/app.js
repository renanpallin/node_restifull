var express = require('express');
var app = module.exports = express();

var bodyParser = require('body-parser');

// Midleware para trocar JSON no servidor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
	console.log('servidor restfull iniciado na porta 3000');
});