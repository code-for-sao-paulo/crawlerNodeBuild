var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var uri = "https://www.codeforamerica.org/brigade/projects";
console.log("Acessando: " + uri);
request(uri, function(error, response, body) {
   if(error) {
     console.log("Erro: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     console.log("Page title:  " + $('title').text());
   }
});
