var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

/*var uri = "https://www.codeforamerica.org/brigade/projects";
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
});*/

var accessToken;
var FB = require('fb');

FB.api('oauth/access_token', {
    client_id: 'app_id',
    client_secret: 'app_secret',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    accessToken = res.access_token;
});


FB.setAccessToken('EAACEdEose0cBAGfPxKNSZCZAuRqjHYgEtZA7yqSnzm2s0uGEj9ZB1tlW8UJciMYZCdBmsCzq0doBKELK5lQBdMD77JkZCWZCZCcCzc3HGya5vAi6YA2cHZAG9EaKZB2axLN7f2WZAiaQritGPcB3aH0ZCH5ZAioy2qUumqD1IpDVZBHjHP2wZDZD');

FB.api(
  '',
  'POST',
  {
    batch:[
      { method:'get',relative_url:'/fernandohaddad' },
      { method:'get',relative_url:'/fernandohaddad/feed?limit=10{comments}' },
    ]
  },
  function(response) {
    var res0, res1;
    res0 = JSON.parse(response[0].body);
    res1 = JSON.parse(response[1].body);
   
    console.log(res);
  }
);