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

/*
var accessToken;
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
*/
var access_token = 'EAACEdEose0cBALsJS443oKOYaNfSZB1nuwniBnmt29iqBsvN7Rfgo81LiYwGJAmd3hK7avv7XMpH5GZAXvxY28ZAGWxW6XHODWFoL7Lad1CPqpOjgfd1XseSCVq8EdLoZCXc0ZBgyDa2F2BqyjDmKIuIlVWQ7BtZCnJXDPrGBHZBgZDZD';
var parameters = "id,name,feed{message,comments{comment_count,like_count}}";
var candidate = 'fernandoHaddad';

query_data_from_candidate(candidate, parameters, access_token);

function query_data_from_candidate(user, parameters, access_token) {
  var FB = require('fb');
  FB.setAccessToken(access_token);
  FB.api(
    '/' + user,
    'GET',
    { "fields": parameters },
    function (response) {
      response.feed.data.forEach(function (element) {
        console.log("Mensagem do feed: "+element.message);
        var total_comments=0,total_likes=0;
        element.comments.data.forEach(function (element) {
          total_comments += element.comment_count;
          total_likes += element.like_count;
        }, this);
        console.log("Total de comentários: "+total_comments);
        console.log("Total de likes: "+total_likes);
        console.log('-------------------------------------------');
      }, this);
      
      //console.log(response.feed.data[1].comments.data[0]);
    }
  );
}

/*FB.api(
  '',
  'POST',
  {
    batch:[
      { method:'get',relative_url:'/fernandohaddad' },
      { method:'get',relative_url:'/fernandohaddad/feed?{message,comments{comment_cont,like_count}}' },
    ]
  },
  function(response) {
    var res0, res1;
    res0 = JSON.parse(response[0].body);
    res1 = JSON.parse(response[1].body);
    console.log(res1);
  }
);*/