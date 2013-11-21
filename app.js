/*
 * ==================================================
 *            GENPACT PORTFOLIO APP BACKEND
 * ==================================================
 * Description: Administration Console for managing a remote Portfolio Front End App
 * Author: Rahat Khanna
 * Date: 18th November 2013
*/

var http = require('http');
var express = require('express');
var moment = require('moment');

var app = express();
var port = process.env.PORT || 5000;


app.listen(port);

// GET All Public CSS, Images & Javascript Files
app.use('/static',express.static(__dirname + '/public'));

app.use(express.logger());
// GET /content_files/xml
// GET /content_files/update-packages/metadata.zip
app.use('/content',express.static(__dirname + '/content_files'));


app.get('/api', function(req, res){
  var body = 'gPortfolio API Documentation';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.get('/', function(req, res){
  var body = '<h1>Main Page </h1><h2>Portfolio Administration Console</h2>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});


app.get('/api/getUpdate',function(req,res)
{
	// Set Response Type to JSON
	res.type('application/json');
 if(req.query.lastUpdatedAt != undefined)
 {
 // Comparing Server & Client Side lastUpdatedAt
 var server_lastUpdatedAt = moment("25/10/2013","DD/MM/YYYY");
 var client_lastUpdatedAt = moment(req.query.lastUpdatedAt);

 if(client_lastUpdatedAt > server_lastUpdatedAt)
 	res.jsonp({message:"No New Updates Available."});
 else
 	res.jsonp({
 		message:"Get the Latest Update from Link in the Payload",
 		link:"http://"+req.headers.host+"/content/update-packages/metadata.zip"
 	});
 }else
 {
 	res.jsonp({
 		message:"Error: Please send lastUpdatedAt in Request Query String"
 	});
 }
});