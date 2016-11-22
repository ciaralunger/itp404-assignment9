require('dotenv').config();
var express = require('express')
var app = express()
var Sequelize = require('sequelize')
var yelp = require('./api/yelp');

//
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

//
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	dialect: 'mysql',
	//host: 'itp460.usc.edu'
	host: process.env.DB_HOST
});

//URL: /results?term='term'&location='location'
app.get('/results', function (request, response) {
	yelp.search({
		term: request.query.term, 
		location: request.query.location
	}).then(function(results){
		response.json(results)
	})
})

app.listen(3000)

